"use client";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Column from "./column";

export type TestimonialType = {
  className?: string;
};

const Testimonial: NextPage<TestimonialType> = ({ className = "" }) => {
  const [columnItems] = useState([
    {
      frameDivAlignSelf: "stretch",
      contentAlignSelf: "stretch",
      quote:
        "Klare Empfehlung! Schnelle, unkomplizierte und vor allem transparente Durchführung des\nGutachtens.",
    },
    {
      frameDivAlignSelf: "unset",
      contentAlignSelf: "unset",
      quote:
        "Reibungslose professionelle Abwicklung.\nKann ich jedem empfehlen.",
    },
    {
      frameDivAlignSelf: "",
      contentAlignSelf: "",
      quote:
        "Klare Empfehlung! Schnelle, unkomplizierte und vor allem transparente Durchführung des\nGutachtens.",
    },
  ]);
  return (
    <section
      className={`self-stretch bg-cadetblue overflow-hidden flex flex-col items-start py-num-120 px-num-64 box-border gap-10 max-w-full text-left text-[32px] text-dark-neutral font-sora mq800:gap-5 mq800:py-num-78 mq800:px-num-32 mq800:box-border ${className}`}
    >
      <div className="self-stretch flex items-center justify-between gap-5 max-w-full mq800:flex-wrap mq800:gap-5">
        <h2 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] inline-block max-w-full mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
          Was unsere Kunden sagen
        </h2>
        <div className="flex items-center gap-4">
          <Image
            className="h-12 w-[52.3px] rounded-num-8"
            loading="lazy"
            width={52.3}
            height={48}
            sizes="100vw"
            alt=""
            src="/Button1.svg"
          />
          <Image
            className="h-12 w-[52.3px] rounded-num-8 object-contain"
            loading="lazy"
            width={52.3}
            height={48}
            sizes="100vw"
            alt=""
            src
          />
        </div>
      </div>
      <section className="self-stretch flex items-start gap-6 max-w-full text-left text-[24px] text-dark-neutral font-inter mq1350:flex-wrap">
        {columnItems.map((item, index) => (
          <Column
            key={index}
            frameDivAlignSelf={item.frameDivAlignSelf}
            contentAlignSelf={item.contentAlignSelf}
            quote={item.quote}
          />
        ))}
      </section>
    </section>
  );
};

export default Testimonial;
