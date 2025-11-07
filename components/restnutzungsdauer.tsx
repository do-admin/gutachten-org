"use client";
import type { NextPage } from "next";
import { useState } from "react";
import LifePrice from "./life-price";

export type RestnutzungsdauerType = {
  className?: string;
};

const Restnutzungsdauer: NextPage<RestnutzungsdauerType> = ({
  className = "",
}) => {
  const [lifePriceItems] = useState([
    {
      kaufpreisaufteilung: "Kaufpreisaufteilung",
    },
    {
      kaufpreisaufteilung: "Verkehrswertgutachten",
    },
    {
      kaufpreisaufteilung: "Energieausweis",
    },
  ]);
  return (
    <section
      className={`w-num-1440 h-[270px] bg-dark-neutral border-whitesmoke border-solid border-t-[1px] border-b-[1px] box-border overflow-hidden shrink-0 flex items-start max-w-full text-left text-num-16 text-light-neutral font-sora ${className}`}
    >
      <div className="self-stretch flex-1 [background:radial-gradient(50%_50%_at_50%_50%,_rgba(252,_112,_25,_0.2),_rgba(252,_112,_25,_0))] border-whitesmoke border-solid border-r-[1px] overflow-hidden flex flex-col items-start py-num-24 px-num-23 relative gap-10 mq450:gap-5">
        <div className="self-stretch flex flex-col items-start gap-1 z-[0]">
          <div className="relative leading-num-32 font-semibold">
            Restnutzungsdauer
          </div>
          <div className="self-stretch relative text-num-14 leading-num-24 font-inter text-light-gray text-justify">
            Determine the remaining useful life of your property precisely and
            reliably.
          </div>
        </div>
        <div className="w-full h-[68px] !!m-[0 important] absolute right-[0px] bottom-[0px] left-[0px] bg-gutachten-accent flex items-center justify-center py-2 px-num-18 box-border whitespace-nowrap z-[1] text-num-14 text-dark-neutral font-inter">
          <div className="relative leading-[100%] font-semibold">
            Get Your Free Initial Assessment
          </div>
        </div>
      </div>
      {lifePriceItems.map((item, index) => (
        <LifePrice key={index} kaufpreisaufteilung={item.kaufpreisaufteilung} />
      ))}
    </section>
  );
};

export default Restnutzungsdauer;
