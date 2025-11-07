"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import AutoLayoutVertical from "./auto-layout-vertical";

export type FrameComponent8Type = {
  className?: string;
};

const FrameComponent8: NextPage<FrameComponent8Type> = ({ className = "" }) => {
  const [autoLayoutVerticalItems] = useState([
    {
      autoLayoutVerticalPadding: "16px",
      autoLayoutVerticalBorderRight: "",
      autoLayoutVerticalBorderLeft: "",
      frame1000001142: "/Frame-10000011421@2x.png",
      felixHolfert: "Felix Holfert",
      realEstateAppraiserAccording:
        "Real estate appraiser according to DIN ISO 17 0 24",
    },
    {
      autoLayoutVerticalPadding: "16px 15px",
      autoLayoutVerticalBorderRight: "1px solid rgba(39, 50, 56, 0.1)",
      autoLayoutVerticalBorderLeft: "1px solid rgba(39, 50, 56, 0.1)",
      frame1000001142: "/Frame-1000001142@2x.png",
      felixHolfert: "Gerrit J. Kolweyh",
      realEstateAppraiserAccording: "Immobilienexperte & Berater",
    },
    {
      autoLayoutVerticalPadding: "",
      autoLayoutVerticalBorderRight: "",
      autoLayoutVerticalBorderLeft: "",
      frame1000001142: "/Frame-10000011422@2x.png",
      felixHolfert: "Simon Mill",
      realEstateAppraiserAccording: "Kundenbetreuung",
    },
  ]);
  return (
    <section
      className={`self-stretch flex flex-col items-start py-num-120 px-num-64 mq450:pt-num-51 mq450:pb-num-51 mq450:box-border mq800:pl-num-32 mq800:pr-num-32 mq800:box-border mq1125:pt-num-78 mq1125:pb-num-78 mq1125:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-16 mq450:gap-4 mq800:gap-8">
        <section className="self-stretch flex items-center justify-between flex-wrap content-center gap-0 [row-gap:20px] text-left text-[32px] text-dark-neutral font-sora">
          <div className="self-stretch flex-1 flex flex-col items-start min-w-num-571 mq800:min-w-full">
            <h2 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
              Wir sind für Sie da!
            </h2>
          </div>
          <div className="flex-1 flex flex-col items-start gap-6 min-w-num-571 text-num-16 text-dark-gray font-inter mq800:min-w-full">
            <div className="self-stretch relative tracking-num--0_1 leading-[180%]">{`Aus unseren Zentralen in Berlin, Dresden & Bremen koordinieren wir unser Team, um Ihnen deutschlandweit zur Verfügung zu stehen!<br/><br/>Unsere Gutachter sind durch mehrere DAkkS-akkredidierte Stellen nach DIN EN ISO / IEC 17024 zertifiziert`}</div>
            <div className="flex items-start gap-6 mq450:flex-wrap">
              <button className="cursor-pointer [border:none] py-2 px-num-18 bg-dark-neutral h-12 rounded-num-8 flex items-center justify-center box-border gap-6 hover:bg-dimgray-100">
                <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-light-neutral text-left">
                  Kontact
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
              <button className="cursor-pointer border-dark-neutral border-solid border-[1px] py-2 px-[17px] bg-[transparent] h-12 rounded-num-8 box-border flex items-center justify-center gap-[23px] hover:bg-dimgray-200 hover:border-dimgray-100 hover:border-solid hover:hover:border-[1px] hover:box-border">
                <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-dark-neutral text-left">
                  Nutzungsdauer prüfen
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
          </div>
        </section>
        <div className="self-stretch h-[387px] border-darkslategray-100 border-solid border-[1px] box-border flex items-start [row-gap:20px] mq800:grid-cols-[minmax(328px,_1fr)] mq1125:[grid-row-gap:20px] mq1125:justify-center mq1125:grid-cols-[repeat(2,_minmax(328px,_568px))] mq1350:h-num-auto mq1350:flex-wrap">
          {autoLayoutVerticalItems.map((item, index) => (
            <AutoLayoutVertical
              key={index}
              autoLayoutVerticalPadding={item.autoLayoutVerticalPadding}
              autoLayoutVerticalBorderRight={item.autoLayoutVerticalBorderRight}
              autoLayoutVerticalBorderLeft={item.autoLayoutVerticalBorderLeft}
              frame1000001142={item.frame1000001142}
              felixHolfert={item.felixHolfert}
              realEstateAppraiserAccording={item.realEstateAppraiserAccording}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameComponent8;
