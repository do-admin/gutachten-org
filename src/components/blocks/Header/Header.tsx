"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface HeaderProps {
  variant?: "light" | "dark";
  designVariant?: "default" | "gutachten-org";
  logo?: {
    light: string;
    dark: string;
    mobileIcon?: string;
  };
  logoClassName?: string;
  navigation?: Array<{
    name: string;
    href: string;
    isHighlighted?: boolean;
    target?: "_blank" | "_self" | "_parent" | "_top";
  }>;
  ctaButton?: {
    text: string;
    href: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
    size?: "default" | "sm" | "lg" | "icon";
  };
  className?: string;
  scrollEffects?: {
    enabled: boolean;
    shadowThreshold?: number;
    blurEnabled?: boolean;
  };
  mobileMenu?: {
    enabled: boolean;
    animationDuration?: number;
  };
}

const Header: React.FC<HeaderProps> = ({
  variant = "light",
  designVariant = "default",
  logo,
  logoClassName = "",
  navigation = [],
  ctaButton,
  className = "",
  scrollEffects = {
    enabled: true,
    shadowThreshold: 20,
    blurEnabled: true,
  },
  mobileMenu = {
    enabled: true,
    animationDuration: 300,
  },
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (scrollEffects.enabled) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > (scrollEffects.shadowThreshold || 20));
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollEffects.enabled, scrollEffects.shadowThreshold]);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
      router.push(href);
    }
  };

  const handleNavigation = (href: string, target?: string) => {
    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
      setIsMobileMenuOpen(false);
      return;
    }
    scrollToSection(href);
  };

  const renderLogo = () => {
    if (!logo) {
      return (
        <span
          className="text-foreground text-2xl font-bold"
          herokit-id="197ecf72-31f9-49f5-af12-e3591dcbf973"
        >
          Logo
        </span>
      );
    }

    if (typeof logo === "string") {
      return (
        <span
          className="text-foreground text-2xl font-bold"
          herokit-id="b192d9c2-31f3-4f6a-a7cd-631b228b0187"
        >
          {logo}
        </span>
      );
    }

    // Select logo based on variant: light header = dark logo, dark header = light logo
    const desktopLogoSrc = variant === "dark" ? logo.light : logo.dark;
    const mobileLogoSrc = logo.mobileIcon || desktopLogoSrc;

    return (
      <>
        {/* Mobile/Tablet Icon (md and below) */}
        {logo.mobileIcon && (
          <Image
            src={mobileLogoSrc}
            alt="Logo"
            priority
            width={42}
            height={44}
            sizes="21px"
            className={cn("lg:hidden", logoClassName)}
            style={{ width: "21px", height: "22px" }}
            quality={100}
          />
        )}
        {/* Desktop Logo (lg and above) */}
        <Image
          src={desktopLogoSrc}
          alt="Logo"
          priority
          width={129}
          height={15}
          className={cn(
            logo.mobileIcon ? "hidden lg:block" : "",
            logoClassName
          )}
          quality={100}
        />
      </>
    );
  };

  // Render gutachten-org variant
  if (designVariant === "gutachten-org") {
    return (
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 bg-white shadow-sm transition-all duration-300 lg:shadow-none",
          scrollEffects.enabled && isScrolled
            ? "bg-white/95 lg:shadow-sm lg:backdrop-blur-md"
            : "bg-white",
          className
        )}
      >
        <div
          className="container-gutachten"
          herokit-id="f8275c9c-16b4-4a4d-9384-7a8ed3626798"
        >
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <Link
              href="/"
              className="flex items-center justify-start"
              herokit-id="ca9da221-fbae-41a6-b41b-732179fab004"
            >
              {renderLogo()}
            </Link>

            <div className="flex items-center justify-between gap-4 xl:gap-2">
              {/* Center: Desktop Navigation - Hidden on tablet/mobile, visible on laptop+ */}
              <nav
                className="hidden items-center whitespace-nowrap lg:flex"
                herokit-id="d5eb9131-5d32-4bc4-a19a-984f1096a9ec"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.target}
                    rel={
                      item.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="navigation-nav-group group relative flex items-center gap-1.5 rounded-[8px] px-2 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 xl:px-4 xl:py-2 xl:text-sm"
                  >
                    <span herokit-id="c45fb816-3100-490e-a432-f4c88f1acd08">
                      {item.name}
                    </span>
                    <ArrowUpRight className="navigation-nav-group-arrow-icon h-3.5 w-3.5 text-orange-500 opacity-0" />
                  </Link>
                ))}
              </nav>

              {/* Right: CTA Button and Mobile Menu */}
              <div
                className="flex items-center justify-end gap-4"
                herokit-id="e9128966-73c4-42ea-af6c-16a8a91a9692"
              >
                {/* CTA Button - Hidden on tablet/mobile, visible on laptop+ */}
                {ctaButton && (
                  <Button
                    onClick={() => handleNavigation(ctaButton.href)}
                    className="hidden h-12 rounded-[8px] bg-[#FF985C] px-3 py-2 text-xs font-semibold text-[#273238] transition-all duration-200 hover:bg-[#FF985C]/90 lg:inline-flex xl:p-[18px] xl:text-sm"
                    herokit-id="5b6c52bf-d690-4179-802b-1d79ffd02c4a"
                  >
                    {ctaButton.text}
                  </Button>
                )}

                {/* Mobile Menu Button - Visible on tablet/mobile, hidden on laptop+ */}
                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 lg:hidden"
                  aria-label="Menu"
                  herokit-id="2f15aa08-2da7-471e-9bbf-073d88cdabef"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Visible on tablet/mobile, hidden on laptop+ */}
          {mobileMenu.enabled && isMobileMenuOpen && (
            <div
              className="animate-fade-in border-t border-gray-200 bg-white py-4 lg:hidden"
              style={{ animationDuration: `${mobileMenu.animationDuration}ms` }}
            >
              <nav
                className="flex flex-col gap-4"
                herokit-id="ac29cc3f-275b-421c-b2dd-03157dc699bb"
              >
                {navigation.map((item) => (
                  <Button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, item.target)}
                    variant="ghost"
                    className="navigation-nav-group group flex w-fit items-center gap-1.5 !rounded-[8px] p-[18px] text-left text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
                  >
                    <span herokit-id="cec36921-7fd8-4465-aa82-feb91e57ae18">
                      {item.name}
                    </span>
                    <ArrowUpRight className="navigation-nav-group-arrow-icon h-3.5 w-3.5 text-[#FF985C] opacity-0" />
                  </Button>
                ))}
                {ctaButton && (
                  <Button
                    onClick={() => handleNavigation(ctaButton.href)}
                    className="mt-2 h-12 w-fit rounded-[8px] bg-[#FF985C] p-[18px] text-sm font-semibold text-[#273238] transition-all duration-200 hover:bg-[#FF985C]/90"
                    herokit-id="d2c71258-391d-41cf-aa7e-1aad6f0b1cd8"
                  >
                    {ctaButton.text}
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  // Default variant (existing implementation)
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrollEffects.enabled && isScrolled
          ? "bg-background/95 shadow-soft backdrop-blur-md"
          : "bg-transparent",
        className
      )}
    >
      <div
        className="container"
        herokit-id="dd3ce428-8faf-430f-867d-ff289894dbee"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center justify-start"
            herokit-id="aefeb40b-861c-49bb-b7d9-45fb9ac145d9"
          >
            {renderLogo()}
          </Link>

          {/* Center: Desktop Navigation */}
          <nav
            className="hidden items-center gap-8 md:flex"
            herokit-id="691df6d0-3764-4c2b-9372-62bdb87014b9"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                }
                className="text-foreground after:bg-foreground relative cursor-pointer text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                herokit-id="b2c69fdd-137c-4c91-b9f1-485cf4164d41"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: CTA Button and Mobile Menu */}
          <div
            className="flex items-center justify-end gap-4"
            herokit-id="8af69c17-f8cb-4835-a59d-a52c503574c3"
          >
            {ctaButton && (
              <Button
                variant={ctaButton.variant || "default"}
                size={ctaButton.size || "sm"}
                onClick={() => handleNavigation(ctaButton.href)}
                className="hidden md:inline-flex"
                herokit-id="847e1f1e-b468-460b-a246-51ee996db438"
              >
                {ctaButton.text}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden"
              aria-label="Menu"
              herokit-id="9a0dd51c-b1ea-4c66-9ae0-c23f89438a1a"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu.enabled && isMobileMenuOpen && (
          <div
            className="border-border animate-fade-in bg-background border-t py-4 md:hidden"
            style={{ animationDuration: `${mobileMenu.animationDuration}ms` }}
          >
            <nav
              className="flex flex-col gap-4"
              herokit-id="a5fcfe82-d309-48db-b91c-8b4034f2e545"
            >
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, item.target)}
                  className="text-foreground after:bg-foreground relative w-fit cursor-pointer py-2 text-left text-sm font-medium transition-colors after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                  herokit-id="f78669a6-4891-4059-a1ae-0a2037abf7b1"
                >
                  {item.name}
                </button>
              ))}
              {ctaButton && (
                <Button
                  variant={ctaButton.variant || "default"}
                  size={ctaButton.size || "sm"}
                  onClick={() => handleNavigation(ctaButton.href)}
                  className="mt-2"
                  herokit-id="678fd0e2-e2b7-455a-91ea-32230fa277f2"
                >
                  {ctaButton.text}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
