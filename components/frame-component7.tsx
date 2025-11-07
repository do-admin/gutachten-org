"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import FrameComponent from "./frame-component";

export type FrameComponent7Type = {
  className?: string;
};

const FrameComponent7: NextPage<FrameComponent7Type> = ({ className = "" }) => {
  const [frameComponentItems] = useState([
    {
      frameDivBackgroundImage: "url('/Frame-1000001061@3x.png')",
      frameDivFlex: 0.9161,
      frameDivPadding: "16px",
    },
    {
      frameDivBackgroundImage: "url('/Frame-1000001061@3x.png')",
      frameDivFlex: "",
      frameDivPadding: "",
    },
    {
      frameDivBackgroundImage: "unset",
      frameDivFlex: 1,
      frameDivPadding: "unset",
    },
  ]);
  return (
    <section
      className={`self-stretch flex items-start pt-[116px] px-num-64 pb-[124px] box-border gap-16 max-w-full mq450:gap-4 mq450:pt-num-32 mq450:pb-[34px] mq450:box-border mq800:gap-8 mq800:pl-num-32 mq800:pr-num-32 mq800:box-border mq1125:pt-[49px] mq1125:pb-[53px] mq1125:box-border mq1350:h-num-auto mq1350:flex-wrap mq1350:pt-[75px] mq1350:pb-[81px] mq1350:box-border ${className}`}
    >
      <section className="w-[421px] flex flex-col items-start gap-10 max-w-full text-left text-num-14 text-dark-gray font-inter mq450:gap-5 mq800:min-w-full mq1350:flex-1">
        <div className="self-stretch flex flex-col items-end gap-5">
          <div className="self-stretch relative tracking-num--0_1 leading-[100%] uppercase font-semibold">
            echte Praxisbeispiele und überzeugende Ergebnisse.﻿
          </div>
          <h1 className="m-0 self-stretch relative text-[32px] leading-[144%] font-semibold font-sora text-dark-neutral mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
            Steuerersparnis mit verkürzter Nutzungsdauer
          </h1>
        </div>
        <div className="self-stretch flex flex-col items-start gap-6 text-num-16">
          <div className="self-stretch relative tracking-num--0_1 leading-[180%]">
            Unsere Gutachten schaffen messbare Vorteile: Immobilienbesitzer
            sparen durch die reduzierte Nutzungsdauer jedes Jahr tausende Euro
            an Steuern. Ob Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus
            oder Gewerbeobjekt – wir zeigen Ihnen, wie Sie durch gezielte
            Abschreibungen Ihre Steuerlast deutlich senken können.
          </div>
          <button className="cursor-pointer [border:none] py-2 px-num-18 bg-dark-neutral h-12 rounded-num-8 flex items-center justify-center box-border gap-6 hover:bg-dimgray-100">
            <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-light-neutral text-left">
              Steuerersparnis berechnen﻿
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
      <div className="w-[827px] flex flex-col items-start justify-center gap-[72px] max-w-full mq450:gap-[18px] mq1125:gap-9 mq1125:min-w-full mq1350:flex-1">
        {frameComponentItems.map((item, index) => (
          <FrameComponent
            key={index}
            frameDivBackgroundImage={item.frameDivBackgroundImage}
            frameDivFlex={item.frameDivFlex}
            frameDivPadding={item.frameDivPadding}
          />
        ))}
      </div>
    </section>
  );
};

export default FrameComponent7;
