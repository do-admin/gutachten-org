import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
  return (
    <div
      className={`w-num-812 border-darkslategray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-num-0 px-num-0 pb-num-38 text-left text-num-18 text-dark-neutral font-sora mq450:gap-5 ${className}`}
    >
      <div className="self-stretch flex items-center justify-between gap-0">
        <div className="flex-1 relative leading-[144%]">
          Welche Zertifizierungen haben unsere Sachverständigen und Gutachter?
        </div>
        <Image
          className="h-6 w-6 relative"
          loading="lazy"
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/Info.svg"
        />
      </div>
    </div>
  );
};

export default FrameComponent2;
