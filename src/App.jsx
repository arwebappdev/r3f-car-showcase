import { useRef, useState, useEffect } from "react";
import Sections from "./Sections";
import Scene from "./3DModel/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0); // 👈 loading %

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
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-2xl font-semibold">
          Loading... {Math.round(loadProgress)}%
        </div>
      )}
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <Scene
          progress={progress}
          onLoaded={() => setIsLoaded(true)}
          onProgress={setLoadProgress} // 👈 pass loader update
        />
      </div>
      <div className="relative z-10">
        <Sections />
      </div>
    </main>
  );
}
