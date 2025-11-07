"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import SenkenAbschreibungen from "./senken-abschreibungen";

export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: NextPage<FrameComponent5Type> = ({ className = "" }) => {
  const [senkenAbschreibungenItems] = useState([
    {
      senkenAbschreibungenBackground:
        "linear-gradient(180deg, rgba(39, 50, 56, 0.04), rgba(39, 50, 56, 0))",
      strategySuccess1: "/strategy-success-1.svg",
      steuerlastSenken: "Steuerlast senken",
      erhhenSieIhreAbschreibungen:
        "Erhöhen Sie Ihre Abschreibungen gezielt mit einem professionellen Nutzungsdauergutachten.",
    },
    {
      senkenAbschreibungenBackground: "unset",
      strategySuccess1: "/money-invest-1.svg",
      steuerlastSenken: "Nettoeinkommen steigern",
      erhhenSieIhreAbschreibungen:
        "Sparen Sie Steuern mit smarter Abschreibung – spürbar mehr Geld im Jahr.",
    },
    {
      senkenAbschreibungenBackground: "unset",
      strategySuccess1: "/pie-chart-1.svg",
      steuerlastSenken: "Zertifizierte Expertise",
      erhhenSieIhreAbschreibungen:
        "Anerkannte Gutachten von DIN ISO/IEC 17024 Experten – garantiert finanzamtskonform.",
    },
  ]);
  return (
    <section
      className={`self-stretch bg-white flex flex-col items-start py-num-120 px-num-64 box-border max-w-full mq450:gap-[30px] mq450:pt-num-51 mq450:pb-num-51 mq450:box-border mq800:gap-[60px] mq800:py-num-78 mq800:px-num-32 mq800:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-16 max-w-full mq450:gap-4 mq800:gap-8">
        <section className="self-stretch flex items-end flex-wrap content-end gap-6 max-w-full text-left text-num-14 text-dark-gray font-inter">
          <div className="self-stretch flex-1 flex flex-col items-start gap-10 min-w-num-419 mq800:gap-5 mq800:min-w-full">
            <div className="self-stretch flex flex-col items-start gap-5">
              <div className="self-stretch relative tracking-num--0_1 leading-[100%] uppercase font-semibold">
                Bares geld sparen
              </div>
              <h1 className="m-0 self-stretch relative text-[32px] leading-[144%] font-semibold font-sora text-dark-neutral mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
                Nutzungsdauergutachten
              </h1>
            </div>
            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start gap-2">
              <div className="flex items-center gap-[7px]">
                <Image
                  className="w-8 relative max-h-full"
                  loading="lazy"
                  width={32}
                  height={32}
                  sizes="100vw"
                  alt=""
                  src="/bitcoin-icons-verify-filled1.svg"
                />
                <div className="relative leading-[100%]">Lorem ipsum</div>
              </div>
              <div className="flex items-center gap-[7px]">
                <Image
                  className="w-8 relative max-h-full"
                  loading="lazy"
                  width={32}
                  height={32}
                  sizes="100vw"
                  alt=""
                  src="/bitcoin-icons-verify-filled1.svg"
                />
                <div className="relative leading-[100%]">Lorem ipsum</div>
              </div>
              <div className="flex items-center gap-[7px]">
                <Image
                  className="w-8 relative max-h-full"
                  loading="lazy"
                  width={32}
                  height={32}
                  sizes="100vw"
                  alt=""
                  src="/bitcoin-icons-verify-filled1.svg"
                />
                <div className="relative leading-[100%]">Lorem ipsum</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start gap-10 max-w-full text-[24px] mq800:gap-5">
            <h2 className="m-0 w-num-644 relative text-[length:inherit] tracking-num--0_1 leading-[180%] font-normal font-[inherit] inline-block mq450:text-num-19 mq450:leading-[35px]">
              Vermeiden Sie Fehlinvestitionen, planen Sie realistisch und nutzen
              Sie steuerliche Vorteile – mit einer fundierten Einschätzung der
              Restnutzungsdauer durch unsere Sachverständigen.
            </h2>
            <button className="cursor-pointer [border:none] py-2 px-num-18 bg-dark-neutral h-12 rounded-num-8 flex items-center justify-center box-border gap-6 hover:bg-dimgray-100">
              <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-light-neutral text-left">
                Kostenlose Ersteinschätzung
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
        <section className="self-stretch flex items-center flex-wrap content-center gap-6 text-left text-num-20 text-dark-neutral font-sora">
          {senkenAbschreibungenItems.map((item, index) => (
            <SenkenAbschreibungen
              key={index}
              senkenAbschreibungenBackground={
                item.senkenAbschreibungenBackground
              }
              strategySuccess1={item.strategySuccess1}
              steuerlastSenken={item.steuerlastSenken}
              erhhenSieIhreAbschreibungen={item.erhhenSieIhreAbschreibungen}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default FrameComponent5;
