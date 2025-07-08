import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cameraRef } from "./CameraController";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager() {
  useEffect(() => {
    if (!cameraRef.current) return;

    const cam = cameraRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        start: "top top",
        endTrigger: "#section-3",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(cam.position, { x: 2, y: 2, z: 5, duration: 1 }, 0)
      .to(cam.position, { x: -2, y: 1, z: 4, duration: 1 }, 1)
      .to(cam.position, { x: 0, y: 1.5, z: 3, duration: 1 }, 2);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
