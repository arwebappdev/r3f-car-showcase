import { useRef, useState, useEffect } from "react";
import Sections from "./Sections";
import Scene from "./3DModel/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 5,
      markers: false,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });
  }, []);

  return (
    <main ref={containerRef} className="relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <Scene progress={progress} />
      </div>
      <div className="relative z-10">
        <Sections />
      </div>
    </main>
  );
}
