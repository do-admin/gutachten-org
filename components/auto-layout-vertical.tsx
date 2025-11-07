"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

export type AutoLayoutVerticalType = {
  className?: string;
  frame1000001142: string;
  felixHolfert?: string;
  realEstateAppraiserAccording?: string;

  /** Style props */
  autoLayoutVerticalPadding?: CSSProperties["padding"];
  autoLayoutVerticalBorderRight?: CSSProperties["borderRight"];
  autoLayoutVerticalBorderLeft?: CSSProperties["borderLeft"];
};

const AutoLayoutVertical: NextPage<AutoLayoutVerticalType> = ({
  className = "",
  autoLayoutVerticalPadding,
  autoLayoutVerticalBorderRight,
  autoLayoutVerticalBorderLeft,
  frame1000001142,
  felixHolfert,
  realEstateAppraiserAccording,
}) => {
  const autoLayoutVerticalStyle: CSSProperties = useMemo(() => {
    return {
      padding: autoLayoutVerticalPadding,
      borderRight: autoLayoutVerticalBorderRight,
      borderLeft: autoLayoutVerticalBorderLeft,
    };
  }, [
    autoLayoutVerticalPadding,
    autoLayoutVerticalBorderRight,
    autoLayoutVerticalBorderLeft,
  ]);

  return (
    <section
      className={`self-stretch flex-1 flex flex-col items-start p-num-16 box-border gap-6 min-w-num-328 text-left text-num-20 text-dark-neutral font-sora ${className}`}
      style={autoLayoutVerticalStyle}
    >
      <Image
        className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
        loading="lazy"
        width={405.3}
        height={283}
        sizes="100vw"
        alt=""
        src={frame1000001142}
      />
      <div className="self-stretch flex flex-col items-start gap-2">
        <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-16 mq450:leading-num-23">
          {felixHolfert}
        </h3>
        <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
          {realEstateAppraiserAccording}
        </div>
      </div>
    </section>
  );
};

export default AutoLayoutVertical;
