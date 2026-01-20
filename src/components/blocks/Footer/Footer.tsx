import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollLink } from "@/components/ui/scroll-link";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import DateDisplay from "@/components/utils/DateDisplay";

// Link item configuration
export interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
  hasArrow?: boolean;
}

// Footer section configuration
export interface FooterSection {
  title: string;
  links: LinkItem[];
}

// Social media link configuration
export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin";
  href: string;
  ariaLabel: string;
}

// Base props for the Footer component
export interface FooterProps {
  // Logo section
  logo?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  tagline?: string;

  // Sections
  sections: FooterSection[];

  // Contact section
  contactSection?: {
    title: string;
    phone?: string;
    email?: string;
  };

  // Social media
  socialLinks?: SocialLink[];

  // Copyright
  copyrightText: string;

  // Custom styling
  className?: string;
  containerClassName?: string;
  topSectionClassName?: string;
  // Behavior
  enableScrollTo?: boolean;
  onLinkClick?: (href: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  tagline,
  sections,
  contactSection,
  socialLinks = [],
  copyrightText,
  className = "",
  containerClassName = "",
  topSectionClassName = "",
  enableScrollTo = true,
  onLinkClick,
}) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      case "linkedin":
        return Linkedin;
      default:
        return Facebook;
    }
  };

  const logoSrc =
    logo?.src || "/images/gutachten-org/logo/gutachten-org-logo-dark.webp";
  const logoAlt = logo?.alt || "Gutachten.org Logo";

  const renderCopyright = () => {
    if (!copyrightText) return null;

    // Replace any 4-digit year in the text with a dynamic DateDisplay year
    const yearMatch = copyrightText.match(/\b(19|20)\d{2}\b/);

    if (!yearMatch) return copyrightText;

    const year = yearMatch[0];
    const [before, after] = copyrightText.split(year);

    return (
      <>
        {before}
        <DateDisplay dateFormat="year" />
        {after}
      </>
    );
  };

  return (
    <footer className={`bg-[#273238] py-12 text-[#f8fafb] ${className}`}>
      <div className={cn("container-gutachten", containerClassName)}>
        <div
          className={cn(
            "mb-8 flex flex-col items-start gap-12 md:flex-row md:gap-[4.5rem]",
            topSectionClassName
          )}
        >
          {/* Logo and Tagline Section */}
          <div
            className="flex max-w-full flex-1 flex-col gap-12 md:max-w-[460px]"
            herokit-id="9f201f84-afe5-4b9f-8add-af9f01dea693"
          >
            <Link href="/" className="inline-block">
              <Image
                src={logoSrc}
                alt={logoAlt}
                loading="lazy"
                width={logo?.width || 461}
                height={logo?.height || 50}
                className="w-auto h-[50px]"
                // priority
              />
            </Link>
            {tagline && (
              <p
                className="font-sora m-0 text-sm leading-[2.1] font-medium text-[#b9bec1]"
                herokit-id="2a0c7ccb-1882-425d-a190-2b94ce146ec8"
              >
                {tagline}
              </p>
            )}
          </div>

          {/* Footer Sections Grid */}
          <div
            className="grid max-w-full flex-2 grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2"
            herokit-id="1c9b244a-390f-4207-ab7d-a12159535a70"
          >
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3
                  className="font-sora m-0 text-sm leading-[1.646] font-medium text-white"
                  herokit-id="6e354cde-4d8e-459c-ba47-1e5eec24c14d"
                >
                  {section.title}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="m-0"
                      herokit-id="ee3f1680-34cc-4d6c-b6bd-937e7bf82302"
                    >
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="navigation-nav-group group relative flex items-center gap-1.5 rounded-[8px] py-1.5 text-xs font-medium text-[#b9bec1] transition-all duration-200 xl:py-2 xl:text-sm"
                          onClick={
                            onLinkClick
                              ? () => onLinkClick(link.href)
                              : undefined
                          }
                        >
                          <span herokit-id="6b3931ac-f2a4-45d5-9c0b-1807487fbc75">
                            {link.label}
                          </span>
                          <ArrowUpRight className="navigation-nav-group-arrow-icon h-3.5 w-3.5 text-orange-500 opacity-0" />
                        </a>
                      ) : link.href.startsWith("#") ? (
                        <ScrollLink
                          href={link.href}
                          onClick={
                            onLinkClick
                              ? () => onLinkClick(link.href)
                              : undefined
                          }
                          enableScrollTo={enableScrollTo}
                          className="navigation-nav-group group relative flex items-center gap-1.5 rounded-[8px] py-1.5 text-xs font-medium text-[#b9bec1] transition-all duration-200 xl:py-2 xl:text-sm"
                        >
                          <span herokit-id="675dac3a-5a78-49a2-a151-ac54fd1c2495">
                            {link.label}
                          </span>
                          <ArrowUpRight className="navigation-nav-group-arrow-icon h-3.5 w-3.5 text-orange-500 opacity-0" />
                        </ScrollLink>
                      ) : (
                        // <Link
                        //   key={link.href}
                        //   href={link.href}
                          // onClick={
                          //   onLinkClick
                          //     ? () => onLinkClick(link.href)
                          //     : undefined
                          // }
                        //   className="footer-link-group group relative gap-1.5 rounded-[8px] px-2 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 xl:px-4 xl:py-2 xl:text-smfont-inter inline-flex items-center gap-2 text-sm leading-[1.943] font-normal text-[#b9bec1] no-underline transition-colors duration-200 hover:text-[#FF985C]"
                        // >
                        //   <span herokit-id="b823eee2-7b00-4b3d-a5a0-befc6ade15e5">
                        //     {link.label}
                        //   </span>
                        //   <ArrowUpRight className="footer-link-arrow-icon h-3.5 w-3.5 text-orange-500 opacity-0" />
                        // </Link>
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={
                            onLinkClick
                              ? () => onLinkClick(link.href)
                              : undefined
                          }
                          className="navigation-nav-group group relative flex items-center gap-1.5 rounded-[8px] py-1.5 text-xs font-medium text-[#b9bec1] transition-all duration-200 xl:py-2 xl:text-sm"
                        >
                          <span herokit-id="c45fb816-3100-490e-a432-f4c88f1acd08">
                            {link.label}
                          </span>
                          <ArrowUpRight className="navigation-nav-group-arrow-icon h-3.5 w-3.5 text-orange-500 opacity-0" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            {contactSection && (
              <div className="flex flex-col gap-3">
                <h3
                  className="font-sora m-0 text-sm leading-[1.646] font-medium text-white"
                  herokit-id="462e0adb-cfa7-42b9-85b8-cdf089510c9c"
                >
                  {contactSection.title}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {contactSection.phone && (
                    <li className="m-0">
                      <a
                        href={`tel:${contactSection.phone.replace(/\s/g, "")}`}
                        className="footer-link-group font-inter inline-flex items-center gap-2 text-sm leading-[1.943] font-normal text-[#b9bec1] no-underline transition-colors duration-200 hover:text-[#FF985C]"
                      >
                        <span herokit-id="438a5ef6-dbe8-474d-a5bc-1fcfd65edf75">
                          {contactSection.phone}
                        </span>
                        <ArrowUpRight
                          className="footer-link-arrow-icon h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-300"
                          color="#FF985C"
                          strokeWidth={2.5}
                        />
                      </a>
                    </li>
                  )}
                  {contactSection.email && (
                    <li className="m-0">
                      <a
                        href={`mailto:${contactSection.email}`}
                        className="footer-link-group font-inter inline-flex items-center gap-2 text-sm leading-[1.943] font-normal text-[#b9bec1] no-underline transition-colors duration-200 hover:text-[#FF985C]"
                      >
                        <span herokit-id="6965c8cd-b697-4793-9188-c8ae3588bd06">
                          {contactSection.email}
                        </span>
                        <ArrowUpRight
                          className="footer-link-arrow-icon h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-300"
                          color="#FF985C"
                          strokeWidth={2.5}
                        />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col items-start justify-between gap-6 border-t border-[#515a5f] pt-6 sm:flex-row sm:items-center"
          herokit-id="4f58e562-99c9-4f45-aa56-5a71ac80581d"
        >
          <p
            className="font-inter m-0 flex-1 text-left text-xs leading-[2.1] font-normal text-[#b9bec1]"
            herokit-id="e239af40-3080-43e6-b3f0-f44fcc3162e9"
          >
            {renderCopyright()}
          </p>
          {socialLinks.length > 0 && (
            <div
              className="flex items-center gap-6 self-start sm:self-auto"
              herokit-id="2ee3c7ef-a0c2-418c-866a-778e436c3e94"
            >
              {socialLinks.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="flex h-[2.375rem] w-[2.375rem] items-center justify-center rounded-none bg-[#273238] text-white no-underline transition-all duration-200"
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
