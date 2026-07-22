"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import PauseIcon from "@hugeicons/core-free-icons/PauseIcon";
import PlayIcon from "@hugeicons/core-free-icons/PlayIcon";
import type { VehiclePage } from "@/types/vehicle";

type HeroVideoProps = Pick<VehiclePage["hero"], "desktopVideoWebm" | "desktopVideoMp4" | "mobileVideoWebm" | "mobileVideoMp4" | "posterImage" | "transparentVehicleImage" | "videoAltDescription" | "videoFocalPoint">;

export function ModelHeroVideo(props: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<"desktop" | "mobile" | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const selectSource = () => {
      if (reducedMotion.matches) {
        setVariant(null);
        return;
      }
      const nextVariant = desktop.matches
        ? (props.desktopVideoWebm || props.desktopVideoMp4 ? "desktop" : null)
        : (props.mobileVideoWebm || props.mobileVideoMp4 ? "mobile" : null);
      setReady(false);
      setVariant(nextVariant);
    };
    const timer = window.setTimeout(selectSource, 0);
    reducedMotion.addEventListener("change", selectSource);
    desktop.addEventListener("change", selectSource);
    return () => {
      window.clearTimeout(timer);
      reducedMotion.removeEventListener("change", selectSource);
      desktop.removeEventListener("change", selectSource);
    };
  }, [props.desktopVideoMp4, props.desktopVideoWebm, props.mobileVideoMp4, props.mobileVideoWebm]);

  if (!variant) return null;
  const webm = variant === "desktop" ? props.desktopVideoWebm : props.mobileVideoWebm;
  const mp4 = variant === "desktop" ? props.desktopVideoMp4 : props.mobileVideoMp4;

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setPaused(false);
      } catch {
        setPaused(true);
      }
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return <>
    <video
      key={variant}
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={props.posterImage ?? props.transparentVehicleImage}
      aria-label={props.videoAltDescription}
      onCanPlay={() => setReady(true)}
      onError={() => setReady(false)}
      onPause={() => setPaused(true)}
      onPlay={() => setPaused(false)}
      className={`absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 ${ready ? "opacity-100" : ""}`}
      style={{ objectPosition: props.videoFocalPoint ?? "center" }}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    </video>
    {ready ? <button type="button" onClick={togglePlayback} aria-label={paused ? "Play T2 hero video" : "Pause T2 hero video"} className="absolute bottom-5 right-5 z-30 grid size-11 place-items-center border border-white/35 bg-black/55 text-white transition-colors hover:border-white/75 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jetour-accent sm:bottom-7 sm:right-8">
      <HugeiconsIcon icon={paused ? PlayIcon : PauseIcon} size={19} aria-hidden="true" />
    </button> : null}
  </>;
}
