import type { NextPage } from "next";
import Image from "next/image";

export type Section1Type = {
  className?: string;
};

const Section1: NextPage<Section1Type> = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch bg-dark-neutral flex flex-col items-start py-num-0 px-num-64 box-border gap-16 max-w-full text-left text-num-16 text-light-gray font-sora mq450:gap-4 mq800:gap-8 mq800:pl-num-32 mq800:pr-num-32 mq800:box-border ${className}`}
    >
      <div className="self-stretch flex items-start pt-num-120 px-num-0 pb-num-0 box-border gap-[72px] max-w-full mq450:gap-[18px] mq800:gap-9 mq800:pt-num-78 mq800:box-border mq1350:flex-wrap">
        <div className="flex-1 flex flex-col items-start gap-12 min-w-[300px] max-w-full mq450:gap-6">
          <div className="self-stretch flex items-end py-num-0 px-1 box-border gap-[19.7px] max-w-full mq450:flex-wrap">
            <Image
              className="h-[54.2px] w-[51.8px] relative"
              loading="lazy"
              width={51.8}
              height={54.2}
              sizes="100vw"
              alt=""
              src="/Vector1.svg"
            />
            <Image
              className="w-[339.6px] relative max-h-full max-w-full"
              loading="lazy"
              width={339.6}
              height={42.5}
              sizes="100vw"
              alt=""
              src="/Company-Overview.svg"
            />
          </div>
          <div className="self-stretch relative leading-[210%] font-semibold">
            Die Gutachten-Komplettlösung für Investoren, Eigentümer und
            Immobilienprofis.
          </div>
        </div>
        <div className="w-[779px] flex flex-col items-start gap-10 max-w-full text-num-14 text-white mq450:gap-5 mq1125:min-w-full mq1350:flex-1">
          <div className="self-stretch flex items-start gap-6 mq800:flex-wrap">
            <div className="flex-1 flex flex-col items-start gap-3 min-w-num-245">
              <div className="self-stretch relative leading-num-23 font-semibold">
                Beliebt
              </div>
              <div className="self-stretch flex flex-col items-start gap-1 text-light-gray font-inter">
                <div className="self-stretch flex items-center gap-2 text-gutachten-accent">
                  <div className="relative leading-num-27_2">Afa-Rechner</div>
                  <Image
                    className="w-3 relative max-h-full"
                    width={12}
                    height={11}
                    sizes="100vw"
                    alt=""
                    src="/tdesign-arrow-right-up1.svg"
                  />
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Restnutzungsdauer berechnen
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  FAQ - Häufig gestellte Fragen
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Immobilienlexikon Gutachten und Bewertung
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start gap-3 min-w-num-245">
              <div className="self-stretch relative leading-num-23 font-semibold">
                Seiten
              </div>
              <div className="self-stretch flex flex-col items-start gap-1 text-light-gray font-inter">
                <div className="self-stretch relative leading-num-27_2">
                  Impressum
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  AGB
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Datenschutz
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex items-start gap-6 mq800:flex-wrap">
            <div className="flex-1 flex flex-col items-start gap-3 min-w-num-245">
              <div className="self-stretch relative leading-num-23 font-semibold">
                Standorte
              </div>
              <div className="self-stretch flex flex-col items-start gap-1 text-light-gray font-inter">
                <div className="self-stretch relative leading-num-27_2">
                  Berlin
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Frankfurt am Main
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Hamburg
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  Köln
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start gap-3 min-w-num-245">
              <div className="self-stretch relative leading-num-23 font-semibold">
                Kontakt
              </div>
              <div className="self-stretch flex flex-col items-start gap-1 text-light-gray font-inter">
                <div className="self-stretch relative leading-num-27_2">
                  0421 6485 6485
                </div>
                <div className="self-stretch relative leading-num-27_2">
                  support@gutachten.org
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch border-dark-gray border-solid border-t-[1px] flex items-center justify-between flex-wrap content-center pt-num-22 px-num-0 pb-num-24 gap-0 [row-gap:20px] text-[12px] font-inter">
        <div className="flex-1 relative leading-[210%] inline-block min-w-[290px]">
          © 2025 Gutachten.org (Evalion GmbH). Alle Rechte vorbehalten.
          <br />
          Entworfen von Defijn.
        </div>
        <div className="flex items-center gap-6">
          <Image
            className="h-num-38 w-[38px] relative"
            loading="lazy"
            width={38}
            height={38}
            sizes="100vw"
            alt=""
            src="/Link-facebook.svg"
          />
          <Image
            className="h-num-38 w-[38px] relative"
            loading="lazy"
            width={38}
            height={38}
            sizes="100vw"
            alt=""
            src="/Link-instagram.svg"
          />
          <Image
            className="h-num-38 w-[38px] relative"
            loading="lazy"
            width={38}
            height={38}
            sizes="100vw"
            alt=""
            src="/Link-linkedin.svg"
          />
        </div>
      </div>
    </footer>
  );
};

export default Section1;
