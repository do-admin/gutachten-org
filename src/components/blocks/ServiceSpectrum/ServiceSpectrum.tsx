import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";

export interface ServiceSpectrumLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: LucideIconName;
  className?: string;
  iconClassName?: string;
}

export interface ServiceSpectrumCardBullet {
  text: string;
  className?: string;
}

export interface ServiceSpectrumCard {
  icon?: LucideIconName;
  badgeText?: string;
  title: string;
  description?: string;
  bullets?: ServiceSpectrumCardBullet[];
  className?: string;
}

export interface ServiceSpectrumProps {
  // Content
  title: string;
  subtitle?: string;
  link?: ServiceSpectrumLink;
  cards: ServiceSpectrumCard[];

  // Section props
  sectionId?: string;
  componentId?: string;

  // Styling props
  className?: string;
  containerClassName?: string;

  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  linkClassName?: string;

  cardsWrapperClassName?: string;
  cardClassName?: string;
  iconClassName?: string;
  badgeClassName?: string;
  bulletDotClassName?: string;
  bulletTextClassName?: string;
}

export function ServiceSpectrum({
  title,
  subtitle,
  link,
  cards,
  sectionId = "leistungsspektrum",
  componentId,
  className,
  containerClassName = "container-gutachten",
  headerClassName,
  titleClassName,
  subtitleClassName,
  linkClassName,
  cardsWrapperClassName,
  cardClassName,
  iconClassName,
  badgeClassName,
  bulletDotClassName,
  bulletTextClassName,
}: ServiceSpectrumProps) {
  return (
    <>
      <Section
        id={sectionId}
        className={cn("bg-white py-14 md:py-20", className)}
        data-component-id={componentId}
      >
        <Container
          className={cn("flex flex-col gap-10 md:gap-12", containerClassName)}
        >
          <div
            className={cn(
              "flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10",
              headerClassName
            )}
          >
            <div className="max-w-[720px]">
              <h2
                className={cn(
                  "text-[32px] leading-[40px] font-semibold tracking-[-0.02em] text-[#111827] md:text-[40px] md:leading-[48px]",
                  titleClassName
                )}
                lang="de"
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className={cn(
                    "mt-4 text-[16px] leading-[26px] whitespace-pre-line text-slate-600 md:text-[18px] md:leading-[30px]",
                    subtitleClassName
                  )}
                  lang="de"
                >
                  {subtitle}
                </p>
              )}
            </div>

            {link?.href && link.label && (
              <div className="md:pt-2">
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-4 text-[14px] leading-[20px] font-medium text-[#111827]",
                    link.className,
                    linkClassName
                  )}
                >
                  <span>{link.label}</span>
                  <span className="flex h-8 w-8 items-center justify-center">
                    <DynamicIcon
                      name={link.icon || "ArrowRight"}
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5",
                        link.iconClassName
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-[#F0F5F9] bg-white",
              cardsWrapperClassName
            )}
          >
            <div className="grid grid-cols-1 divide-y divide-[#F0F5F9] md:grid-cols-3 md:divide-x md:divide-y-0">
              {cards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  className={cn(
                    "relative px-8 py-10 md:px-10 md:py-12",
                    cardClassName,
                    card.className
                  )}
                >
                  {card.badgeText && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={cn(
                          "rounded bg-[#EEF2F7] px-2 py-1 text-[10px] leading-[14px] font-semibold tracking-[0.12em] text-slate-600",
                          badgeClassName
                        )}
                      >
                        {card.badgeText}
                      </span>
                    </div>
                  )}

                  {card.icon && (
                    <DynamicIcon
                      name={card.icon}
                      className={cn("h-8 w-8 text-[#CBD5E1]", iconClassName)}
                      aria-hidden="true"
                    />
                  )}

                  <h3
                    className="mt-6 text-[18px] leading-[26px] font-semibold text-[#111827]"
                    lang="de"
                  >
                    {card.title}
                  </h3>

                  {card.description && (
                    <p
                      className="mt-3 text-[14px] leading-[24px] text-slate-600"
                      lang="de"
                    >
                      {card.description}
                    </p>
                  )}

                  {card.bullets && card.bullets.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {card.bullets.map((b, bulletIdx) => (
                        <li
                          key={`${b.text}-${bulletIdx}`}
                          className={cn("flex items-start gap-3", b.className)}
                        >
                          <span
                            className={cn(
                              "mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF985C]",
                              bulletDotClassName
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              "text-[13px] leading-[22px] text-[#94A3B8]",
                              bulletTextClassName
                            )}
                            lang="de"
                          >
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
