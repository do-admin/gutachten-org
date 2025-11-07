"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

export type SenkenAbschreibungenType = {
  className?: string;
  strategySuccess1: string;
  steuerlastSenken?: string;
  erhhenSieIhreAbschreibungen?: string;

  /** Style props */
  senkenAbschreibungenBackground?: CSSProperties["background"];
};

const SenkenAbschreibungen: NextPage<SenkenAbschreibungenType> = ({
  className = "",
  senkenAbschreibungenBackground,
  strategySuccess1,
  steuerlastSenken,
  erhhenSieIhreAbschreibungen,
}) => {
  const senkenAbschreibungenStyle: CSSProperties = useMemo(() => {
    return {
      background: senkenAbschreibungenBackground,
    };
  }, [senkenAbschreibungenBackground]);

  return (
    <div
      className={`flex-1 rounded-num-8 [background:linear-gradient(180deg,_rgba(39,_50,_56,_0.04),_rgba(39,_50,_56,_0))] border-darkslategray-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start py-num-22 px-num-23 min-w-num-316 text-left text-num-20 text-dark-neutral font-sora ${className}`}
      style={senkenAbschreibungenStyle}
    >
      <div className="w-num-373_3 flex flex-col items-start gap-[33px] mq450:gap-4">
        <Image
          className="w-6 h-6 relative"
          loading="lazy"
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src={strategySuccess1}
        />
        <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[144%] font-normal font-[inherit] mq450:text-num-16 mq450:leading-num-23">
          {steuerlastSenken}
        </h3>
        <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
          {erhhenSieIhreAbschreibungen}
        </div>
      </div>
    </div>
  );
};

export default SenkenAbschreibungen;
