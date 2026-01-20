import React from "react";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

export interface TaxTopicSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  keyFigures?: {
    label: string;
    value: string;
    highlight?: boolean;
    icon?: keyof typeof Icons;
  }[];
  whatIsTaxDeductible?: string[];
  whatIsNotDeductible?: string[];
  practicalAdvice?: string[];
  warnings?: string[];
  taxLawReference?: string;
  icon?: keyof typeof Icons;
  accentColor?:
    | "emerald"
    | "blue"
    | "amber"
    | "purple"
    | "rose"
    | "teal"
    | "indigo"
    | "black";
  backgroundColor?: string;
  sectionClassName?: string;
}

const colorVariants = {
  emerald: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    iconBg: "bg-emerald-50",
    highlight: "bg-emerald-100 border-emerald-300",
  },
  blue: {
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    iconBg: "bg-blue-50",
    highlight: "bg-blue-100 border-blue-300",
  },
  amber: {
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    iconBg: "bg-amber-50",
    highlight: "bg-amber-100 border-amber-300",
  },
  purple: {
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    iconBg: "bg-purple-50",
    highlight: "bg-purple-100 border-purple-300",
  },
  rose: {
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    iconBg: "bg-rose-50",
    highlight: "bg-rose-100 border-rose-300",
  },
  teal: {
    badge: "bg-teal-100 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    iconBg: "bg-teal-50",
    highlight: "bg-teal-100 border-teal-300",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    iconBg: "bg-indigo-50",
    highlight: "bg-indigo-100 border-indigo-300",
  },
  black: {
    badge: "bg-zinc-900 text-white border-zinc-800",
    accent: "text-zinc-900",
    border: "border-zinc-200",
    iconBg: "bg-zinc-900/5",
    highlight: "bg-zinc-900/10 border-zinc-400",
  },
};

export function TaxTopicSection({
  title,
  subtitle,
  description,
  keyFigures = [],
  whatIsTaxDeductible = [],
  whatIsNotDeductible = [],
  practicalAdvice = [],
  warnings = [],
  taxLawReference,
  icon = "Calculator",
  accentColor = "emerald",
  backgroundColor = "bg-white",
  sectionClassName = "",
}: TaxTopicSectionProps) {
  const IconComponent =
    (Icons[icon] as unknown as React.ComponentType<{ className?: string }>) ||
    Icons.Calculator;
  const colors = colorVariants[accentColor] || colorVariants.emerald;

  return (
    <section className={`py-8 ${backgroundColor} ${sectionClassName}`}>
      <div className="container mx-auto px-4">
        <Card
          className={`border-2 ${colors.border} shadow-lg transition-shadow duration-300 hover:shadow-xl`}
        >
          <CardHeader
            className="space-y-4"
            herokit-id="213cbf19-c4a4-4519-9263-3585e724a7ba"
          >
            <div
              className="flex flex-wrap items-start justify-between gap-4"
              herokit-id="72b324cb-88a8-47d6-a3c6-363688e426f3"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${colors.iconBg}`}>
                  <IconComponent className={`h-8 w-8 ${colors.accent}`} />
                </div>
                <div herokit-id="a7e551cd-e379-40e7-939e-952a2c6d0f0b">
                  <h2
                    className={`text-3xl font-bold ${colors.accent}`}
                    herokit-id="983dd0e5-70d5-47d4-8c04-8c07f20bc683"
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <p
                      className="text-muted-foreground mt-1 text-lg"
                      herokit-id="a1b34cf5-7442-44e8-94bd-ac2bdcce2d58"
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              {taxLawReference && (
                <Badge
                  variant="outline"
                  className={`${colors.badge} px-4 py-2 text-sm font-semibold`}
                  herokit-id="c4bf4963-d6ba-4019-ac14-6993963671ce"
                >
                  {taxLawReference}
                </Badge>
              )}
            </div>

            <p
              className="text-foreground/90 text-lg leading-relaxed"
              herokit-id="5b08788b-599d-4b95-92f4-ae6b478c86d7"
            >
              {description}
            </p>

            {keyFigures.length > 0 && (
              <div
                className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                herokit-id="ebbeb0b2-f20f-429e-8040-f497dcb40949"
              >
                {keyFigures.map((figure, index) => {
                  const FigureIcon = (figure.icon
                    ? Icons[figure.icon]
                    : Icons.Euro) as unknown as React.ComponentType<{
                    className?: string;
                  }>;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded-lg border p-4 ${
                        figure.highlight
                          ? colors.highlight
                          : `${colors.border} ${colors.iconBg}`
                      }`}
                      herokit-id="e3456c68-338b-4d53-b732-2b141bc27988"
                    >
                      {FigureIcon && (
                        <FigureIcon
                          className={`mt-0.5 h-5 w-5 ${colors.accent} flex-shrink-0`}
                        />
                      )}
                      <div>
                        <div
                          className="text-muted-foreground text-sm font-semibold"
                          herokit-id="56e074bb-a26a-4125-a08d-1c0cdf79e180"
                        >
                          {figure.label}
                        </div>
                        <div
                          className={`mt-1 text-xl font-bold ${
                            figure.highlight ? colors.accent : ""
                          }`}
                          herokit-id="99cbbe53-9409-4f9c-ba90-5c859a89c1b1"
                        >
                          {figure.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardHeader>

          <CardContent
            className="space-y-8 pt-0"
            herokit-id="9447cabf-b6b8-4380-b11a-770742d01b8d"
          >
            {/* Tax Deductible Items */}
            {whatIsTaxDeductible.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Icons.CheckCircle2 className={`h-5 w-5 ${colors.accent}`} />
                  <h3
                    className="text-xl font-bold"
                    herokit-id="7bad6e39-5f1e-4865-89bd-53eda4681827"
                  >
                    Steuerlich absetzbar
                  </h3>
                </div>
                <ul className="space-y-2">
                  {whatIsTaxDeductible.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.Plus
                        className={`mt-0.5 h-5 w-5 ${colors.accent} flex-shrink-0`}
                      />
                      <SafeHtmlRenderer
                        content={item}
                        className="text-base leading-relaxed"
                        tag="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Not Tax Deductible Items */}
            {whatIsNotDeductible.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Icons.XCircle className="h-5 w-5 text-rose-600" />
                  <h3
                    className="text-xl font-bold"
                    herokit-id="1c0eccec-43a5-48aa-8632-2bdd0a0d2af3"
                  >
                    Nicht absetzbar
                  </h3>
                </div>
                <ul className="space-y-2">
                  {whatIsNotDeductible.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.Minus className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                      <SafeHtmlRenderer
                        content={item}
                        className="text-muted-foreground text-base leading-relaxed"
                        tag="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Advice */}
            {practicalAdvice.length > 0 && (
              <div
                className={`rounded-lg border-l-4 p-6 ${colors.border} bg-muted/30`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icons.Lightbulb className={`h-5 w-5 ${colors.accent}`} />
                  <h3
                    className="text-xl font-bold"
                    herokit-id="275a0d1a-da75-476a-8d30-fbbfd06d043f"
                  >
                    Praktische Tipps
                  </h3>
                </div>
                <div
                  className="space-y-3"
                  herokit-id="0bc985c2-e3ce-4219-98c0-aca2dc2990c1"
                >
                  {practicalAdvice.map((advice, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-base leading-relaxed"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${colors.iconBg} ${colors.accent} mt-0.5 flex-shrink-0 text-sm font-bold`}
                        herokit-id="2017832e-2536-4a00-b4f8-1be2906d6d62"
                      >
                        {index + 1}
                      </div>
                      <SafeHtmlRenderer content={advice} tag="p" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="rounded-lg border-l-4 border-amber-300 bg-amber-50/50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Icons.AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3
                    className="text-xl font-bold"
                    herokit-id="b4a228bc-3e9e-4bbd-aa33-ae474f7909a0"
                  >
                    Wichtige Hinweise
                  </h3>
                </div>
                <div
                  className="space-y-2"
                  herokit-id="90c7635b-d924-4027-b28e-873d3324188b"
                >
                  {warnings.map((warning, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-base leading-relaxed"
                    >
                      <Icons.AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                      <SafeHtmlRenderer content={warning} tag="p" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
