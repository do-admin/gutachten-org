import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  return (
    <header
      className={`w-num-1440 flex items-center justify-between py-num-24 px-num-64 box-border gap-5 top-[0] z-[99] sticky max-w-full text-left text-num-14 text-light-neutral font-inter mq1350:gap-5 mq1350:pl-num-32 mq1350:pr-num-32 mq1350:box-border ${className}`}
    >
      <div className="flex items-end py-num-0 px-0.5 gap-2">
        <Image
          className="h-[22px] w-[21px] relative"
          width={21}
          height={22}
          sizes="100vw"
          alt=""
          src="/Vector.svg"
        />
        <Image
          className="h-[17.2px] w-[137.7px] relative"
          loading="lazy"
          width={137.7}
          height={17.2}
          sizes="100vw"
          alt=""
          src="/Vector2.svg"
        />
      </div>
      <div className="flex items-center gap-10 mq450:gap-5">
        <div className="flex items-center gap-6 mq1125:hidden">
          <div className="h-10 rounded-num-8 bg-cadetblue flex items-center py-num-0 px-num-16 box-border gap-2">
            <div className="relative leading-[100%] font-semibold">
              Useful Life
            </div>
            <Image
              className="w-3 relative max-h-full"
              width={12}
              height={11}
              sizes="100vw"
              alt=""
              src="/tdesign-arrow-right-up1.svg"
            />
          </div>
          <div className="h-10 rounded-num-8 flex items-center justify-center py-num-0 px-num-16 box-border">
            <div className="relative leading-[100%] font-medium">
              Property Valuation
            </div>
          </div>
          <div className="h-10 rounded-num-8 flex items-center justify-center py-num-0 px-num-16 box-border">
            <div className="relative leading-[100%] font-medium">Counselor</div>
          </div>
          <div className="h-10 rounded-num-8 flex items-center justify-center py-num-0 px-num-16 box-border">
            <div className="relative leading-[100%] font-medium">
              For Business Customers
            </div>
          </div>
        </div>
        <button className="cursor-pointer [border:none] py-2 px-num-18 bg-gutachten-accent h-12 rounded-num-8 flex items-center justify-center box-border hover:bg-chocolate">
          <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-dark-neutral text-left">
            Free Initial Assesment
          </div>
        </button>
      </div>
    </header>
  );
};

export default FrameComponent3;
