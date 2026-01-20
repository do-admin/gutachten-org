"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  ChartOptions,
} from "chart.js";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
);

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: (number | null)[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    type?: string;
    [key: string]: any;
  }>;
}

export default function AfACalculatorWidget() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const [formData, setFormData] = useState({
    afaprice: "350000",
    afadate: "2022-01-01",
    afagst: "17500",
    afastate: "NI,5",
    afainv: "0",
    afanotar: "5250",
    afanotarpct: "1.5",
    afabrokerpct: "3.57",
    afabroker: "12495",
    afaother: "0",
    afaotherpct: "0",
    afalandpct: "20",
    afalandval: "70000",
    afayear: "1956",
    afaarea: "55",
    afastichtag: "2022-01-01",
    afadeprhith: "",
    afarestval: "",
    afatax: "42",
    afachurch: false,
    actualyears: "22",
  });

  const [results, setResults] = useState({
    afatotal: "0",
    legalyears: "50",
    legaldep: "-",
    actualdep: "-",
    taxadv: "-",
  });

  const [gutachtenCost, setGutachtenCost] = useState("");

  const P = (n: string) => {
    const val = formData[n as keyof typeof formData];
    if (typeof val === "boolean") return 0;
    return parseFloat(val as string) || 0;
  };

  const update = () => {
    const price = P("afaprice"),
      notaryPct = P("afanotarpct"),
      brokerPct = P("afabrokerpct"),
      otherPct = P("afaotherpct"),
      other = P("afaother");
    const inv = P("afainv"),
      year = P("afayear"),
      actYears = P("actualyears") || 1,
      tax = P("afatax");
    const landVal = P("afalandval"),
      landPct = P("afalandpct");
    const isChurch = formData.afachurch;

    // Get dates for depreciation calculation
    const purchaseDate = new Date(formData.afadate);
    const appraisalDate = new Date(formData.afastichtag);

    // Get GST from the state dropdown
    const stateValue = formData.afastate;
    const gstPct = parseFloat(stateValue.split(",")[1]) || 0;
    const gst = (price * gstPct) / 100;

    const notVal = (price * notaryPct) / 100;
    const brokerVal = (price * brokerPct) / 100;
    const otherVal = otherPct > 0 ? (price * otherPct) / 100 : other;
    const totalGross = price + gst + notVal + brokerVal + otherVal;

    // Calculate land value
    const land = landPct > 0 ? (totalGross * landPct) / 100 : landVal;
    const total = totalGross - land - inv; // Subtract land and inventory from depreciable amount

    // Update form data with calculated values
    setFormData((prev) => ({
      ...prev,
      afagst: gst.toFixed(2),
      afanotar: notVal.toFixed(2),
      afabroker: brokerVal.toFixed(2),
      afaother: otherVal.toFixed(2),
    }));

    const bld = total; // Building value is now the depreciable amount
    const legalYears = year < 1925 ? 40 : 50;
    setResults((prev) => ({
      ...prev,
      legalyears: legalYears.toString(),
    }));

    // Calculate time difference for already depreciated amount
    let monthsDiff = 0;
    if (purchaseDate && appraisalDate && appraisalDate > purchaseDate) {
      monthsDiff =
        (appraisalDate.getFullYear() - purchaseDate.getFullYear()) * 12 +
        (appraisalDate.getMonth() - purchaseDate.getMonth());
    }

    const yearsDiff = monthsDiff / 12;
    const legalAnnualDep = bld / legalYears;
    const actualAnnualDep = bld / actYears;

    // Calculate already depreciated amounts (2% per year legal rate)
    const alreadyDepreciatedLegal = Math.max(
      0,
      Math.min(bld, legalAnnualDep * yearsDiff)
    );
    const alreadyDepreciatedActual = Math.max(
      0,
      Math.min(bld, actualAnnualDep * yearsDiff)
    );

    const restval = Math.max(0, bld - alreadyDepreciatedActual);

    setFormData((prev) => ({
      ...prev,
      afadeprhith: alreadyDepreciatedLegal.toFixed(2),
      afarestval: restval.toFixed(2),
    }));

    setResults((prev) => ({
      ...prev,
      afatotal: total.toFixed(2),
      legaldep: legalAnnualDep.toFixed(2),
      actualdep: actualAnnualDep.toFixed(2),
      taxadv: Math.max(
        0,
        isChurch
          ? (((actualAnnualDep - legalAnnualDep) * tax) / 100) * 0.9
          : ((actualAnnualDep - legalAnnualDep) * tax) / 100
      ).toFixed(2),
    }));

    // gutachten cost calculations
    const grossCost = 950.81;
    const effectiveTaxRate = (tax / 100) * (isChurch ? 0.9 : 1);
    const netCost = grossCost * (1 - effectiveTaxRate);
    const adv = isChurch
      ? (((actualAnnualDep - legalAnnualDep) * tax) / 100) * 0.9
      : ((actualAnnualDep - legalAnnualDep) * tax) / 100;
    const days = adv > 0 ? Math.round((netCost / adv) * 365) : 0;
    const tenYearSave = Math.max(0, adv * 10);

    setGutachtenCost(
      `Ihr Sachverständigengutachten kostet <span class="highlight-number">${grossCost.toFixed(2)} €</span> brutto und reduziert sich nach Steuerabzug auf <span class="highlight-number">${netCost.toFixed(2)} €</span>.<br><br>` +
        `Diese Investition amortisiert sich bereits nach <span class="highlight-number">${days} Tagen</span>. Über einen Zeitraum von 10 Jahren erzielen Sie Steuerersparnisse von <span class="highlight-number">${tenYearSave.toFixed(2)} €</span>.`
    );

    // Update chart
    updateChart(bld, legalYears, actYears, legalAnnualDep, actualAnnualDep);
  };

  const updateChart = (
    buildingValue: number,
    legalYears: number,
    actualYears: number,
    legalAnnualDep: number,
    actualAnnualDep: number
  ) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Generate data points for the chart - now always show 50 years
    const maxYears = 50;
    const labels: string[] = [];
    const legalCumulative: number[] = [];
    const actualCumulative: (number | null)[] = [];
    const legalBookValue: number[] = [];
    const actualBookValue: (number | null)[] = [];

    // Create year labels (Jahre 0 to 50)
    for (let i = 0; i <= maxYears; i++) {
      labels.push(`Jahr ${i}`);

      // Legal depreciation (cumulative)
      const legalCum = Math.min(i * legalAnnualDep, buildingValue);
      legalCumulative.push(legalCum);
      legalBookValue.push(Math.max(0, buildingValue - legalCum));

      // Actual depreciation (cumulative) - stops at actualYears
      if (i <= actualYears) {
        const actualCum = Math.min(i * actualAnnualDep, buildingValue);
        actualCumulative.push(actualCum);
        actualBookValue.push(Math.max(0, buildingValue - actualCum));
      } else {
        actualCumulative.push(null);
        actualBookValue.push(null);
      }
    }

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Calculate max value for y-axis
    const maxValue = buildingValue * 1.2;
    let yMax = 100000;
    if (maxValue <= 100000) yMax = 100000;
    else if (maxValue <= 200000) yMax = 200000;
    else if (maxValue <= 300000) yMax = 300000;
    else if (maxValue <= 400000) yMax = 400000;
    else if (maxValue <= 500000) yMax = 500000;
    else if (maxValue <= 600000) yMax = 600000;
    else if (maxValue <= 800000) yMax = 800000;
    else if (maxValue <= 1000000) yMax = 1000000;
    else yMax = Math.ceil(maxValue / 100000) * 100000;

    // Calculate step size
    let stepSize = 10000;
    if (maxValue <= 100000) stepSize = 10000;
    else if (maxValue <= 300000) stepSize = 25000;
    else if (maxValue <= 500000) stepSize = 50000;
    else if (maxValue <= 1000000) stepSize = 100000;
    else stepSize = 200000;

    // Create new chart
    chartInstanceRef.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "AfA gesetzlich kumulativ",
            data: legalCumulative,
            backgroundColor: "rgba(39, 50, 56, 0.3)",
            borderColor: "rgba(39, 50, 56, 0.6)",
            borderWidth: 1,
            type: "bar",
            hoverBackgroundColor: "rgba(39, 50, 56, 0.4)",
            hoverBorderColor: "rgba(39, 50, 56, 0.8)",
            hoverBorderWidth: 1,
            barThickness: 8,
            order: 3,
            categoryPercentage: 0.6,
            barPercentage: 0.6,
          },
          {
            label: "AfA mit Gutachten kumulativ",
            data: actualCumulative,
            backgroundColor: "rgba(252, 112, 25, 0.3)",
            borderColor: "rgba(252, 112, 25, 0.6)",
            borderWidth: 1,
            type: "bar",
            hoverBackgroundColor: "rgba(252, 112, 25, 0.4)",
            hoverBorderColor: "rgba(252, 112, 25, 0.8)",
            hoverBorderWidth: 1,
            barThickness: 8,
            order: 3,
            categoryPercentage: 0.6,
            barPercentage: 0.6,
          },
          {
            label: "Restbuchwert gesetzlich",
            data: legalBookValue,
            borderColor: "#273238",
            backgroundColor: "transparent",
            borderWidth: 1.5,
            type: "line",
            fill: false,
            tension: 0,
            hoverBorderColor: "#273238",
            hoverBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4,
            pointBackgroundColor: "#273238",
            pointHoverBackgroundColor: "#273238",
            pointBorderColor: "#273238",
            pointHoverBorderColor: "#273238",
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            order: 1,
          },
          {
            label: "Restbuchwert mit Gutachten",
            data: actualBookValue,
            borderColor: "#FC7019",
            backgroundColor: "transparent",
            borderWidth: 1.5,
            type: "line",
            fill: false,
            tension: 0,
            hoverBorderColor: "#FC7019",
            hoverBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FC7019",
            pointHoverBackgroundColor: "#FC7019",
            pointBorderColor: "#FC7019",
            pointHoverBorderColor: "#FC7019",
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            order: 1,
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "nearest" as const,
          intersect: true,
        },
        plugins: {
          title: {
            display: true,
            text: "Abschreibungsverlauf über die Jahre",
          },
          legend: {
            display: true,
            position: "bottom" as const,
            labels: {
              usePointStyle: false,
              padding: 20,
              boxWidth: 40,
              boxHeight: 12,
            },
          },
          tooltip: {
            filter: function (tooltipItem) {
              return true;
            },
            callbacks: {
              title: function (context) {
                return context[0].label;
              },
              label: function (context) {
                const yValue = context.parsed.y;
                if (yValue === null || yValue === undefined) {
                  return `${context.dataset.label}: -`;
                }
                const value = new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(yValue);

                return `${context.dataset.label}: ${value}`;
              },
            },
            displayColors: true,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Dauer der Abschreibung",
              color: "#666",
              font: {
                size: 12,
              },
            },
            ticks: {
              maxTicksLimit: 26,
              color: "#666",
              font: {
                size: 11,
              },
              callback: function (value: number | string) {
                const numValue =
                  typeof value === "number" ? value : Number(value);
                if (isNaN(numValue)) return "";
                const label = String(this.getLabelForValue(numValue));
                const yearNum = parseInt(label.replace("Jahr ", ""), 10);
                if (isNaN(yearNum)) return "";
                return yearNum % 2 === 0 ? `Jahr ${yearNum}` : "";
              },
            },
            grid: {
              display: true,
              color: "rgba(150, 150, 150, 0.15)",
              lineWidth: 0.5,
              drawOnChartArea: true,
              drawTicks: true,
              z: 0,
            },
          },
          y: {
            title: {
              display: true,
              text: "Geldbetrag",
              color: "#666",
              font: {
                size: 12,
              },
            },
            min: 0,
            max: yMax,
            ticks: {
              color: "#666",
              font: {
                size: 11,
              },
              callback: function (value) {
                return new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(Number(value));
              },
              stepSize: stepSize,
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.2)",
              lineWidth: 0.8,
              drawOnChartArea: true,
              drawTicks: true,
              z: 1,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 1.5,
          },
          point: {
            radius: 3,
            hoverRadius: 4,
            borderWidth: 0,
          },
        },
      },
    });
  };

  // Separate input fields from calculated fields to avoid infinite loops
  const inputFields = [
    formData.afaprice,
    formData.afadate,
    formData.afastate,
    formData.afainv,
    formData.afanotarpct,
    formData.afabrokerpct,
    formData.afaotherpct,
    formData.afaother,
    formData.afalandpct,
    formData.afalandval,
    formData.afayear,
    formData.afaarea,
    formData.afastichtag,
    formData.afatax,
    formData.afachurch,
    formData.actualyears,
  ];

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputFields);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === "afachurch") {
      setFormData((prev) => ({ ...prev, [field]: value as boolean }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value as string }));
  };

  const handleStateChange = (value: string) => {
    const pct = parseFloat(value.split(",")[1]) || 0;
    const price = P("afaprice");
    const gst = (price * pct) / 100;
    setFormData((prev) => ({
      ...prev,
      afastate: value,
      afagst: gst.toFixed(2),
    }));
  };

  const handlePercentageSync = (
    field: string,
    value: string,
    isPercentage: boolean
  ) => {
    const price = P("afaprice");
    if (isPercentage) {
      const amount = (price * parseFloat(value)) / 100;
      if (field === "afanotar") {
        setFormData((prev) => ({
          ...prev,
          afanotarpct: value,
          afanotar: amount.toFixed(2),
        }));
      } else if (field === "afabroker") {
        setFormData((prev) => ({
          ...prev,
          afabrokerpct: value,
          afabroker: amount.toFixed(2),
        }));
      } else if (field === "afaother") {
        setFormData((prev) => ({
          ...prev,
          afaotherpct: value,
          afaother: amount.toFixed(2),
        }));
      } else if (field === "afaland") {
        setFormData((prev) => ({
          ...prev,
          afalandpct: value,
          afalandval: amount.toFixed(2),
        }));
      }
    } else {
      if (price > 0) {
        const pct = ((parseFloat(value) / price) * 100).toFixed(2);
        if (field === "afanotar") {
          setFormData((prev) => ({
            ...prev,
            afanotar: value,
            afanotarpct: pct,
          }));
        } else if (field === "afabroker") {
          setFormData((prev) => ({
            ...prev,
            afabroker: value,
            afabrokerpct: pct,
          }));
        } else if (field === "afaother") {
          setFormData((prev) => ({
            ...prev,
            afaother: value,
            afaotherpct: pct,
          }));
        } else if (field === "afaland") {
          setFormData((prev) => ({
            ...prev,
            afalandval: value,
            afalandpct: pct,
          }));
        }
      }
    }
  };

  return (
    <div className="afa-widget" id="afa-calculator">
      <style jsx>{`
        .afa-widget {
          font-family: Arial, sans-serif;
          max-width: 1000px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .afa-widget {
            margin: 0;
            padding: 1rem;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
          }
          .afa-row {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }
          .afa-field {
            width: 100% !important;
            flex: none !important;
            max-width: 100%;
          }
          .afa-field.full-width {
            width: 100% !important;
            flex: none !important;
          }
          .afa-input-group {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            gap: 0.5rem;
          }
          .afa-input-group input,
          .afa-input-group select {
            width: 100% !important;
            max-width: 100%;
            border-radius: 4px !important;
            margin: 0 !important;
            margin-left: 0 !important;
            box-sizing: border-box;
          }
          .afa-field input,
          .afa-field select {
            width: 100% !important;
            max-width: 100%;
            border-radius: 4px !important;
          }
          .afa-unit {
            width: 100%;
            border-radius: 4px !important;
            margin-top: 0;
            text-align: center;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .chart-container {
            height: 300px;
            padding: 0.5rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          .afa-results table {
            font-size: 0.9rem;
            width: 100%;
            display: block;
            overflow-x: auto;
          }
          .afa-results th,
          .afa-results td {
            padding: 0.5rem;
            white-space: nowrap;
          }
          .checkbox-container {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .afa-widget {
            margin: 0;
            padding: 0.75rem;
            width: 100%;
            max-width: 100%;
          }
          .afa-section {
            width: 100%;
            max-width: 100%;
          }
          .afa-section h2 {
            font-size: 1.1rem;
          }
          .chart-container {
            height: 250px;
            width: 100%;
            max-width: 100%;
          }
          .afa-input-group {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .afa-input-group input,
          .afa-input-group select {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 4px !important;
            margin: 0 !important;
            margin-left: 0 !important;
            box-sizing: border-box;
          }
          .afa-field input,
          .afa-field select {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 4px !important;
          }
          .afa-unit {
            width: 100%;
            border-radius: 4px !important;
            margin-top: 0;
            text-align: center;
            height: 40px;
          }
          .afa-results table {
            font-size: 0.85rem;
          }
          .afa-results th,
          .afa-results td {
            padding: 0.4rem;
            font-size: 0.85rem;
          }
        }
        .afa-section {
          margin-bottom: 2rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .afa-section h2 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          width: 100%;
        }
        .afa-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        .afa-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
          box-sizing: border-box;
        }
        .afa-field label {
          font-weight: bold;
          font-size: 0.9rem;
          color: #333;
        }
        .afa-input-group {
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .afa-field input,
        .afa-field select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
          flex: 1;
          box-sizing: border-box;
          height: 40px;
          width: 100%;
          min-width: 0;
        }
        .afa-field select {
          border-radius: 4px;
        }
        .afa-unit {
          background: #3d4952;
          color: white;
          padding: 0.5rem 0.8rem;
          border-radius: 0 4px 4px 0;
          font-weight: bold;
          font-size: 0.9rem;
          line-height: 1;
          height: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .afa-field.full-width {
          flex: 2;
        }
        .afa-field input[readonly] {
          background: #f5f5f5;
        }
        .afa-field input.manual {
          border-color: #3c763d;
          background: #dff0d8;
        }
        .afa-results table {
          width: 100%;
          max-width: 100%;
          border-collapse: collapse;
          font-size: 1rem;
          box-sizing: border-box;
          table-layout: auto;
        }
        .afa-results th,
        .afa-results td {
          border-bottom: 1px solid #ddd;
          padding: 0.75rem;
          text-align: left;
          box-sizing: border-box;
        }
        .afa-results th {
          font-weight: bold;
        }
        .calc-text {
          font-size: 0.95rem;
          margin-top: 1rem;
        }
        .highlight-number {
          color: #3d4952;
          font-weight: bold;
        }
        .chart-container {
          position: relative;
          height: 400px;
          margin: 2rem 0;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .checkbox-container input[type="checkbox"] {
          margin: 0;
          width: 16px;
          height: 16px;
        }
        .checkbox-container .tooltip {
          margin-left: 0.5rem;
          cursor: help;
          color: #666;
          font-weight: normal;
          position: relative;
          font-size: 14px;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f0f0f0;
        }
        .tooltip:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          z-index: 1000;
          max-width: 250px;
          white-space: normal;
          width: max-content;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .tooltip:hover::before {
          content: "";
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #333;
          z-index: 1000;
        }
      `}</style>
      {/* purchase section */}
      <div className="afa-section">
        <p herokit-id="fbbbeaf0-31e4-4576-839e-2ea634ff1fd0">Angaben Kauf</p>
        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="155e363a-d014-4ca0-af41-1b94eaec25c4">
              Kaufpreis
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afaprice}
                onChange={(e) => handleInputChange("afaprice", e.target.value)}
              />
              <span
                className="afa-unit"
                herokit-id="2c1fa817-7207-4950-a161-8f1eef2c063a"
              >
                €
              </span>
            </div>
          </div>
          <div className="afa-field">
            <label herokit-id="49c7de3f-6a03-4139-9af9-491f8d397b70">
              Übergang von Besitz, Nutzen und Lasten
            </label>
            <input
              type="date"
              value={formData.afadate}
              onChange={(e) => handleInputChange("afadate", e.target.value)}
              lang="de"
            />
          </div>
        </div>

        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="9a7afd0f-d7ef-43d3-888f-14841ff8b4f2">
              Grunderwerbsteuer
            </label>
            <div className="afa-input-group">
              <input type="number" value={formData.afagst} readOnly />
              <span
                className="afa-unit"
                herokit-id="134d3e48-813f-4cc3-9937-16d06b25dc19"
              >
                €
              </span>
            </div>
          </div>
          <div className="afa-field">
            <label herokit-id="493185f1-f4be-4b11-bd62-ac3a9bff56fa">
              Bundesland
            </label>
            <select
              value={formData.afastate}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <option value="BW,3">Baden‑Württemberg 3,0% (05.11.2011)</option>
              <option value="BY,3.5">Bayern 3,5% (01.01.1997)</option>
              <option value="BE,6">Berlin 6,0% (01.01.2014)</option>
              <option value="BB,6.5">Brandenburg 6,5% (01.07.2015)</option>
              <option value="HB,5">Bremen 5,0% (01.01.2014)</option>
              <option value="HH,3.5">Hamburg 3,5% (01.01.2023)</option>
              <option value="HE,6">Hessen 6,0% (01.08.2014)</option>
              <option value="MV,6">
                Mecklenburg‑Vorpommern 6,0% (01.07.2019)
              </option>
              <option value="NI,5">Niedersachsen 5,0% (01.01.2014)</option>
              <option value="NW,6.5">
                Nordrhein‑Westfalen 6,5% (01.01.2015)
              </option>
              <option value="RP,5">Rheinland‑Pfalz 5,0% (01.03.2012)</option>
              <option value="SL,6.5">Saarland 6,5% (01.01.2015)</option>
              <option value="SN,3.5">Sachsen 3,5% (01.01.2023)</option>
              <option value="ST,5">Sachsen‑Anhalt 5,0% (01.03.2012)</option>
              <option value="SH,6.5">
                Schleswig‑Holstein 6,5% (01.01.2014)
              </option>
              <option value="TH,5">Thüringen 5,0% (01.01.2024)</option>
            </select>
          </div>
        </div>

        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="2e670a6c-3a88-454d-9256-e172cfa872fe">
              Mitverkauftes Inventar
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afainv}
                onChange={(e) => handleInputChange("afainv", e.target.value)}
              />
              <span
                className="afa-unit"
                herokit-id="cac4ad9e-d17c-4efe-b58d-5012c2ef3060"
              >
                €
              </span>
            </div>
          </div>
          <div className="afa-field">
            <label herokit-id="148b93d6-e42b-45b1-b4b7-5114bc2e0f8f">
              Notar- und Grundbucheintrag
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afanotar}
                onChange={(e) =>
                  handlePercentageSync("afanotar", e.target.value, false)
                }
              />
              <span
                className="afa-unit"
                herokit-id="6d473cae-e987-4916-b63a-b679efeda5e5"
              >
                €
              </span>
              <input
                type="number"
                value={formData.afanotarpct}
                onChange={(e) =>
                  handlePercentageSync("afanotar", e.target.value, true)
                }
                style={{
                  width: "60px",
                  marginLeft: "8px",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <span
                className="afa-unit"
                herokit-id="23d4c4be-bf88-4049-8317-a1de9bc6315c"
              >
                %
              </span>
            </div>
          </div>
        </div>

        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="b10c16f6-8cbd-4965-a2fd-b4c6d16426ad">
              Kosten Makler
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afabrokerpct}
                onChange={(e) =>
                  handlePercentageSync("afabroker", e.target.value, true)
                }
                style={{ width: "60px", borderRadius: "4px 0 0 4px" }}
              />
              <span
                className="afa-unit"
                herokit-id="d917fbec-e5e3-4e7f-867f-5f16a16eb018"
              >
                %
              </span>
              <input
                type="number"
                value={formData.afabroker}
                onChange={(e) =>
                  handlePercentageSync("afabroker", e.target.value, false)
                }
                style={{ marginLeft: "8px", borderRadius: "4px 0 0 4px" }}
              />
              <span
                className="afa-unit"
                herokit-id="85342145-bd82-4838-a323-158434a09dea"
              >
                €
              </span>
            </div>
          </div>
          <div className="afa-field">
            <label herokit-id="60666dd4-ef75-4a64-a1b0-cf71f8b1c7ce">
              Sonstige Nebenkosten des Erwerbs
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afaother}
                onChange={(e) =>
                  handlePercentageSync("afaother", e.target.value, false)
                }
              />
              <span
                className="afa-unit"
                herokit-id="0b0f5fd0-ddea-492a-8906-e91c51572486"
              >
                €
              </span>
              <input
                type="number"
                value={formData.afaotherpct}
                onChange={(e) =>
                  handlePercentageSync("afaother", e.target.value, true)
                }
                style={{
                  width: "60px",
                  marginLeft: "8px",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <span
                className="afa-unit"
                herokit-id="67f143b6-5852-487c-ac2a-9c2ec4dc249e"
              >
                %
              </span>
            </div>
          </div>
        </div>

        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="4fc1d20f-da4e-4865-bff0-1ca1f98e4e29">
              Anteil Grund und Boden
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afalandpct}
                onChange={(e) =>
                  handlePercentageSync("afaland", e.target.value, true)
                }
                style={{ width: "60px", borderRadius: "4px 0 0 4px" }}
              />
              <span
                className="afa-unit"
                herokit-id="bade678c-37fe-49ee-89bc-92fde00fc4ab"
              >
                %
              </span>
              <input
                type="number"
                value={formData.afalandval}
                onChange={(e) =>
                  handlePercentageSync("afaland", e.target.value, false)
                }
                style={{ marginLeft: "8px", borderRadius: "4px 0 0 4px" }}
              />
              <span
                className="afa-unit"
                herokit-id="3cb1f4c1-dabf-450b-9c64-5c7f4cb10b28"
              >
                €
              </span>
            </div>
          </div>
          <div className="afa-field">
            <label herokit-id="8e4462f7-f746-4b64-a23f-8844c89eb0b7">
              Summe Anschaffungskosten (ohne Grund und Boden)
            </label>
            <div className="afa-input-group">
              <input type="number" value={results.afatotal} readOnly />
              <span
                className="afa-unit"
                herokit-id="f118b710-0b8c-4172-ad77-a1c8b2f4cf91"
              >
                €
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* object section */}
      <div className="afa-section">
        <p herokit-id="cd921f17-4bda-479a-bf48-d6572f7f39e3">
          Angaben Objekt
        </p>
        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="12ff9326-c2bb-4f95-bfdf-2ba0af0827a4">
              Baujahr
            </label>
            <input
              type="number"
              value={formData.afayear}
              onChange={(e) => handleInputChange("afayear", e.target.value)}
            />
          </div>
          <div className="afa-field">
            <label herokit-id="eb0dd5fa-7b3a-4521-895d-a4b034457aa7">
              Wohn- und Nutzfläche in qm
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afaarea}
                onChange={(e) => handleInputChange("afaarea", e.target.value)}
              />
              <span
                className="afa-unit"
                herokit-id="86cf5d47-9f06-4232-8c8f-da47d38199dc"
              >
                qm
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* nutzungsdauer */}
      <div className="afa-section">
        <p herokit-id="bcdad1c5-b390-4fc6-a762-289b62ca29cf">
          Angaben Nutzungsdauer
        </p>
        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="1a0eff6c-8237-4037-aaf1-799d5af35763">
              Bewertungsstichtag Gutachten
            </label>
            <input
              type="date"
              value={formData.afastichtag}
              onChange={(e) => handleInputChange("afastichtag", e.target.value)}
              lang="de"
            />
          </div>
          <div className="afa-field">
            <label herokit-id="7bfba7c9-7393-4d5c-839b-36aa6f513881">
              Bereits abgeschrieben
            </label>
            <div className="afa-input-group">
              <input type="number" value={formData.afadeprhith} readOnly />
              <span
                className="afa-unit"
                herokit-id="11bc2908-b128-442f-a540-2162a5caf242"
              >
                €
              </span>
            </div>
          </div>
        </div>
        <div className="afa-row">
          <div className="afa-field full-width">
            <label herokit-id="9077f91d-ef8c-41f6-bc7b-5255650651b9">
              Restbuchwert
            </label>
            <div className="afa-input-group">
              <input type="number" value={formData.afarestval} readOnly />
              <span
                className="afa-unit"
                herokit-id="ff4a269c-ff85-4252-bd99-47001a794f7d"
              >
                €
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* taxpayer */}
      <div className="afa-section">
        <p herokit-id="e6ac0be1-7f39-4359-ab9d-b9cc04ecda8c">
          Angaben zum Steuerpflichtigen
        </p>
        <div className="afa-row">
          <div className="afa-field">
            <label herokit-id="123ee651-53f2-4316-baf6-2aa9ea88ad38">
              Persönlicher Steuersatz
            </label>
            <div className="afa-input-group">
              <input
                type="number"
                value={formData.afatax}
                onChange={(e) => handleInputChange("afatax", e.target.value)}
              />
              <span
                className="afa-unit"
                herokit-id="53236240-3739-441e-9866-e96e6c9f4e93"
              >
                %
              </span>
            </div>
          </div>
          <div className="afa-field">
            <div className="afa-input-group">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="afachurch"
                  checked={formData.afachurch}
                  onChange={(e) =>
                    handleInputChange("afachurch", e.target.checked)
                  }
                />
                <span>
                  <strong herokit-id="d9f70600-90c3-453d-a579-316257912068">
                    Kirchensteuer
                  </strong>
                </span>
                <span
                  className="tooltip"
                  data-tooltip="Der Kirchensteuersatz richtet sich nach dem Bundesland Ihres Wohnsitzes und wird automatisch angewendet."
                  herokit-id="e8c5d386-1b16-4a75-a611-170e592156a6"
                >
                  ⓘ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* results */}
      <div className="afa-section afa-results">
        <p herokit-id="5cf454e3-c40d-4d2a-9547-ab161cd8108e">Ihr Ergebnis</p>
        <table>
          <tbody>
            <tr>
              <th herokit-id="5e131b3c-d369-488f-94e8-25d048e51ae9">
                Nutzungsdauer
              </th>
              <th herokit-id="d41259c7-c956-40ae-9deb-9082c0f5cdb7">
                Abschreibung/Jahr
              </th>
              <th herokit-id="ad5eb6c0-ad10-4dbe-b2eb-ff31adda25fd">
                Jährlicher Steuervorteil
              </th>
            </tr>
            <tr>
              <td herokit-id="60623c42-c041-47d0-92e4-2ca253fbf0be">
                Gesetzlich:{" "}
                <span
                  id="legalyears"
                  herokit-id="352491e6-95f0-40af-8dcf-a8e179786057"
                >
                  {results.legalyears}
                </span>{" "}
                Jahre
              </td>
              <td herokit-id="d8f145fc-a46e-4ddd-9cb8-9373f629d0a1">
                <span
                  id="legaldep"
                  herokit-id="9ed9fdc8-3b82-42ae-a86a-57cad3781667"
                >
                  {results.legaldep}
                </span>{" "}
                €
              </td>
              <td herokit-id="ca4930c3-26f5-4d29-b49d-507699aeffcc">–</td>
            </tr>
            <tr>
              <td herokit-id="0ca6f36e-0f8a-4f09-a634-914b42323638">
                Tatsächlich:
                <input
                  type="number"
                  id="actualyears"
                  value={formData.actualyears}
                  onChange={(e) =>
                    handleInputChange("actualyears", e.target.value)
                  }
                  style={{ width: "60px", marginLeft: "8px" }}
                />
                Jahre
              </td>
              <td herokit-id="a129902f-e54d-47a6-8c20-fa9e83ce62ca">
                <span
                  id="actualdep"
                  herokit-id="ca4a422f-54e8-476c-b2f7-49f1da27227b"
                >
                  {results.actualdep}
                </span>{" "}
                €
              </td>
              <td herokit-id="417ba08d-75b2-4465-a8ee-6e00a64e29c6">
                <span
                  id="taxadv"
                  herokit-id="1680c0d1-2b10-494e-8fa6-19e4e4994ca5"
                >
                  {results.taxadv}
                </span>{" "}
                €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Dynamic Graph */}
      <div className="afa-section">
        <p herokit-id="0796d7f2-7f5c-4e0e-b399-743769096800">
          Abschreibungsverlauf
        </p>
        <div className="chart-container">
          <canvas ref={chartRef} id="afaChart"></canvas>
        </div>
      </div>
      {/* gutachten cost section */}
      <SafeHtmlRenderer
        content={gutachtenCost}
        className="afa-section calc-text"
        id="gutachten-cost"
        tag="div"
      />
    </div>
  );
}
