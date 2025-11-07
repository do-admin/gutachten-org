import type { NextPage } from "next";

export type EckdatenDataType = {
  className?: string;
  datenSets?: string;
  unverbindlicheErsteinschtzung?: string;
  sendenSieUnsDieEckdatenIhrer?: string;
};

const EckdatenData: NextPage<EckdatenDataType> = ({
  className = "",
  datenSets,
  unverbindlicheErsteinschtzung,
  sendenSieUnsDieEckdatenIhrer,
}) => {
  return (
    <div
      className={`self-stretch flex-1 rounded-num-8 border-darkslategray-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-between py-num-22 px-num-23 gap-5 min-w-num-208 text-left text-num-20 text-gutachten-accent font-sora mq450:gap-5 mq450:pt-num-20 mq450:pb-num-20 mq450:box-border ${className}`}
    >
      <b className="w-10 flex-1 relative leading-[144%] inline-block mq450:text-num-16 mq450:leading-num-23">
        {datenSets}
      </b>
      <div className="self-stretch flex flex-col items-start gap-[26px] text-dark-neutral">
        <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[144%] font-normal font-[inherit] mq450:text-num-16 mq450:leading-num-23">
          {unverbindlicheErsteinschtzung}
        </h3>
        <div className="self-stretch relative text-num-16 tracking-num--0_1 leading-[180%] font-inter text-dark-gray">
          {sendenSieUnsDieEckdatenIhrer}
        </div>
      </div>
    </div>
  );
};

export default EckdatenData;
