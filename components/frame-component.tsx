"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

export type FrameComponentType = {
  className?: string;

  /** Style props */
  frameDivBackgroundImage?: CSSProperties["backgroundImage"];
  frameDivFlex?: CSSProperties["flex"];
  frameDivPadding?: CSSProperties["padding"];
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  frameDivBackgroundImage,
  frameDivFlex,
  frameDivPadding,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      backgroundImage: frameDivBackgroundImage,
      flex: frameDivFlex,
      padding: frameDivPadding,
    };
  }, [frameDivBackgroundImage, frameDivFlex, frameDivPadding]);

  return (
    <section
      className={`self-stretch flex items-start gap-16 text-left text-num-14 text-dark-neutral font-inter mq450:gap-4 mq800:flex-wrap mq1125:gap-8 ${className}`}
    >
      <div
        className="h-num-424 flex-[0.9161] overflow-hidden flex flex-col items-start p-num-16 box-border bg-[url('/Frame-1000001061@3x.png')] bg-cover bg-no-repeat bg-[top] min-w-num-248 mq450:flex-1"
        style={frameDivStyle}
      >
        <div className="rounded-num-99 bg-light-neutral border-darkslategray-200 border-solid border-[1px] flex items-center justify-center p-num-10">
          <div className="relative tracking-num--0_1 leading-[180%]">
            Mehrfamilienhaus
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-start justify-between py-num-24 px-num-0 box-border gap-5 min-w-num-248">
        <div className="self-stretch flex flex-col items-start gap-6 text-dark-gray">
          <div className="self-stretch flex items-center gap-4 mq450:flex-wrap">
            <div className="flex-1 relative tracking-num--0_1 leading-[180%] inline-block min-w-num-119">
              Gebäudewert
            </div>
            <div className="flex-1 relative tracking-num--0_1 leading-[88%] font-semibold text-dark-neutral inline-block min-w-num-119">
              8.413.000 €
            </div>
          </div>
          <div className="self-stretch flex items-center gap-4 mq450:flex-wrap">
            <div className="flex-1 relative tracking-num--0_1 leading-[180%] inline-block min-w-num-119">
              Steuerersparnis
            </div>
            <div className="flex-1 relative tracking-num--0_1 leading-[88%] font-semibold text-dark-neutral inline-block min-w-num-119">
              3.350 € / Jahr
            </div>
          </div>
          <div className="self-stretch flex items-center gap-4 mq450:flex-wrap">
            <div className="flex-1 relative tracking-num--0_1 leading-[180%] inline-block min-w-num-119">
              Restnutzungsdauer
            </div>
            <div className="flex-1 relative tracking-num--0_1 leading-[88%] font-semibold text-dark-neutral inline-block min-w-num-119">
              23 Jahre
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start gap-6">
          <div className="self-stretch flex items-center gap-2">
            <Image
              className="w-4 relative max-h-full"
              loading="lazy"
              width={16}
              height={16}
              sizes="100vw"
              alt=""
              src="/Bullet-Point1.svg"
            />
            <div className="flex-1 relative tracking-num--0_1 leading-[180%]">
              Modernisierung der Heizungsanlage: 2016
            </div>
          </div>
          <div className="self-stretch flex items-center gap-2">
            <Image
              className="w-4 relative max-h-full"
              loading="lazy"
              width={16}
              height={16}
              sizes="100vw"
              alt=""
              src="/Bullet-Point1.svg"
            />
            <div className="flex-1 relative tracking-num--0_1 leading-[180%]">
              keine Außendämmung vorhanden
            </div>
          </div>
        </div>
        <div className="self-stretch flex items-start gap-6 mq450:flex-wrap">
          <div className="w-num-104 flex flex-col items-start justify-center gap-4">
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] font-semibold">
              Bj. 1996
            </div>
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] text-dark-gray">
              1904
            </div>
          </div>
          <div className="w-num-104 flex flex-col items-start justify-center gap-4">
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] font-semibold">
              Einheiten
            </div>
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] text-dark-gray">
              42
            </div>
          </div>
          <div className="w-num-104 flex flex-col items-start justify-center gap-4">
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] font-semibold">
              m2
            </div>
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] text-dark-gray">
              4206,6
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
