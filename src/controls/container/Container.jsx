import React, { useRef } from "react";
import ControlsBar from "../bar/ControlsBar.jsx";
import { useControlsVisibility } from "./useControlsVisibility.js";
import { usePlaybackControl } from "../play/usePlaybackControl.js";
import { usePreferences } from "../usePreferences.js";
import { useVolumeControl } from "../volume/useVolumeControl.js";

export default function Container({ core, videoContainer }) {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const { shouldShow, showControls } = useControlsVisibility(
    containerRef,
    barRef,
  );
  const { isPlaying, handlePlayPause } = usePlaybackControl(core);
  const { volume, isMuted, handleVolumeChange, handleMuteToggle } =
    useVolumeControl(core);
  const { clickToPlayPause, setClickToPlayPause } = usePreferences();

  const handleContainerClick = (e) => {
    const isInControlsBar = barRef.current?.contains(e.target);
    if (!isInControlsBar) {
      if (clickToPlayPause) {
        handlePlayPause();
      }
      showControls();
    }
  };

  const handleContainerAuxClick = (e) => {
    if (e.button !== 1 || barRef.current?.contains(e.target)) {
      return;
    }

    e.preventDefault();
    handleMuteToggle();
    showControls();
  };

  return (
    <div
      ref={containerRef}
      className="kickstiny-container"
      onClick={handleContainerClick}
      onAuxClick={handleContainerAuxClick}
    >
      <ControlsBar
        core={core}
        videoContainer={videoContainer}
        shouldShow={shouldShow}
        barRef={barRef}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
        showControls={showControls}
        clickToPlayPause={clickToPlayPause}
        onClickToPlayChange={setClickToPlayPause}
      />
    </div>
  );
}
