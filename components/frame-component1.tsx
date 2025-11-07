import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: NextPage<FrameComponent1Type> = ({ className = "" }) => {
  return (
    <section
      className={`w-num-812 border-darkslategray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-num-0 px-num-0 pb-num-38 gap-10 text-left text-num-18 text-dark-neutral font-sora mq450:gap-5 ${className}`}
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
      <div className="self-stretch relative text-num-14 tracking-num--0_1 leading-[240%] font-inter text-dark-gray">
        Unsere Partner-Sachverständigen sind nach nationalen und internationalen
        Standards zertifiziert, die höchste Anerkennung und Akzeptanz
        garantieren. Sie verfügen unter anderem über die Zertifizierung nach DIN
        EN ISO/IEC 17024, einem international anerkannten Standard zur
        Personenzertifizierung. Dadurch ist sichergestellt, dass die von uns
        erstellten Gutachten von Ämtern, Behörden und Gerichten vollumfänglich
        anerkannt werden.
      </div>
    </section>
  );
};

export default FrameComponent1;
