import type { NextPage } from "next";
import Image from "next/image";

export type GutachtenProfitierenType = {
  className?: string;
};

const GutachtenProfitieren: NextPage<GutachtenProfitierenType> = ({
  className = "",
}) => {
  return (
    <div className={`self-stretch flex flex-col items-start ${className}`}>
      <div className="self-stretch flex items-center gap-6 mq1350:flex-wrap">
        <Image
          className="h-[720px] flex-1 relative rounded-num-8 max-w-full overflow-hidden object-cover min-w-num-419 mq800:min-w-full mq1350:flex-1"
          loading="lazy"
          width={644}
          height={720}
          sizes="100vw"
          alt=""
          src="/Frame-1000001047@2x.png"
        />
        <section className="flex-[0.8037] flex flex-col items-start p-num-64 box-border min-w-num-419 text-left text-num-16 text-dark-neutral font-inter mq800:gap-5 mq800:py-num-42 mq800:px-num-32 mq800:box-border mq800:min-w-full mq1350:flex-1">
          <div className="w-full flex flex-col items-start gap-10 max-w-[516px] mq800:gap-5 mq800:max-w-full">
            <div className="self-stretch flex flex-col items-start text-[32px] font-sora">
              <h1 className="m-0 self-stretch relative text-[length:inherit] leading-[144%] font-semibold font-[inherit] mq450:text-num-19 mq450:leading-num-28 mq800:text-num-26 mq800:leading-num-37">
                Steuern sparen durch kürzere Abschreibungsdauer bei Immobilien.﻿
              </h1>
            </div>
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] text-dark-gray">
              Mit einem Gutachten können Immobilienbesitzer ihre
              Abschreibungsdauer verkürzen und so mehr Steuern sparen –
              besonders bei älteren Gebäuden.
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
                <div className="flex-1 relative tracking-num--0_1 leading-[180%] font-medium">
                  Ihre jährlichen Abschreibungsraten erhöhen
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
                <div className="flex-1 relative tracking-num--0_1 leading-[180%] font-medium">
                  Steuervorteile maximieren
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
                <div className="flex-1 relative tracking-num--0_1 leading-[180%] font-medium">
                  Ihr Nettoeinkommen spürbar steigern
                </div>
              </div>
            </div>
            <div className="self-stretch relative tracking-num--0_1 leading-[180%] text-dark-gray">
              Profitieren Sie von diesem legalen Hebel zur Optimierung Ihrer
              Immobilienrendite.
            </div>
            <button className="cursor-pointer [border:none] py-2 px-num-18 bg-dark-neutral h-12 rounded-num-8 flex items-center justify-center box-border gap-6 hover:bg-dimgray-100">
              <div className="relative text-num-14 leading-[100%] font-semibold font-inter text-light-neutral text-left">
                Free Initial Assesment
              </div>
              <Image
                className="w-3 relative max-h-full"
                width={12}
                height={11}
                sizes="100vw"
                alt=""
                src="/tdesign-arrow-right-up1.svg"
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GutachtenProfitieren;
