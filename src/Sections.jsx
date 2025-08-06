import React from "react";

export default function Sections() {
  return (
    <div className="">
      <section
        id="section-1"
        className="h-screen pt-[5rem] justify-center text-white border border-white grid grid-cols-1"
      >
        <div className="relative text-[50px] font-sans font-semibold p-5 border-2 border-blue-50 h-fit w-fit">
          CLASS PIONEER AND ETERNAL BENCHMARK.
        </div>
        <div className="relative place-self-end justify-center mb-[2rem] px-[3rem] text-gray-400 text-center text-[25px] border-2 border-blue-50">
          The BMW M3 E30. Compact, powerful, sporty and extremely successful on
          the racetrack: the incredible story of the first BMW M3.
        </div>
      </section>
      <section
        id="section-2"
        className="h-screen flex items-center justify-center text-white ring-2"
      >
        <h1 className="text-4xl">Section 2</h1>
      </section>
      <section
        id="section-3"
        className="h-screen flex items-center justify-center text-white ring-2"
      >
        <h1 className="text-4xl">Section 3</h1>
      </section>
    </div>
  );
}
