import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { DynamicIcon, type LucideIconName } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";

export interface CenteredCtaStatementCta {
  label: string;
  href: string;
  external?: boolean;
  icon?: LucideIconName;
  className?: string;
  iconClassName?: string;
}

export interface CenteredCtaStatementProps {
  // Content
  icon?: LucideIconName;
  title: string;
  subtitle?: string;
  cta?: CenteredCtaStatementCta;

  // Section props
  sectionId?: string;
  componentId?: string;

  // Styling props
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function CenteredCtaStatement({
  icon = "Scale",
  title,
  subtitle,
  cta,
  sectionId = "centered-cta-statement",
  componentId,
  className,
  containerClassName = "container-gutachten",
  contentClassName,
  iconClassName,
  titleClassName,
  subtitleClassName,
}: CenteredCtaStatementProps) {
  return (
    <Section
      id={sectionId}
      className={cn(
        "relative overflow-hidden bg-[#F8FAFB] py-16 md:py-24 lg:py-32",
        className
      )}
      data-component-id={componentId}
    >
      <Container className={cn(containerClassName)}>
        <div
          className={cn(
            "mx-auto flex max-w-[680px] flex-col items-center text-center md:max-w-[800px]",
            contentClassName
          )}
        >
          <DynamicIcon
            name={icon}
            className={cn(
              "mb-6 h-8 w-8 text-[#CBD5E1] md:mb-8 md:h-10 md:w-10",
              iconClassName
            )}
            aria-hidden="true"
          />

          <h2
            className={cn(
              "text-[32px] leading-[40px] font-semibold tracking-[-0.02em] whitespace-pre-line text-[#0F172A] sm:text-[36px] sm:leading-[44px] md:text-[44px] md:leading-[52px] lg:text-[48px] lg:leading-[56px]",
              titleClassName
            )}
            lang="de"
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "mt-4 text-[16px] leading-[28px] whitespace-pre-line text-slate-600 md:mt-6 md:text-[18px] md:leading-[32px] lg:text-[20px] lg:leading-[34px]",
                subtitleClassName
              )}
              lang="de"
            >
              {subtitle}
            </p>
          )}

          {cta?.href && cta.label && (
            <div className="mt-8 md:mt-10">
              <Button
                asChild
                className={cn(
                  "h-[52px] min-w-[280px] rounded-[8px] bg-[#243239] px-6 text-[14px] font-semibold text-white shadow-sm hover:bg-[#243239]/90 md:h-[56px] md:min-w-[320px] md:px-8",
                  cta.className
                )}
              >
                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center gap-3 md:gap-4"
                >
                  <span>{cta.label}</span>
                  <DynamicIcon
                    name={cta.icon || "ArrowRight"}
                    className={cn("h-4 w-4 text-white", cta.iconClassName)}
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
