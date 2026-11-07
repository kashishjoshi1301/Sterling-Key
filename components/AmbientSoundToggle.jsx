"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low pass filter for warm, relaxing, whisper-soft architectural tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.connect(masterGain);

      // Warm ambient luxury chord: A2 (110Hz), E3 (164.81Hz), A3 (220Hz), C#4 (277.18Hz)
      const frequencies = [110, 164.81, 220, 277.18];
      oscillatorsRef.current = frequencies.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.log("Audio not supported or blocked by browser policy", e);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtxRef.current.currentTime + 1
      );
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
        setIsPlaying(false);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`p-1.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
        isPlaying
          ? "bg-white text-neutral-950 border-white font-medium shadow-sm"
          : "bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white border-white/10"
      }`}
      title={isPlaying ? "Mute Ambient Soundscape" : "Enable Ambient Soundscape"}
    >
      {isPlaying ? (
        <>
          {/* Animated sound equalizer bars */}
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <span className="w-0.5 h-2 bg-neutral-950 animate-pulse" />
            <span className="w-0.5 h-3 bg-neutral-950 animate-bounce" />
            <span className="w-0.5 h-1.5 bg-neutral-950 animate-pulse" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider">Atmosphere ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase font-mono tracking-wider hidden sm:inline">Atmosphere</span>
        </>
      )}
    </button>
  );
}
