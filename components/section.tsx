"use client";
import type { NextPage } from "next";
import { useState } from "react";
import FrameComponent1 from "./frame-component1";
import FrameComponent2 from "./frame-component2";

export type SectionType = {
  className?: string;
};

const Section: NextPage<SectionType> = ({ className = "" }) => {
  const [frameComponent2Items] = useState([{}, {}, {}, {}]);
  const [frameComponent2Items1] = useState([{}, {}, {}, {}]);
  return (
    <section
      className={`self-stretch flex flex-col items-center py-num-120 px-num-64 box-border max-w-full text-left text-[32px] text-dark-neutral font-sora mq450:pt-num-33 mq450:pb-num-33 mq450:box-border mq800:gap-6 mq800:pl-num-32 mq800:pr-num-32 mq800:box-border mq1125:pt-num-51 mq1125:pb-num-51 mq1125:box-border mq1350:pt-num-78 mq1350:pb-num-78 mq1350:box-border ${className}`}
    >
      <div className="w-full flex items-start justify-between gap-5 max-w-full mq1350:flex-wrap mq1350:gap-5">
        <h2 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] inline-block max-w-full mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
          Häufig gestellte Fragen
        </h2>
        <div className="flex flex-col items-start gap-10 max-w-full text-[24px] text-dark-gray mq450:gap-5 mq1125:min-w-full mq1350:flex-1">
          <div className="flex flex-col items-start gap-[36.6px] mq450:gap-[18px]">
            <h3 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-19 mq450:leading-num-28">
              Category Title
            </h3>
            <FrameComponent1 />
            {frameComponent2Items.map((item, index) => (
              <FrameComponent2 key={index} />
            ))}
          </div>
          <div className="flex flex-col items-start gap-[36.6px] mq450:gap-[18px]">
            <h3 className="m-0 relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-19 mq450:leading-num-28">
              Category Title
            </h3>
            <FrameComponent1 />
            {frameComponent2Items1.map((item, index) => (
              <FrameComponent2 key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
