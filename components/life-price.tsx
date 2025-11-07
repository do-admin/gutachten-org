import type { NextPage } from "next";

export type LifePriceType = {
  className?: string;
  kaufpreisaufteilung?: string;
};

const LifePrice: NextPage<LifePriceType> = ({
  className = "",
  kaufpreisaufteilung,
}) => {
  return (
    <div
      className={`self-stretch flex-1 border-whitesmoke border-solid border-r-[1px] overflow-hidden flex flex-col items-start py-num-24 px-num-23 text-left text-num-16 text-light-neutral font-sora mq450:gap-5 ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-1">
        <div className="relative leading-num-32 font-semibold">
          {kaufpreisaufteilung}
        </div>
        <div className="self-stretch relative text-num-14 leading-num-24 font-inter text-light-gray text-justify">
          Determine the remaining useful life of your property precisely and
          reliably.
        </div>
      </div>
    </div>
  );
};

export default LifePrice;
