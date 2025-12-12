import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import vendorData from "./data/vendorData.json";
import { EQUIPMENT_LIST } from "./constants";

// Scale: 1 foot = 25 pixels
const SCALE = 25;

// Convert feet and inches to pixels
const ftToPixels = (feet, inches = 0) => (feet + inches / 12) * SCALE;

// Room dimensions (in feet and inches)
const ROOM = {
  nwNotchWidth: ftToPixels(5, 5),
  northMainWidth: ftToPixels(20, 0),
  eastMainLength: ftToPixels(24, 7),
  seAlcoveWidth: ftToPixels(4, 5),
  seAlcoveDepth: ftToPixels(3, 8),
  southAlcoveWidth: ftToPixels(13, 0),
  swAlcoveDepth: ftToPixels(6, 6),
  swAlcoveWidth: ftToPixels(6, 4),
  westMainLength: ftToPixels(16, 2),
  nwNotchDepth: ftToPixels(5, 6),
};

const PADDING = 60;

// Button colors
const BUTTON_COLORS = {
  add: "#01F85C",
  addAll: "#00FF7F",
  remove: "#F8019D",
  rotate: "#DBF801",
  clearAll: "#F80109",
  save: "#00BFFF",
};

// Helper function to get rotation transform
const getRotationTransform = (rotation, width, height) => {
  if (rotation === 90) return `translate(${height}, 0) rotate(90)`;
  if (rotation === 180) return `translate(${width}, ${height}) rotate(180)`;
  if (rotation === 270) return `translate(0, ${width}) rotate(270)`;
  return "";
};

// Treadmill SVG component
const TreadmillSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 34 82" : "0 0 82 34";
  const transform = getRotationTransform(rotation, 82, 34);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="80" height="32" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="1" y="1" width="80" height="3" rx="1" fill="#a0a0a0" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="1" y="30" width="80" height="3" rx="1" fill="#a0a0a0" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="2" y="4" width="62" height="26" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.5"/>
        <line x1="2" y1="11" x2="64" y2="11" stroke="#505050" strokeWidth="0.3"/>
        <line x1="2" y1="17" x2="64" y2="17" stroke="#505050" strokeWidth="0.3"/>
        <line x1="2" y1="23" x2="64" y2="23" stroke="#505050" strokeWidth="0.3"/>
        <rect x="64" y="2" width="12" height="3" rx="0.5" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="64" y="29" width="12" height="3" rx="0.5" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="72" y="5" width="3" height="5" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="72" y="24" width="3" height="5" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="66" y="8" width="14" height="18" rx="2" fill="#404040" stroke="#2a2a2a" strokeWidth="0.5"/>
        <rect x="68" y="10" width="10" height="10" rx="1" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.3"/>
        <circle cx="71" cy="23" r="1.2" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
        <circle cx="75" cy="23" r="1.2" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
      </g>
    </svg>
  );
};

// Elliptical SVG component
const EllipticalSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 34 82" : "0 0 82 34";
  const transform = getRotationTransform(rotation, 82, 34);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="80" height="32" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="5" y="14" width="55" height="6" rx="1" fill="#909090" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="10" cy="17" rx="7" ry="12" fill="#808080" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="10" cy="17" rx="4" ry="7" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="10" cy="17" r="2" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <ellipse cx="32" cy="6" rx="12" ry="4" fill="#707070" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="32" cy="6" rx="9" ry="2.5" fill="#888888" stroke="#505050" strokeWidth="0.3"/>
        <ellipse cx="32" cy="28" rx="12" ry="4" fill="#707070" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="32" cy="28" rx="9" ry="2.5" fill="#888888" stroke="#505050" strokeWidth="0.3"/>
        <line x1="40" y1="6" x2="62" y2="10" stroke="#606060" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="6" r="2" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="40" y1="28" x2="62" y2="24" stroke="#606060" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="28" r="2" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="61" y="7" width="6" height="4" rx="1" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="61" y="23" width="6" height="4" rx="1" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="68" y="4" width="3" height="6" rx="0.5" fill="#888888" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="68" y="24" width="3" height="6" rx="0.5" fill="#888888" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="66" y="10" width="12" height="14" rx="2" fill="#404040" stroke="#2a2a2a" strokeWidth="0.5"/>
        <rect x="68" y="12" width="8" height="6" rx="1" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.3"/>
        <circle cx="70" cy="21" r="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
        <circle cx="74" cy="21" r="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
      </g>
    </svg>
  );
};

// Recumbent Bike SVG component
const RecumbentBikeSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 34 82" : "0 0 82 34";
  const transform = getRotationTransform(rotation, 82, 34);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="80" height="32" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="5" y="14" width="70" height="6" rx="1" fill="#909090" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="58" cy="17" rx="12" ry="10" fill="#606060" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="66" y="8" width="4" height="18" rx="2" fill="#505050" stroke="#3a3a3a" strokeWidth="0.4"/>
        <ellipse cx="55" cy="17" rx="8" ry="7" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="15" cy="17" r="9" fill="#808080" stroke="#3a3a3a" strokeWidth="0.5"/>
        <circle cx="15" cy="17" r="6" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="15" cy="17" r="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="15" y1="17" x2="15" y2="6" stroke="#404040" strokeWidth="2" strokeLinecap="round"/>
        <line x1="15" y1="17" x2="15" y2="28" stroke="#404040" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="15" cy="5" rx="5" ry="2" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <ellipse cx="15" cy="29" rx="5" ry="2" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="45" y="2" width="10" height="3" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="45" y="29" width="10" height="3" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="3" y="10" width="10" height="14" rx="2" fill="#404040" stroke="#2a2a2a" strokeWidth="0.5"/>
        <rect x="4" y="12" width="8" height="6" rx="1" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.3"/>
        <circle cx="6" cy="21" r="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
        <circle cx="10" cy="21" r="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
      </g>
    </svg>
  );
};

// Rower SVG component
const RowerSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 34 82" : "0 0 82 34";
  const transform = getRotationTransform(rotation, 82, 34);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="80" height="32" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="5" y="13" width="72" height="8" rx="1" fill="#909090" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="8" y="15" width="50" height="4" rx="0.5" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="35" y="11" width="12" height="12" rx="2" fill="#606060" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="41" cy="17" rx="4" ry="4" fill="#707070" stroke="#3a3a3a" strokeWidth="0.3"/>
        <circle cx="70" cy="17" r="10" fill="#808080" stroke="#3a3a3a" strokeWidth="0.5"/>
        <circle cx="70" cy="17" r="7" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="70" cy="17" r="4" fill="#606060" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="70" y1="10" x2="70" y2="24" stroke="#505050" strokeWidth="0.5"/>
        <line x1="63" y1="17" x2="77" y2="17" stroke="#505050" strokeWidth="0.5"/>
        <line x1="65" y1="12" x2="75" y2="22" stroke="#505050" strokeWidth="0.5"/>
        <line x1="65" y1="22" x2="75" y2="12" stroke="#505050" strokeWidth="0.5"/>
        <rect x="55" y="4" width="8" height="6" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="55" y="24" width="8" height="6" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <line x1="56" y1="7" x2="62" y2="7" stroke="#505050" strokeWidth="1"/>
        <line x1="56" y1="27" x2="62" y2="27" stroke="#505050" strokeWidth="1"/>
        <rect x="3" y="14" width="6" height="6" rx="1" fill="#404040" stroke="#2a2a2a" strokeWidth="0.5"/>
        <rect x="2" y="11" width="3" height="12" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="58" y="11" width="8" height="12" rx="1" fill="#404040" stroke="#2a2a2a" strokeWidth="0.4"/>
        <rect x="59" y="13" width="6" height="5" rx="0.5" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.2"/>
        <circle cx="61" cy="20" r="0.8" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
        <circle cx="64" cy="20" r="0.8" fill="#606060" stroke="#3a3a3a" strokeWidth="0.2"/>
      </g>
    </svg>
  );
};

// Dual Pulley SVG component
const DualPulleySVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 55 56" : "0 0 56 55";
  const transform = getRotationTransform(rotation, 56, 55);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="54" height="53" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="18" y="2" width="20" height="30" rx="2" fill="#505050" stroke="#3a3a3a" strokeWidth="0.6"/>
        <line x1="20" y1="6" x2="36" y2="6" stroke="#404040" strokeWidth="0.5"/>
        <line x1="20" y1="10" x2="36" y2="10" stroke="#404040" strokeWidth="0.5"/>
        <line x1="20" y1="14" x2="36" y2="14" stroke="#404040" strokeWidth="0.5"/>
        <line x1="20" y1="18" x2="36" y2="18" stroke="#404040" strokeWidth="0.5"/>
        <line x1="20" y1="22" x2="36" y2="22" stroke="#404040" strokeWidth="0.5"/>
        <line x1="20" y1="26" x2="36" y2="26" stroke="#404040" strokeWidth="0.5"/>
        <rect x="3" y="8" width="5" height="40" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="5.5" cy="15" r="1" fill="#707070"/>
        <circle cx="5.5" cy="22" r="1" fill="#707070"/>
        <circle cx="5.5" cy="29" r="1" fill="#707070"/>
        <circle cx="5.5" cy="36" r="1" fill="#707070"/>
        <rect x="48" y="8" width="5" height="40" rx="1" fill="#888888" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="50.5" cy="15" r="1" fill="#707070"/>
        <circle cx="50.5" cy="22" r="1" fill="#707070"/>
        <circle cx="50.5" cy="29" r="1" fill="#707070"/>
        <circle cx="50.5" cy="36" r="1" fill="#707070"/>
        <line x1="8" y1="10" x2="20" y2="4" stroke="#606060" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="48" y1="10" x2="36" y2="4" stroke="#606060" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="8" y="6" width="40" height="3" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="8" cy="12" r="4" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="8" cy="12" r="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.3"/>
        <circle cx="48" cy="12" r="4" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="48" cy="12" r="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="2" y="20" width="3" height="8" rx="1" fill="#404040" stroke="#2a2a2a" strokeWidth="0.3"/>
        <rect x="51" y="20" width="3" height="8" rx="1" fill="#404040" stroke="#2a2a2a" strokeWidth="0.3"/>
        <rect x="3" y="48" width="8" height="4" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="45" y="48" width="8" height="4" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="22" y="50" width="12" height="3" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
      </g>
    </svg>
  );
};

// Leg Extension/Curl SVG component
const LegExtCurlSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 50 70" : "0 0 70 50";
  const transform = getRotationTransform(rotation, 70, 50);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="68" height="48" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="3" y="8" width="18" height="34" rx="1" fill="#505050" stroke="#3a3a3a" strokeWidth="0.5"/>
        <line x1="12" y1="10" x2="12" y2="40" stroke="#404040" strokeWidth="1"/>
        <rect x="5" y="10" width="14" height="6" rx="1" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="3" y="3" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="3" y="42" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="55" y="18" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="55" y="27" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="21" y="20" width="35" height="10" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="24" y="14" width="10" height="22" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="25" y="15" width="8" height="20" rx="1.5" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="34" y="17" width="14" height="16" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="35" y="18" width="12" height="14" rx="1.5" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="48" y="22" width="12" height="6" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="52" y="6" width="12" height="8" rx="4" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="54" cy="10" rx="2" ry="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <ellipse cx="62" cy="10" rx="2" ry="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="52" y="36" width="12" height="8" rx="4" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <ellipse cx="54" cy="40" rx="2" ry="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <ellipse cx="62" cy="40" rx="2" ry="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="52" y1="14" x2="52" y2="22" stroke="#505050" strokeWidth="2" strokeLinecap="round"/>
        <line x1="52" y1="28" x2="52" y2="36" stroke="#505050" strokeWidth="2" strokeLinecap="round"/>
        <rect x="28" y="8" width="3" height="6" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="28" y="36" width="3" height="6" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.3"/>
      </g>
    </svg>
  );
};

// Chest Press SVG component
const ChestPressSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 50 65" : "0 0 65 50";
  const transform = getRotationTransform(rotation, 65, 50);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="63" height="48" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="3" y="8" width="16" height="34" rx="1" fill="#505050" stroke="#3a3a3a" strokeWidth="0.5"/>
        <line x1="11" y1="10" x2="11" y2="40" stroke="#404040" strokeWidth="1"/>
        <rect x="5" y="10" width="12" height="5" rx="1" fill="#5a6a7a" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="3" y="3" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="3" y="42" width="8" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="50" y="20" width="8" height="10" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="19" y="21" width="30" height="8" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="22" y="15" width="10" height="20" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="23" y="16" width="8" height="18" rx="1.5" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <rect x="32" y="18" width="12" height="14" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="33" y="19" width="10" height="12" rx="1.5" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="19" y1="12" x2="52" y2="8" stroke="#606060" strokeWidth="3" strokeLinecap="round"/>
        <rect x="50" y="4" width="8" height="6" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.4"/>
        <line x1="54" y1="5" x2="54" y2="9" stroke="#505050" strokeWidth="1"/>
        <line x1="19" y1="38" x2="52" y2="42" stroke="#606060" strokeWidth="3" strokeLinecap="round"/>
        <rect x="50" y="40" width="8" height="6" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.4"/>
        <line x1="54" y1="41" x2="54" y2="45" stroke="#505050" strokeWidth="1"/>
        <circle cx="19" cy="12" r="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.4"/>
        <circle cx="19" cy="38" r="3" fill="#505050" stroke="#3a3a3a" strokeWidth="0.4"/>
      </g>
    </svg>
  );
};

// Bench SVG component
const BenchSVG = ({ rotation = 0 }) => {
  const isVertical = rotation === 90 || rotation === 270;
  const viewBox = isVertical ? "0 0 28 55" : "0 0 55 28";
  const transform = getRotationTransform(rotation, 55, 28);
  
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g transform={transform}>
        <rect x="1" y="1" width="53" height="26" rx="2" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.75"/>
        <rect x="4" y="10" width="47" height="8" rx="1" fill="#707070" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="6" y="4" width="40" height="20" rx="2" fill="#404040" stroke="#3a3a3a" strokeWidth="0.5"/>
        <rect x="8" y="6" width="36" height="16" rx="1.5" fill="#505050" stroke="#3a3a3a" strokeWidth="0.3"/>
        <line x1="26" y1="6" x2="26" y2="22" stroke="#404040" strokeWidth="0.5" strokeDasharray="2,2"/>
        <rect x="46" y="6" width="6" height="6" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="46" y="16" width="6" height="6" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="3" y="8" width="4" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
        <rect x="3" y="15" width="4" height="5" rx="1" fill="#606060" stroke="#3a3a3a" strokeWidth="0.4"/>
      </g>
    </svg>
  );
};

// Round Button Component with haptic feedback
const RoundButton = ({ onClick, disabled, color, label, textColor = "#000" }) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: disabled ? "#ccc" : color,
        color: disabled ? "#888" : textColor,
        border: "none",
        fontSize: "16px",
        fontWeight: "600",
        fontFamily: "Lexend, sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 8px rgba(0,0,0,0.3)",
        transition: "transform 0.1s, box-shadow 0.1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        lineHeight: "1.2",
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(0.95)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        }
      }}
    >
      {label}
    </button>
  );
};

export default function FloorPlan() {
  const [placedEquipment, setPlacedEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [hoveredEquipment, setHoveredEquipment] = useState(null);
  const canvasRef = useRef(null);

  // Get equipment dimensions from vendorData based on vendor and equipment
  const getEquipmentDimensions = (equipmentId, vendorId) => {
    const product = vendorData.products.find(
      p => p.equipmentid === equipmentId && p.vendorid === vendorId
    );
    
    if (!product || !product.C15) return { width: 80, height: 40 };
    
    const dims = product.C15;
    let length = 60, width = 30;
    
    if (typeof dims === 'string') {
      const parts = dims.split(/[xX×]/);
      if (parts.length >= 2) {
        length = parseFloat(parts[0].trim()) || 60;
        width = parseFloat(parts[1].trim()) || 30;
      }
    }
    
    return {
      width: (length / 12) * SCALE,
      height: (width / 12) * SCALE,
    };
  };

  // Get product info for display
  const getProductInfo = (equipmentId, vendorId) => {
    return vendorData.products.find(
      p => p.equipmentid === equipmentId && p.vendorid === vendorId
    );
  };

  // Get vendor name from vendorId
  const getVendorName = (vendorId) => {
    const vendor = vendorData.vendors.find(v => v.vendorid === vendorId);
    return vendor?.name || vendorId;
  };

  // Add equipment to the floor plan
  const handleAddEquipment = () => {
    if (!selectedVendor || !selectedEquipmentType) return;
    
    const equipment = EQUIPMENT_LIST.find(e => e.id === selectedEquipmentType);
    const product = getProductInfo(selectedEquipmentType, selectedVendor);
    const dims = getEquipmentDimensions(selectedEquipmentType, selectedVendor);
    
    const newId = `${selectedEquipmentType}-${selectedVendor}-${Date.now()}`;
    const newEquipment = {
      id: newId,
      equipmentId: selectedEquipmentType,
      vendorId: selectedVendor,
      name: equipment?.name || "Equipment",
      brand: product?.brand || "",
      vendor: product?.vendor || "",
      x: PADDING + 150,
      y: PADDING + 150,
      width: dims.width,
      height: dims.height,
      rotation: 0,
    };
    
    setPlacedEquipment(prev => [...prev, newEquipment]);
    setSelectedEquipment(newId); // Auto-select the newly added equipment
    setSelectedVendor("");
    setSelectedEquipmentType("");
  };

  // Add all equipment for selected vendor with predefined layout
  const handleAddAllEquipment = () => {
    if (!selectedVendor) return;
    
    const newEquipmentList = [];
    const timestamp = Date.now();
    
    // Helper to create equipment entry with rotation
    const createEquipment = (equipmentId, name, x, y, rotation, index) => {
      const product = getProductInfo(equipmentId, selectedVendor);
      const dims = getEquipmentDimensions(equipmentId, selectedVendor);
      
      // Swap width/height for 90° or 270° rotations
      const isVertical = rotation === 90 || rotation === 270;
      const width = isVertical ? dims.height : dims.width;
      const height = isVertical ? dims.width : dims.height;
      
      return {
        id: `${equipmentId}-${selectedVendor}-${timestamp}-${index}`,
        equipmentId,
        vendorId: selectedVendor,
        name,
        brand: product?.brand || "",
        vendor: product?.vendor || "",
        x,
        y,
        width,
        height,
        rotation,
      };
    };
    
    // North wall positioning
    // Cardio needs 270° rotation so console faces NORTH (up toward pool)
    
    const northWallY = PADDING + 25; // Moved down ~15px
    const northWallStartX = PADDING + ROOM.nwNotchWidth + 55; // Moved right ~40px
    
    let xPos = northWallStartX;
    const spacing = 12; // Increased spacing
    
    // Elliptical 1 - at 270° rotation, horizontal spacing = original dims.height
    let dims = getEquipmentDimensions("E05", selectedVendor);
    let rotatedWidth = dims.height;
    newEquipmentList.push(createEquipment("E05", "Elliptical", xPos, northWallY, 270, 0));
    xPos += rotatedWidth + spacing;
    
    // Elliptical 2
    newEquipmentList.push(createEquipment("E05", "Elliptical", xPos, northWallY, 270, 1));
    xPos += rotatedWidth + spacing;
    
    // Treadmill 1
    dims = getEquipmentDimensions("E04", selectedVendor);
    rotatedWidth = dims.height;
    newEquipmentList.push(createEquipment("E04", "Treadmill", xPos, northWallY, 270, 2));
    xPos += rotatedWidth + spacing;
    
    // Treadmill 2
    newEquipmentList.push(createEquipment("E04", "Treadmill", xPos, northWallY, 270, 3));
    xPos += rotatedWidth + spacing;
    
    // Rower
    dims = getEquipmentDimensions("E07", selectedVendor);
    rotatedWidth = dims.height;
    newEquipmentList.push(createEquipment("E07", "Rower", xPos, northWallY, 270, 4));
    xPos += rotatedWidth + spacing;
    
    // Recumbent Bike
    dims = getEquipmentDimensions("E06", selectedVendor);
    rotatedWidth = dims.height;
    newEquipmentList.push(createEquipment("E06", "Recumbent Bike", xPos, northWallY, 270, 5));
    
    // Strength equipment - all at 180° rotation
    // User can drag to exact positions
    
    // E02 (Leg Ext/Curl) - right side, upper area
    const rightColumnX = PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth - 150;
    newEquipmentList.push(createEquipment("E02", "Leg Ext/Curl", 
      rightColumnX, 
      PADDING + 180, 
      180, 6));
    
    // E08 (Bench) - center-left of main floor
    newEquipmentList.push(createEquipment("E08", "Bench", 
      PADDING + ROOM.nwNotchWidth + 50, 
      PADDING + 280, 
      180, 7));
    
    // E03 (Chest Press) - right side, middle (below E02)
    newEquipmentList.push(createEquipment("E03", "Chest Press", 
      rightColumnX, 
      PADDING + 320, 
      180, 8));
    
    // E01 (Dual Pulley) - center area
    newEquipmentList.push(createEquipment("E01", "Dual Pulley", 
      PADDING + ROOM.swAlcoveWidth + ROOM.southAlcoveWidth + 30, 
      PADDING + ROOM.eastMainLength + 20, 
      180, 9));
    
    setPlacedEquipment(prev => [...prev, ...newEquipmentList]);
    setSelectedEquipment(null);
    setSelectedVendor("");
  };

  // Remove selected equipment
  const removeEquipment = () => {
    if (!selectedEquipment) return;
    setPlacedEquipment(prev => prev.filter(e => e.id !== selectedEquipment));
    setSelectedEquipment(null);
  };

  // Update equipment position
  const updateEquipmentPosition = (id, x, y) => {
    setPlacedEquipment(prev =>
      prev.map(e => (e.id === id ? { ...e, x, y } : e))
    );
  };

  // Rotate equipment 90 degrees
  const rotateEquipment = () => {
    if (!selectedEquipment) return;
    setPlacedEquipment(prev =>
      prev.map(e => {
        if (e.id === selectedEquipment) {
          return { 
            ...e, 
            width: e.height, 
            height: e.width,
            rotation: (e.rotation + 90) % 360 
          };
        }
        return e;
      })
    );
  };

  // Clear all equipment - with confirmation
  const handleClearAllClick = () => {
    if (placedEquipment.length === 0) return;
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    setPlacedEquipment([]);
    setSelectedEquipment(null);
    setShowClearConfirm(false);
  };

  const cancelClearAll = () => {
    setShowClearConfirm(false);
  };

  // Save floor plan as PNG
  const saveFloorPlan = async () => {
    if (!canvasRef.current) return;
    
    try {
      // Temporarily hide selection highlight for cleaner export
      const currentSelected = selectedEquipment;
      setSelectedEquipment(null);
      
      // Wait for re-render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
        useCORS: true,
      });
      
      // Restore selection
      setSelectedEquipment(currentSelected);
      
      // Create download link
      const link = document.createElement("a");
      link.download = `floor-plan-${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error saving floor plan:", error);
      alert("Error saving floor plan. Please try again.");
    }
  };

  // Canvas dimensions
  const canvasWidth = ftToPixels(25, 5) + PADDING * 2;
  const canvasHeight = ftToPixels(28, 3) + PADDING * 2;

  // Room path for clipping grid
  const getRoomPath = () => {
    const x = PADDING;
    const y = PADDING;
    
    const p1x = x + ROOM.nwNotchWidth;
    const p1y = y;
    const p2x = x + ROOM.nwNotchWidth + ROOM.northMainWidth;
    const p2y = y;
    const p3x = p2x;
    const p3y = y + ROOM.eastMainLength;
    const p4x = p2x - ROOM.seAlcoveWidth;
    const p4y = p3y;
    const p5x = p4x;
    const p5y = p3y + ROOM.seAlcoveDepth;
    const p6x = x + ROOM.swAlcoveWidth + ROOM.southAlcoveWidth;
    const p6y = p5y;
    const p7x = x + ROOM.swAlcoveWidth;
    const p7y = p5y;
    const p8x = p7x;
    const p8y = p5y - ROOM.swAlcoveDepth;
    const p9x = x;
    const p9y = p8y;
    const p10x = x;
    const p10y = y + ROOM.nwNotchDepth;
    const p11x = x + ROOM.nwNotchWidth;
    const p11y = p10y;
    
    return `
      M ${p1x} ${p1y}
      L ${p2x} ${p2y}
      L ${p3x} ${p3y}
      L ${p4x} ${p4y}
      L ${p5x} ${p5y}
      L ${p6x} ${p6y}
      L ${p7x} ${p7y}
      L ${p8x} ${p8y}
      L ${p9x} ${p9y}
      L ${p10x} ${p10y}
      L ${p11x} ${p11y}
      Z
    `;
  };

  // Render equipment SVG based on type
  const renderEquipmentSVG = (equip) => {
    const props = { rotation: equip.rotation };
    
    switch (equip.equipmentId) {
      case "E04": return <TreadmillSVG {...props} />;
      case "E05": return <EllipticalSVG {...props} />;
      case "E06": return <RecumbentBikeSVG {...props} />;
      case "E07": return <RowerSVG {...props} />;
      case "E01": return <DualPulleySVG {...props} />;
      case "E02": return <LegExtCurlSVG {...props} />;
      case "E03": return <ChestPressSVG {...props} />;
      case "E08": return <BenchSVG {...props} />;
      default: return <TreadmillSVG {...props} />;
    }
  };

  // Scale factor for the floor plan display
  const scaleFactor = 1.4;

  // Selection highlight color
  const selectionColor = BUTTON_COLORS.add;

  return (
    <div className="w-full px-[40px] pb-[100px] pt-[20px]">
      <h1 
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "Lexend, sans-serif", color: "#000080" }}
      >
        Gym Floor Plan Layout
      </h1>

      {/* Controls Row */}
      <div className="flex items-center gap-[20px] mb-[30px] flex-wrap">
        {/* Vendor Dropdown */}
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="px-[10px] py-[8px] rounded-lg focus:outline-none cursor-pointer"
          style={{ 
            fontFamily: "Lexend, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            border: "3px solid #000080",
            minWidth: "220px",
            color: selectedVendor ? "#000080" : "#666",
            backgroundColor: "#fff",
          }}
        >
          <option value="">-- Select Vendor --</option>
          {vendorData.vendors.map(vendor => (
            <option key={vendor.vendorid} value={vendor.vendorid}>
              {vendor.name}
            </option>
          ))}
        </select>

        {/* Add All Button - right after vendor dropdown */}
        <RoundButton
          onClick={handleAddAllEquipment}
          disabled={!selectedVendor}
          color={BUTTON_COLORS.addAll}
          label={<span>Add<br/>All</span>}
        />

        {/* Equipment Dropdown */}
        <select
          value={selectedEquipmentType}
          onChange={(e) => setSelectedEquipmentType(e.target.value)}
          className="px-[10px] py-[8px] rounded-lg focus:outline-none cursor-pointer"
          style={{ 
            fontFamily: "Lexend, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            border: "3px solid #000080",
            minWidth: "220px",
            color: selectedEquipmentType ? "#000080" : "#666",
            backgroundColor: "#fff",
          }}
        >
          <option value="">-- Select Equipment --</option>
          {EQUIPMENT_LIST.map(equip => (
            <option key={equip.id} value={equip.id}>
              {equip.name}
            </option>
          ))}
        </select>

        {/* Round Buttons */}
        <RoundButton
          onClick={handleAddEquipment}
          disabled={!selectedVendor || !selectedEquipmentType}
          color={BUTTON_COLORS.add}
          label="Add"
        />

        <RoundButton
          onClick={removeEquipment}
          disabled={!selectedEquipment}
          color={BUTTON_COLORS.remove}
          label="Remove"
        />

        <RoundButton
          onClick={rotateEquipment}
          disabled={!selectedEquipment}
          color={BUTTON_COLORS.rotate}
          label="Rotate"
        />

        <RoundButton
          onClick={handleClearAllClick}
          disabled={placedEquipment.length === 0}
          color={BUTTON_COLORS.clearAll}
          label={<span>Clear<br/>All</span>}
          textColor="#fff"
        />

        <RoundButton
          onClick={saveFloorPlan}
          disabled={placedEquipment.length === 0}
          color={BUTTON_COLORS.save}
          label="Save"
        />
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              maxWidth: "400px",
              textAlign: "center",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>
              Clear All Equipment?
            </h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "25px" }}>
              Are you sure you want to remove all equipment from the floor plan? 
              <br /><strong style={{ color: "#F80109" }}>This action cannot be undone.</strong>
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button
                onClick={cancelClearAll}
                style={{
                  padding: "10px 25px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "#e0e0e0",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "Lexend, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmClearAll}
                style={{
                  padding: "10px 25px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "#F80109",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "Lexend, sans-serif",
                }}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floor Plan Canvas */}
      <div 
        ref={canvasRef}
        className="relative rounded-lg"
        style={{ 
          border: "3px solid #000080",
          backgroundColor: "#fff",
          width: canvasWidth * scaleFactor,
          height: canvasHeight * scaleFactor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${scaleFactor})`,
            transformOrigin: "top left",
            width: canvasWidth,
            height: canvasHeight,
            position: "relative",
          }}
        >
          <svg
            width={canvasWidth}
            height={canvasHeight}
            style={{ display: "block", position: "absolute", top: 0, left: 0 }}
          >
            {/* Define clip path for grid */}
            <defs>
              <clipPath id="roomClip">
                <path d={getRoomPath()} />
              </clipPath>
            </defs>

            {/* Background outside room */}
            <rect x="0" y="0" width={canvasWidth} height={canvasHeight} fill="#fff" />

            {/* Room fill */}
            <path d={getRoomPath()} fill="#f5f5f5" />

            {/* Grid lines - clipped to room interior */}
            <g clipPath="url(#roomClip)">
              {[...Array(Math.ceil(canvasWidth / SCALE) + 1)].map((_, i) => (
                <line 
                  key={`v-${i}`} 
                  x1={i * SCALE} 
                  y1={0} 
                  x2={i * SCALE} 
                  y2={canvasHeight} 
                  stroke="#d0d0d0" 
                  strokeWidth="0.5" 
                />
              ))}
              {[...Array(Math.ceil(canvasHeight / SCALE) + 1)].map((_, i) => (
                <line 
                  key={`h-${i}`} 
                  x1={0} 
                  y1={i * SCALE} 
                  x2={canvasWidth} 
                  y2={i * SCALE} 
                  stroke="#d0d0d0" 
                  strokeWidth="0.5" 
                />
              ))}
            </g>

            {/* Room outline */}
            <path d={getRoomPath()} fill="none" stroke="#333" strokeWidth="3" />

            {/* Dimension labels - all on outside of room */}
            
            {/* North wall - 20' 0" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth / 2} 
              y={PADDING - 8} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="11" 
              fontFamily="Lexend, sans-serif" 
              fontWeight="500"
            >
              20' 0"
            </text>

            {/* NW notch width - 5' 5" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth / 2} 
              y={PADDING + ROOM.nwNotchDepth - 8} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif"
            >
              5' 5"
            </text>

            {/* NW notch depth - 5' 6" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth - 12} 
              y={PADDING + ROOM.nwNotchDepth / 2} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif" 
              transform={`rotate(-90, ${PADDING + ROOM.nwNotchWidth - 12}, ${PADDING + ROOM.nwNotchDepth / 2})`}
            >
              5' 6"
            </text>

            {/* East wall - 24' 7" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth + 15} 
              y={PADDING + ROOM.eastMainLength / 2} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="11" 
              fontFamily="Lexend, sans-serif" 
              fontWeight="500" 
              transform={`rotate(90, ${PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth + 15}, ${PADDING + ROOM.eastMainLength / 2})`}
            >
              24' 7"
            </text>

            {/* SE alcove width - 4' 5" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth - ROOM.seAlcoveWidth / 2} 
              y={PADDING + ROOM.eastMainLength + 15} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif"
            >
              4' 5"
            </text>

            {/* SE alcove depth - 3' 8" */}
            <text 
              x={PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth - ROOM.seAlcoveWidth + 15} 
              y={PADDING + ROOM.eastMainLength + ROOM.seAlcoveDepth / 2} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif" 
              transform={`rotate(90, ${PADDING + ROOM.nwNotchWidth + ROOM.northMainWidth - ROOM.seAlcoveWidth + 15}, ${PADDING + ROOM.eastMainLength + ROOM.seAlcoveDepth / 2})`}
            >
              3' 8"
            </text>

            {/* South alcove - 13' 0" */}
            <text 
              x={PADDING + ROOM.swAlcoveWidth + ROOM.southAlcoveWidth / 2} 
              y={PADDING + ROOM.eastMainLength + ROOM.seAlcoveDepth + 15} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="11" 
              fontFamily="Lexend, sans-serif" 
              fontWeight="500"
            >
              13' 0"
            </text>

            {/* SW alcove width - 6' 4" */}
            <text 
              x={PADDING + ROOM.swAlcoveWidth / 2} 
              y={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + 15} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif"
            >
              6' 4"
            </text>

            {/* SW alcove depth - 6' 6" */}
            <text 
              x={PADDING + ROOM.swAlcoveWidth - 15} 
              y={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth / 2} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="10" 
              fontFamily="Lexend, sans-serif" 
              transform={`rotate(-90, ${PADDING + ROOM.swAlcoveWidth - 15}, ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth / 2})`}
            >
              6' 6"
            </text>

            {/* West wall - 16' 2" */}
            <text 
              x={PADDING - 15} 
              y={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength / 2} 
              textAnchor="middle" 
              fill="#2563eb" 
              fontSize="11" 
              fontFamily="Lexend, sans-serif" 
              fontWeight="500" 
              transform={`rotate(-90, ${PADDING - 15}, ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength / 2})`}
            >
              16' 2"
            </text>

            {/* Door 1 - South wall of SW alcove (swings into room) */}
            <line 
              x1={PADDING + ROOM.swAlcoveWidth + 10} 
              y1={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth} 
              x2={PADDING + ROOM.swAlcoveWidth + 10} 
              y2={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth - 32} 
              stroke="#333" 
              strokeWidth="2" 
            />
            <path 
              d={`M ${PADDING + ROOM.swAlcoveWidth + 10} ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth - 32} A 32 32 0 0 0 ${PADDING + ROOM.swAlcoveWidth + 42} ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength + ROOM.swAlcoveDepth}`} 
              fill="none" 
              stroke="#666" 
              strokeWidth="1" 
              strokeDasharray="3,3" 
            />

            {/* Door 2 - West wall, south side near SW corner (swings outward to west) */}
            <line 
              x1={PADDING} 
              y1={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength - 10} 
              x2={PADDING - 32} 
              y2={PADDING + ROOM.nwNotchDepth + ROOM.westMainLength - 10} 
              stroke="#333" 
              strokeWidth="2" 
            />
            <path 
              d={`M ${PADDING - 32} ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength - 10} A 32 32 0 0 1 ${PADDING} ${PADDING + ROOM.nwNotchDepth + ROOM.westMainLength - 42}`} 
              fill="none" 
              stroke="#666" 
              strokeWidth="1" 
              strokeDasharray="3,3" 
            />
          </svg>

          {/* Draggable Equipment */}
          {placedEquipment.map(equip => (
            <Rnd
              key={equip.id}
              size={{ width: equip.width, height: equip.height }}
              position={{ x: equip.x, y: equip.y }}
              onDragStop={(e, d) => updateEquipmentPosition(equip.id, d.x, d.y)}
              enableResizing={false}
              onClick={() => setSelectedEquipment(equip.id)}
              onMouseEnter={() => setHoveredEquipment(equip.id)}
              onMouseLeave={() => setHoveredEquipment(null)}
              style={{
                border: selectedEquipment === equip.id 
                  ? `3px solid ${selectionColor}` 
                  : "1px solid #888",
                borderRadius: "3px",
                cursor: "move",
                boxShadow: selectedEquipment === equip.id 
                  ? `0 0 12px ${selectionColor}, 0 0 20px ${selectionColor}40` 
                  : "none",
                zIndex: selectedEquipment === equip.id ? 100 : 10,
                overflow: "visible",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                {renderEquipmentSVG(equip)}
                
                {/* Equipment Code Label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    backgroundColor: "rgba(0, 0, 128, 0.85)",
                    color: "#fff",
                    fontSize: "8px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: "600",
                    padding: "1px 3px",
                    borderRadius: "2px",
                    lineHeight: "1",
                  }}
                >
                  {equip.equipmentId}/{equip.vendorId}
                </div>

                {/* Tooltip on hover */}
                {hoveredEquipment === equip.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-35px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      color: "#fff",
                      fontSize: "10px",
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: "500",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                      zIndex: 200,
                      pointerEvents: "none",
                    }}
                  >
                    {equip.name} - {getVendorName(equip.vendorId)}
                  </div>
                )}
              </div>
            </Rnd>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div 
        className="mt-[30px] text-gray-600 text-sm"
        style={{ fontFamily: "Lexend, sans-serif" }}
      >
        <p>
          <strong>Tips:</strong> Select a vendor and click <strong>Add All</strong> to add all equipment in a suggested layout 
          (cardio on North wall facing the pool, strength in main area). Or add equipment one at a time with the Add button.
          Drag equipment to reposition. Click to select, then use Rotate or Remove buttons.
          Hover over equipment to see full name. Click Save to download as PNG image.
        </p>
      </div>
    </div>
  );
}
