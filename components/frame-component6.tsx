"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import EckdatenData from "./eckdaten-data";

export type FrameComponent6Type = {
  className?: string;
};

const FrameComponent6: NextPage<FrameComponent6Type> = ({ className = "" }) => {
  const [eckdatenDataItems] = useState([
    {
      datenSets: "1",
      unverbindlicheErsteinschtzung: "Unverbindliche\nErsteinschätzung",
      sendenSieUnsDieEckdatenIhrer:
        "Senden Sie uns die Eckdaten Ihrer Immobilie. Unsere Sachverständigen prüfen kostenlos und ehrlich, ob sich ein Gutachten für Sie lohnt.",
    },
    {
      datenSets: "2",
      unverbindlicheErsteinschtzung: "Detailliertes\nGutachten erhalten",
      sendenSieUnsDieEckdatenIhrer:
        "Sie erhalten ein professionelles, individuelles und plausibiliertes Gutachten, als verlässliche Grundlage für Ihre nächsten Schritte.",
    },
    {
      datenSets: "3",
      unverbindlicheErsteinschtzung: "Bei Bedarf: Gutachten beauftragen",
      sendenSieUnsDieEckdatenIhrer:
        "Auf Wunsch erstellen wir ein vollumfängliches Gutachten und erklären Ablauf, Aufwand und Kosten – transparent und planbar.",
    },
  ]);
  return (
    <section
      className={`self-stretch [background:linear-gradient(rgba(143,_181,_170,_0.1),_rgba(143,_181,_170,_0.1)),_#fff] flex flex-col items-start py-num-120 px-num-64 box-border max-w-full mq450:pt-num-51 mq450:pb-num-51 mq450:box-border mq800:pl-num-32 mq800:pr-num-32 mq800:box-border mq1125:pt-num-78 mq1125:pb-num-78 mq1125:box-border ${className}`}
    >
      <div className="self-stretch h-num-584 flex items-start gap-6 max-w-full mq1350:h-num-auto mq1350:flex-wrap">
        <div className="h-num-584 w-[867px] flex flex-col items-start gap-10 max-w-full mq450:gap-5 mq1125:h-num-auto mq1125:min-w-full mq1350:flex-1">
          <section className="self-stretch flex items-center justify-between gap-0 [row-gap:20px] text-left text-[32px] text-dark-neutral font-sora mq1125:flex-wrap mq1125:gap-0">
            <div className="h-[171px] flex-1 flex flex-col items-start justify-between gap-5 min-w-[192px]">
              <h2 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
                Der Ablauf
              </h2>
              <div className="relative text-num-14 tracking-num--0_1 leading-[144%] uppercase font-semibold font-inter text-dark-gray">
                Einfach
                <br />
                transparent
                <br />
                unverbindlich
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start gap-[23px] min-w-num-571 text-num-16 text-dark-gray font-inter">
              <div className="self-stretch relative tracking-num--0_1 leading-[180%]">
                Ein Immobiliengutachten muss nicht kompliziert sein. Bei uns
                starten Sie mit einer kostenfreien Ersteinschätzung – ohne
                Verpflichtung, aber mit maximaler Transparenz. So wissen Sie von
                Anfang an, was sinnvoll und wirtschaftlich ist.
              </div>
              <button className="cursor-pointer [border:none] py-2 px-num-18 bg-dark-neutral h-12 rounded-num-8 flex items-center justify-center box-border gap-6 hover:bg-dimgray-100">
                <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-light-neutral text-left">
                  Free Initial Assesment
                </div>
                <Image
                  className="w-3 relative max-h-full"
                  width={12}
                  height={11}
                  sizes="100vw"
                  alt=""
                  src="/tdesign-arrow-right-up1.svg"
                />
              </button>
            </div>
          </section>
          <section className="self-stretch flex-1 flex items-start gap-4 text-left text-num-20 text-gutachten-accent font-sora mq800:flex-wrap">
            {eckdatenDataItems.map((item, index) => (
              <EckdatenData
                key={index}
                datenSets={item.datenSets}
                unverbindlicheErsteinschtzung={
                  item.unverbindlicheErsteinschtzung
                }
                sendenSieUnsDieEckdatenIhrer={item.sendenSieUnsDieEckdatenIhrer}
              />
            ))}
          </section>
        </div>
        <div className="h-num-584 w-[421px] relative rounded-num-8 overflow-hidden shrink-0 bg-[url('/Frame-1000001030@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full mq800:min-w-full mq1350:flex-1">
          <Image
            className="absolute top-[calc(50%_-_150px)] left-[calc(50%_-_142.5px)] w-full h-[300px]"
            loading="lazy"
            width={286}
            height={300}
            sizes="100vw"
            alt=""
            src="/Profitieren-Hebel.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default FrameComponent6;
