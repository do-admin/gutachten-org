import type { NextPage } from "next";
import FrameComponent3 from "../components/frame-component3";
import FrameComponent4 from "../components/frame-component4";
import Restnutzungsdauer from "../components/restnutzungsdauer";
import FrameComponent5 from "../components/frame-component5";
import FrameComponent6 from "../components/frame-component6";
import GutachtenProfitieren from "../components/gutachten-profitieren";
import SicherEntscheiden from "../components/sicher-entscheiden";
import FrameComponent7 from "../components/frame-component7";
import Testimonial from "../components/testimonial";
import FrameComponent8 from "../components/frame-component8";
import FrameComponent9 from "../components/frame-component9";
import Section from "../components/section";
import Section1 from "../components/section1";

const HomeOption01: NextPage = () => {
  return (
    <div className="relative bg-light-neutral w-full overflow-hidden flex items-start leading-[normal] tracking-[normal]">
      <main className="h-[10596px] w-num-1440 flex flex-col items-start max-w-full">
        <section className="self-stretch bg-dark-neutral flex flex-col items-start max-w-full mq1125:h-num-auto">
          <FrameComponent3 />
          <FrameComponent4 />
          <Restnutzungsdauer />
        </section>
        <FrameComponent5 />
        <FrameComponent6 />
        <main className="self-stretch bg-white flex flex-col items-start py-num-120 px-num-64 gap-[120px] mq450:gap-[30px] mq450:pt-num-33 mq450:pb-num-33 mq450:box-border mq800:gap-[60px] mq800:pl-num-32 mq800:pr-num-32 mq800:box-border mq1125:pt-num-51 mq1125:pb-num-51 mq1125:box-border mq1350:pt-num-78 mq1350:pb-num-78 mq1350:box-border">
          <GutachtenProfitieren />
          <SicherEntscheiden />
        </main>
        <FrameComponent7 />
        <Testimonial />
        <FrameComponent8 />
        <FrameComponent9 />
        <Section />
        <Section1 />
      </main>
    </div>
  );
};

export default HomeOption01;
