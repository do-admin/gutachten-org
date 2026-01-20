import { ScrollButton } from "@/components/ui/scroll-button";
import { cn } from "@/lib/utils";

type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

type OpeningHour = {
  day: string;
  time: string;
};

type CTAButton = {
  text: string;
  href: string;
  ariaLabel?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  enableScrollTo?: boolean;
};

export interface ImmoverdeMapSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  addressLines: string[];
  contactItems?: ContactItem[];
  openingHours?: OpeningHour[];
  mapSrc: string;
  mapTitle?: string;
  className?: string;
  ctaButton?: CTAButton;
}

export default function ImmoverdeMapSection({
  badge,
  title,
  subtitle,
  description,
  addressLines,
  contactItems = [],
  openingHours = [],
  mapSrc,
  mapTitle = "Immobilienberatung in Hannover",
  className,
  ctaButton,
}: ImmoverdeMapSectionProps) {
  return (
    <section
      className={cn("bg-white py-8 md:py-16", className)}
      aria-labelledby="immoverde-map-section"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-3">
          <div
            className="space-y-8"
            herokit-id="98d41624-66aa-4288-901a-d29a87924614"
          >
            <div
              className="space-y-4"
              herokit-id="d7a92973-7e88-4508-9103-3d0b4f626e8f"
            >
              {badge ? (
                <span
                  className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700"
                  herokit-id="f9d229b8-b0e1-42fd-95f9-f44569c244d2"
                >
                  {badge}
                </span>
              ) : null}
              <div
                className="space-y-3"
                herokit-id="d74b056d-9f6a-4d93-a6db-c19da79aa48b"
              >
                <h2
                  id="immoverde-map-section"
                  className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
                  herokit-id="9f385ff0-4674-4059-a31d-8a9cb6188d84"
                >
                  {title}
                </h2>
                {subtitle ? (
                  <p
                    className="text-muted-foreground text-lg"
                    herokit-id="ff150733-9c68-4a27-99fb-adaaaed743e7"
                  >
                    {subtitle}
                  </p>
                ) : null}
                {description ? (
                  <p
                    className="text-muted-foreground"
                    herokit-id="a6d17637-013f-4264-85fc-828bce20a45a"
                  >
                    {description}
                  </p>
                ) : null}
              </div>
            </div>

            <div
              className="space-y-6"
              herokit-id="6e0cc5f8-72b5-4669-98d4-62493237d541"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3
                  className="text-lg font-semibold text-slate-900"
                  herokit-id="732f175a-adfb-4584-b262-6bf2cf54337c"
                >
                  Adresse
                </h3>
                <address
                  className="text-muted-foreground mt-3 space-y-1 not-italic"
                  herokit-id="82b96cd0-adf4-43b1-9cfa-289062488b06"
                >
                  {addressLines.map((line) => (
                    <div
                      key={line}
                      herokit-id="401a6367-a03c-4cdf-be22-fe1f40f8e8a8"
                    >
                      {line}
                    </div>
                  ))}
                </address>
              </div>

              {(contactItems.length > 0 || openingHours.length > 0) && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3
                    className="text-lg font-semibold text-slate-900"
                    herokit-id="106f6226-b112-4f17-aa4e-94e7199153f7"
                  >
                    Kontakt
                  </h3>
                  <div
                    className="text-muted-foreground mt-3 space-y-3"
                    herokit-id="07a4e81c-b03e-414e-8bef-7e0bf62bb0df"
                  >
                    {contactItems.map(({ label, value, href }) => (
                      <div
                        key={`${label}-${value}`}
                        herokit-id="bd71f32f-9a61-4c39-b9ce-bc070e01d6ef"
                      >
                        <div
                          className="text-sm font-medium text-slate-900"
                          herokit-id="a45707e7-fcf0-4a89-8aa5-76f9152184ac"
                        >
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            className="text-muted-foreground transition-colors hover:text-emerald-600"
                            herokit-id="10d610da-3740-4c94-a6b9-d3652346af7e"
                          >
                            {value}
                          </a>
                        ) : (
                          <div herokit-id="51d8a1ae-826b-4cd8-82fc-d42fb8dbe4f3">
                            {value}
                          </div>
                        )}
                      </div>
                    ))}
                    {openingHours.length > 0 ? (
                      <div>
                        <div
                          className="text-sm font-medium text-slate-900"
                          herokit-id="5a1790dc-4356-4da4-a5fa-c012ddbf39a7"
                        >
                          Öffnungszeiten
                        </div>
                        <ul className="mt-2 space-y-1">
                          {openingHours.map((item) => (
                            <li
                              key={`${item.day}-${item.time}`}
                              herokit-id="ed97c6f2-c954-4cec-920f-371d83aa4300"
                            >
                              <span herokit-id="d92bc1b1-2311-4c1b-b11a-48b50bbf8134">
                                {item.day}
                              </span>
                              :{" "}
                              <span
                                className="font-medium"
                                herokit-id="c43bd584-ec03-45a3-bd60-183fddae0398"
                              >
                                {item.time}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {ctaButton ? (
              <ScrollButton
                href={ctaButton.href}
                text={ctaButton.text}
                variant={ctaButton.variant || "default"}
                size={ctaButton.size}
                className={ctaButton.className}
                enableScrollTo={ctaButton.enableScrollTo}
              />
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <div className="h-96 min-h-[400px] overflow-hidden rounded-2xl bg-gray-100 shadow-lg lg:h-full">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={mapTitle}
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
