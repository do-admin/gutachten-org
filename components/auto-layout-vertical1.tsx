"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

export type AutoLayoutVertical1Type = {
  className?: string;
  restnutzungsdauergutachte?: string;
  ermittelnSieDieVerbleibende?: string;

  /** Style props */
  autoLayoutVerticalBackground?: CSSProperties["background"];
  restnutzungsdauergutachteAlignSelf?: CSSProperties["alignSelf"];
};

const AutoLayoutVertical1: NextPage<AutoLayoutVertical1Type> = ({
  className = "",
  autoLayoutVerticalBackground,
  restnutzungsdauergutachte,
  restnutzungsdauergutachteAlignSelf,
  ermittelnSieDieVerbleibende,
}) => {
  const autoLayoutVertical1Style: CSSProperties = useMemo(() => {
    return {
      background: autoLayoutVerticalBackground,
    };
  }, [autoLayoutVerticalBackground]);

  const restnutzungsdauergutachtenStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: restnutzungsdauergutachteAlignSelf,
    };
  }, [restnutzungsdauergutachteAlignSelf]);

  return (
    <div
      className={`h-num-169 flex-1 rounded-num-8 [background:linear-gradient(180deg,_rgba(39,_50,_56,_0.04),_rgba(39,_50,_56,_0))] border-darkslategray-200 border-solid border-stroke-border-width box-border flex flex-col items-start justify-between py-num-24 px-num-23 gap-5 min-w-num-316 text-left text-num-20 text-dark-neutral font-sora ${className}`}
      style={autoLayoutVertical1Style}
    >
      <div className="self-stretch flex items-center justify-between gap-0">
        <h3
          className="m-0 flex-1 relative text-[length:inherit] leading-[144%] font-normal font-[inherit] mq450:text-num-16 mq450:leading-num-23"
          style={restnutzungsdauergutachtenStyle}
        >
          {restnutzungsdauergutachte}
        </h3>
        <Image
          className="w-3 relative max-h-full"
          loading="lazy"
          width={12}
          height={11}
          sizes="100vw"
          alt=""
          src="/tdesign-arrow-right-up1.svg"
        />
      </div>
      <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
        {ermittelnSieDieVerbleibende}
      </div>
    </div>
  );
};

export default AutoLayoutVertical1;
