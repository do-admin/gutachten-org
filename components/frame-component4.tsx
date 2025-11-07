import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
  return (
    <div
      className={`w-num-1440 h-[534px] overflow-hidden shrink-0 flex items-center justify-between py-num-0 px-num-64 box-border relative gap-5 max-w-full z-[1] mq1125:gap-5 mq1125:pl-num-32 mq1125:pr-num-32 mq1125:box-border ${className}`}
    >
      <Image
        className="h-[597px] w-[589px] absolute !!m-[0 important] top-[calc(50%_-_265px)] right-[65px] z-[0] shrink-0"
        loading="lazy"
        width={589}
        height={597}
        sizes="100vw"
        alt=""
        src="/Vector3.svg"
      />
      <section className="w-[729px] flex flex-col items-start py-num-20 px-num-0 box-border gap-[20.5px] z-[1] shrink-0 text-left text-[12px] text-white font-inter">
        <div className="rounded-[999px] bg-dimgray-300 border-gray border-solid border-[1px] overflow-hidden flex items-center justify-center py-num-10 px-[15px] gap-2">
          <Image
            className="w-4 relative max-h-full"
            width={16}
            height={16}
            sizes="100vw"
            alt=""
            src="/qlementine-icons-certified-filled-16.svg"
          />
          <div className="relative tracking-[-0.02em] leading-[100%] uppercase font-semibold">
            din en iso iec 17024 certified
          </div>
        </div>
        <h1 className="m-0 self-stretch relative text-[56px] leading-[80px] font-semibold font-sora text-light-neutral mq450:text-[34px] mq450:leading-[48px] mq800:text-[45px] mq800:leading-[64px]">
          Ihre Experten für
          <br />
          Immobiliengutachten
        </h1>
        <div className="w-[319px] relative text-num-14 tracking-num--0_1 leading-[180%] text-light-gray inline-block">
          Ob Ankauf, Verkauf, Optimierung oder beim Steuernsparen – wir sind Ihr
          Ansprechpartner!
        </div>
      </section>
    </div>
  );
};

export default FrameComponent4;
