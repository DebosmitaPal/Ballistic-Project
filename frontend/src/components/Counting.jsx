import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const caseStats = [
  { label: "Total Cases", value: 156 },
  { label: "Open Cases", value: 42 },
  { label: "Resolved Today", value: 7 },
  { label: "Pending Review", value: 13 },
];

export default function Counting() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      id="count"
      ref={ref}
      className="flex gap-8 justify-center my-8 "
    >
      {caseStats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-cyan-50 rounded-lg shadow-md p-8 min-w-[180px] text-center"
        >
          <h3 className="text-lg font-semibold text-cyan-900 font-serif">{stat.label}</h3>
          <div className="text-4xl font-bold text-cyan-800">
            {inView && <CountUp start={1} end={stat.value} duration={1.2} />}
          </div>
        </div>
      ))}
    </section>
  );
}
