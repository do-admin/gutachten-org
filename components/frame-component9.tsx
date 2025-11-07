"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import AutoLayoutVertical1 from "./auto-layout-vertical1";

export type FrameComponent9Type = {
  className?: string;
};

const FrameComponent9: NextPage<FrameComponent9Type> = ({ className = "" }) => {
  const [autoLayoutVertical1Items] = useState([
    {
      autoLayoutVerticalBackground:
        "linear-gradient(180deg, rgba(39, 50, 56, 0.04), rgba(39, 50, 56, 0))",
      restnutzungsdauergutachte: "Restnutzungsdauergutachten",
      restnutzungsdauergutachteAlignSelf: "",
      ermittelnSieDieVerbleibende:
        "Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie präzise und zuverlässig.",
    },
    {
      autoLayoutVerticalBackground: "unset",
      restnutzungsdauergutachte: "Kaufpreisteilungsberechnung",
      restnutzungsdauergutachteAlignSelf: "stretch",
      ermittelnSieDieVerbleibende:
        "Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit.",
    },
    {
      autoLayoutVerticalBackground: "unset",
      restnutzungsdauergutachte: "Verkehrswergutachten",
      restnutzungsdauergutachteAlignSelf: "stretch",
      ermittelnSieDieVerbleibende:
        "Ein Gutachten für die Restnutzungsdauer Ihrer Immobilie hat mehrere Vorteile für Sie:",
    },
  ]);
  return (
    <section
      className={`self-stretch bg-white flex flex-col items-start py-num-120 px-num-64 gap-10 text-left text-[32px] text-dark-neutral font-sora mq800:gap-5 mq800:py-num-78 mq800:px-num-32 mq800:box-border ${className}`}
    >
      <h1 className="m-0 w-[882px] relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] inline-block mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
        Erhalten Sie von uns problemlos weitere Gutachten und Dokumente für Ihre
        Immobilien
      </h1>
      <section className="self-stretch flex flex-col items-start gap-6 text-left text-num-20 text-dark-neutral font-sora">
        <div className="self-stretch flex items-start flex-wrap content-start gap-6">
          {autoLayoutVertical1Items.map((item, index) => (
            <AutoLayoutVertical1
              key={index}
              autoLayoutVerticalBackground={item.autoLayoutVerticalBackground}
              restnutzungsdauergutachte={item.restnutzungsdauergutachte}
              restnutzungsdauergutachteAlignSelf={
                item.restnutzungsdauergutachteAlignSelf
              }
              ermittelnSieDieVerbleibende={item.ermittelnSieDieVerbleibende}
            />
          ))}
        </div>
        <div className="self-stretch flex items-start flex-wrap content-start gap-6">
          <div className="h-num-169 flex-1 rounded-num-8 border-darkslategray-200 border-solid border-stroke-border-width box-border flex flex-col items-start justify-between py-num-24 px-num-23 gap-5 min-w-num-316">
            <div className="self-stretch flex items-center justify-between gap-[-152.3px]">
              <div className="w-[656px] flex items-center justify-between shrink-0">
                <h3 className="m-0 flex-1 relative text-[length:inherit] leading-[144%] font-normal font-[inherit] mq450:text-num-16 mq450:leading-num-23">
                  (Technische) Kaufberatungs
                </h3>
              </div>
              <Image
                className="h-2.5 w-2.5 relative object-contain shrink-0"
                width={10}
                height={10}
                sizes="100vw"
                alt=""
                src="/Button-Wissenswertes-Submenu@2x.png"
              />
              <Image
                className="w-3 relative max-h-full shrink-0"
                width={12}
                height={11}
                sizes="100vw"
                alt=""
                src="/tdesign-arrow-right-up1.svg"
              />
            </div>
            <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
              Ermitteln Sie die verbleibende Nutzungsdauer Ihrer Immobilie
              präzise und zuverlässig.
            </div>
          </div>
          <AutoLayoutVertical1
            autoLayoutVerticalBackground="unset"
            restnutzungsdauergutachte="Energieausweis: Bedarf"
            restnutzungsdauergutachteAlignSelf="stretch"
            ermittelnSieDieVerbleibende="Transparente Aufteilung des Kaufpreises – für steuerliche und finanzielle Klarheit."
          />
          <AutoLayoutVertical1
            autoLayoutVerticalBackground="unset"
            restnutzungsdauergutachte="Energieausweis: Verbrauch"
            restnutzungsdauergutachteAlignSelf="stretch"
            ermittelnSieDieVerbleibende="Fundierte Wertgutachten vom Experten - für Kauf, Verkauf oder Erbschaftssteuer"
          />
        </div>
      </section>
    </section>
  );
};

export default FrameComponent9;
