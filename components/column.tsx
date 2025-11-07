"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type ColumnType = {
  className?: string;
  quote?: string;

  /** Style props */
  frameDivAlignSelf?: CSSProperties["alignSelf"];
  contentAlignSelf?: CSSProperties["alignSelf"];
};

const Column: NextPage<ColumnType> = ({
  className = "",
  frameDivAlignSelf,
  contentAlignSelf,
  quote,
}) => {
  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: frameDivAlignSelf,
    };
  }, [frameDivAlignSelf]);

  const contentStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: contentAlignSelf,
    };
  }, [contentAlignSelf]);

  return (
    <div
      className={`h-num-304 w-num-644 rounded-num-8 border-darkslategray-200 border-solid border-stroke-border-width box-border overflow-hidden shrink-0 flex flex-col items-start justify-between py-num-24 px-num-23 gap-2 max-w-full text-left text-[24px] text-dark-neutral font-inter ${className}`}
    >
      <div
        className="self-stretch flex flex-col items-start"
        style={frameDiv1Style}
      >
        <div
          className="self-stretch flex flex-col items-start"
          style={contentStyle}
        >
          <h2 className="m-0 self-stretch relative text-[length:inherit] leading-[144%] font-medium font-[inherit] mq450:text-num-19 mq450:leading-num-28">
            {quote}
          </h2>
        </div>
      </div>
      <div className="self-stretch flex items-center text-num-16 font-sora">
        <div className="flex-1 flex flex-col items-start gap-1">
          <div className="self-stretch relative leading-[144%] font-semibold">
            Name Surname
          </div>
          <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
            Position, Company name
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
