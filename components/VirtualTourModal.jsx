"use client";

import React, { useState, useRef } from "react";
import { X, Compass, Maximize, RotateCcw, Sparkles } from "lucide-react";

const VIRTUAL_ROOMS = [
  {
    id: "salon",
    name: "Double-Height Grand Salon",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
  },
  {
    id: "suite",
    name: "Primary Presidential Suite",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
  },
  {
    id: "pool",
    name: "Cantilevered Infinity Spa Terrace",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90"
  }
];

export default function VirtualTourModal({ isOpen, onClose, propertyTitle }) {
  const [activeRoom, setActiveRoom] = useState(VIRTUAL_ROOMS[0]);
  const [panX, setPanX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  if (!isOpen) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX - panX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - startXRef.current;
    setPanX(newX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-[#07080A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="p-3 rounded-2xl bg-[#0E1015]/80 backdrop-blur-md border border-white/10 pointer-events-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium block">
              360° Virtual Walkthrough
            </span>
            <h3 className="text-sm font-serif text-white font-medium">
              {propertyTitle || "Bel-Air Promontory Estate"} · {activeRoom.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setPanX(0)}
              className="p-2.5 rounded-full bg-[#0E1015]/80 hover:bg-black text-neutral-300 hover:text-white border border-white/10"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#0E1015]/80 hover:bg-black text-white border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 360° Panoramic Interactive Drag Canvas */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="absolute inset-0 w-[240%] h-full bg-cover bg-center transition-transform duration-75 ease-out"
            style={{
              backgroundImage: `url('${activeRoom.image}')`,
              transform: `translateX(${panX * 0.4}px) scale(1.08)`
            }}
          />

          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />

          {/* Interactive Drag Hint Overlay */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-neutral-300 border border-white/10">
            <Compass className="w-3.5 h-3.5 text-stone-300 animate-spin [animation-duration:10s]" />
            <span>Click & Drag to explore 360° panoramic view</span>
          </div>
        </div>

        {/* Bottom Room Selector Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {VIRTUAL_ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoom(room);
                setPanX(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeRoom.id === room.id
                  ? "bg-white text-neutral-950 font-semibold shadow-lg"
                  : "bg-[#0E1015]/80 backdrop-blur-md text-neutral-300 border border-white/10 hover:text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeRoom.id === room.id ? "bg-neutral-950" : "bg-stone-400"}`} />
              <span>{room.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
