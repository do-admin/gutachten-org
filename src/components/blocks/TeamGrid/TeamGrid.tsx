import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section, Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export interface TeamMemberContactLink {
  label: string;
  href: string;
  icon?: string;
  srOnlyLabel?: string;
}

export interface TeamMemberImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface TeamMember {
  type?: "member";
  name: string;
  role: string;
  description?: string;
  highlights?: string[];
  badges?: string[];
  image: TeamMemberImage;
  contacts?: TeamMemberContactLink[];
}

export interface TeamGridCallToAction {
  type: "cta";
  image: TeamMemberImage;
  buttonLabel: string;
  buttonHref?: string;
  defaultText?: string;
  captionTitle?: string;
  captionSubtitle?: string;
}

export type TeamGridItem = TeamMember | TeamGridCallToAction;

export interface TeamGridProps {
  members: TeamGridItem[];
  columns?: 2 | 3 | 4;
  sectionId?: string;
  variant?: "default" | "secondary";
  className?: string;
  containerClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  enableAnimation?: boolean;
  animationDelay?: number;
}

const isCTA = (item: TeamGridItem): item is TeamGridCallToAction =>
  item.type === "cta";

const getColumnsClass = (columns: number | undefined) => {
  switch (columns) {
    case 2:
      return "md:grid-cols-2";
    case 4:
      return "md:grid-cols-2 xl:grid-cols-4";
    case 3:
    default:
      return "md:grid-cols-2 xl:grid-cols-3";
  }
};

const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  columns = 3,
  sectionId = "team",
  variant = "default",
  className,
  containerClassName,
  gridClassName,
  cardClassName,
  enableAnimation = true,
  animationDelay = 0.08,
}) => {
  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={cn("", containerClassName)}>
        <div
          className={cn(
            "grid gap-8 sm:grid-cols-2",
            getColumnsClass(columns),
            gridClassName
          )}
          herokit-id="7eab4ec9-dca5-4132-9590-6569dd87027a"
        >
          {members.map((item, index) => {
            const animationStyle = enableAnimation
              ? { animationDelay: `${index * animationDelay}s` }
              : undefined;

            if (isCTA(item)) {
              const {
                image,
                buttonLabel,
                buttonHref,
                defaultText,
                captionTitle,
                captionSubtitle,
              } = item;

              const isCardClickable = buttonHref && !buttonHref.startsWith("#") && (buttonHref.startsWith("/") || buttonHref.startsWith("http"));

              const cardContent = (
                <div
                  key={`cta-${index}`}
                  className={cn(
                    "group bg-muted relative aspect-[3/2] overflow-hidden rounded-3xl",
                    isCardClickable && "cursor-pointer",
                    cardClassName,
                    enableAnimation && "animate-fade-in"
                  )}
                  style={animationStyle}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 544px, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/25 transition duration-300 group-hover:bg-black/45" />
                  <div
                    className="absolute inset-0 flex items-center justify-center px-8"
                    herokit-id="658171f9-a53b-45a6-a227-a284f3cab7c3"
                    onClick={(e) => isCardClickable && e.stopPropagation()}
                  >
                    {defaultText && (
                      <span
                        className="text-center text-lg font-semibold tracking-[0.25em] text-white uppercase transition duration-300 group-focus-within:opacity-0 group-hover:opacity-0 md:text-xl"
                        herokit-id="09880de7-91ae-45b9-b0b9-3535437be670"
                      >
                        {defaultText}
                      </span>
                    )}
                    {isCardClickable ? (
                      <div
                        className={cn(
                          "rounded-full border-2 border-white/90 px-7 py-3 text-base font-semibold tracking-[0.2em] text-white uppercase shadow-lg transition duration-300 hover:border-white hover:bg-white/10",
                          defaultText
                            ? "absolute translate-y-3 opacity-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                            : ""
                        )}
                        role="button"
                        aria-label={buttonLabel}
                        herokit-id="490b8e2b-b840-490d-94ba-16c3e5743bf5"
                      >
                        {buttonLabel}
                      </div>
                    ) : (
                      <a
                        href={buttonHref ?? "#"}
                        className={cn(
                          "cursor-pointer rounded-full border-2 border-white/90 px-7 py-3 text-base font-semibold tracking-[0.2em] text-white uppercase shadow-lg transition duration-300 hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none",
                          defaultText
                            ? "absolute translate-y-3 opacity-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                            : ""
                        )}
                        herokit-id="490b8e2b-b840-490d-94ba-16c3e5743bf5"
                      >
                        {buttonLabel}
                      </a>
                    )}
                  </div>
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 via-black/5 to-transparent p-6 text-center text-white"
                    herokit-id="2c19b506-9a4e-40c1-a402-cd7619234c2b"
                  >
                    {captionTitle && (
                      <span
                        className="text-lg leading-tight font-semibold md:text-xl"
                        herokit-id="7e826dd9-3d2c-4b47-88c1-490602a11e26"
                      >
                        {captionTitle}
                      </span>
                    )}
                    {captionSubtitle && (
                      <span
                        className="text-sm font-medium text-white/85 md:text-base"
                        herokit-id="d0f3d3e3-0d9c-4a2a-a292-3c3e04d4abb1"
                      >
                        {captionSubtitle}
                      </span>
                    )}
                  </div>
                </div>
              );

              // Wrap card in Link if it's a regular URL
              if (isCardClickable && buttonHref) {
                return (
                  <Link
                    href={buttonHref}
                    className="block"
                    key={`cta-link-${index}`}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return cardContent;
            }

            const { name, role, image, highlights = [] } = item;

            return (
              <figure
                key={`${name}-${index}`}
                className={cn(
                  "group bg-muted relative aspect-[3/2] overflow-hidden rounded-3xl",
                  cardClassName,
                  enableAnimation && "animate-fade-in"
                )}
                style={animationStyle}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 544px, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <figcaption
                  className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/5 to-transparent p-6 md:p-8"
                  herokit-id="c0bd1e62-5e74-4602-ba28-e02f5d6c051b"
                >
                  <span
                    className="text-xs font-semibold tracking-[0.35em] text-white/75 uppercase"
                    herokit-id="657bbda8-4813-472b-94de-0592b9b8279b"
                  >
                    {role}
                  </span>
                  <span
                    className="mt-3 text-2xl leading-tight font-semibold text-white md:text-3xl"
                    herokit-id="86eb44a3-9ff0-4ebe-8323-b0ee0e8e335a"
                  >
                    {name}
                  </span>
                  {highlights.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm text-white/85">
                      {highlights.map((highlight, highlightIndex) => (
                        <li
                          key={`${name}-highlight-${highlightIndex}`}
                          className="flex items-start gap-2"
                        >
                          <span herokit-id="f399e0a5-bbb2-4fea-ba5e-e4d5f8d65dbe">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default TeamGrid;
