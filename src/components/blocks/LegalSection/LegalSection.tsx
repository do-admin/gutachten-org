import React from "react";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface LegalSectionProps {
  abbreviation: string;
  fullName: string;
  category:
    | "Gesetz"
    | "Verordnung"
    | "Richtlinie"
    | "Norm"
    | "Satzung"
    | string;
  description: string;
  keyFacts?: {
    label: string;
    value: string;
    icon?: keyof typeof Icons;
  }[];
  whatItRegulates: string[];
  impactOnPropertyManagement: string;
  keyRequirements: string[];
  icon?: keyof typeof Icons;
  accentColor?:
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "indigo"
    | "teal";
  backgroundColor?: string;
  sectionClassName?: string;
}

const colorVariants = {
  blue: {
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    iconBg: "bg-blue-50",
  },
  green: {
    badge: "bg-green-100 text-green-800 border-green-200",
    accent: "text-green-600",
    border: "border-green-200",
    iconBg: "bg-green-50",
  },
  purple: {
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    iconBg: "bg-purple-50",
  },
  orange: {
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    accent: "text-orange-600",
    border: "border-orange-200",
    iconBg: "bg-orange-50",
  },
  red: {
    badge: "bg-red-100 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    iconBg: "bg-red-50",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    iconBg: "bg-indigo-50",
  },
  teal: {
    badge: "bg-teal-100 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    iconBg: "bg-teal-50",
  },
};

export function LegalSection({
  abbreviation,
  fullName,
  category,
  description,
  keyFacts = [],
  whatItRegulates,
  impactOnPropertyManagement,
  keyRequirements,
  icon = "Scale",
  accentColor = "blue",
  backgroundColor = "bg-white",
  sectionClassName = "",
}: LegalSectionProps) {
  const IconComponent =
    (Icons[icon] as unknown as React.ComponentType<{ className?: string }>) ||
    Icons.Scale;
  const colors = colorVariants[accentColor] || colorVariants.blue;

  return (
    <section className={`py-8 ${backgroundColor} ${sectionClassName}`}>
      <div className="container mx-auto px-4">
        <Card
          className={`border-2 ${colors.border} shadow-lg transition-shadow duration-300 hover:shadow-xl`}
        >
          <CardHeader
            className="space-y-4"
            herokit-id="d833ea8a-c3e7-4878-838e-fcc38d520a5c"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${colors.iconBg}`}>
                  <IconComponent className={`h-8 w-8 ${colors.accent}`} />
                </div>
                <div>
                  <h2
                    className={`text-3xl font-bold ${colors.accent}`}
                    herokit-id="3b7ad5c7-4939-45fc-9081-f6848de9f2b0"
                  >
                    {abbreviation}
                  </h2>
                  <p
                    className="text-muted-foreground mt-1 text-lg"
                    herokit-id="8b6a7576-e3e0-4f2c-a3c6-f1dc5b56c661"
                  >
                    {fullName}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${colors.badge} px-4 py-2 text-sm font-semibold`}
                herokit-id="167d8424-2fd6-4d2d-94c2-b83f4b4e5f1d"
              >
                {category}
              </Badge>
            </div>

            <p
              className="text-foreground/90 text-lg leading-relaxed"
              herokit-id="8394d553-a7d7-45ba-889b-ea12f60f5929"
            >
              {description}
            </p>

            {keyFacts.length > 0 && (
              <div
                className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                herokit-id="f4e19004-5d14-44a4-89c7-ce3602a99783"
              >
                {keyFacts.map((fact, index) => {
                  const FactIcon = (fact.icon
                    ? Icons[fact.icon]
                    : Icons.Info) as unknown as React.ComponentType<{
                    className?: string;
                  }>;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded-lg border p-4 ${colors.border} ${colors.iconBg}`}
                      herokit-id="a03a5bc5-a891-4e2e-b141-ce8e5e0fe324"
                    >
                      {FactIcon && (
                        <FactIcon
                          className={`mt-0.5 h-5 w-5 ${colors.accent} flex-shrink-0`}
                        />
                      )}
                      <div>
                        <div
                          className="text-muted-foreground text-sm font-semibold"
                          herokit-id="80f9557c-91b7-4c8e-92b6-99057f463945"
                        >
                          {fact.label}
                        </div>
                        <div
                          className="mt-1 text-base font-bold"
                          herokit-id="e99c5cd7-5a5a-4bb0-8e1c-ff4ba3084ea0"
                        >
                          {fact.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8 pt-0">
            {/* What It Regulates */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Icons.BookOpen className={`h-5 w-5 ${colors.accent}`} />
                <h3
                  className="text-xl font-bold"
                  herokit-id="499f653c-6e41-4a05-92d0-a9fd0a865b38"
                >
                  Regelungsbereich
                </h3>
              </div>
              <ul className="space-y-2">
                {whatItRegulates.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icons.Check
                      className={`mt-0.5 h-5 w-5 ${colors.accent} flex-shrink-0`}
                    />
                    <span
                      className="text-base leading-relaxed"
                      herokit-id="98456a58-9916-43d9-8fc9-23fc13cd2c8b"
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact on Property Management */}
            <div
              className={`rounded-lg border-l-4 p-6 ${colors.border} bg-muted/30`}
            >
              <div className="mb-3 flex items-center gap-2">
                <Icons.Building2 className={`h-5 w-5 ${colors.accent}`} />
                <h3
                  className="text-xl font-bold"
                  herokit-id="bd6032bb-3975-4c2a-af60-4e2cec9ce027"
                >
                  Auswirkungen auf die Hausverwaltung
                </h3>
              </div>
              <p
                className="text-base leading-relaxed"
                herokit-id="0bd33073-7e66-4a22-af5d-c33a6752db40"
              >
                {impactOnPropertyManagement}
              </p>
            </div>

            {/* Key Requirements */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Icons.ClipboardCheck className={`h-5 w-5 ${colors.accent}`} />
                <h3
                  className="text-xl font-bold"
                  herokit-id="7c428af4-4506-4c51-9f7e-d82ea36bfc73"
                >
                  Wichtige Anforderungen
                </h3>
              </div>
              <div
                className="grid gap-3"
                herokit-id="fa908596-86db-4939-b969-d22819147990"
              >
                {keyRequirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="bg-muted/20 border-border flex items-start gap-3 rounded-lg border p-4"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${colors.iconBg} ${colors.accent} mt-0.5 flex-shrink-0 text-sm font-bold`}
                      herokit-id="12976bdc-99b8-438f-a770-21ac6c171cdb"
                    >
                      {index + 1}
                    </div>
                    <span
                      className="text-base leading-relaxed"
                      herokit-id="75db5107-82cc-45b2-bc04-5210aa2dbc7a"
                    >
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
