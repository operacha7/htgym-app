import React from "react";
import { 
  SCORE_LABELS, 
  DEFAULT_WEIGHTS, 
  S02B_LABELS 
} from "./constants";

export default function Criteria() {
  // Column widths - same as Introduction
  const COL1_WIDTH = "w-[200px]";
  const COL2_WIDTH = "w-[650px]";
  
  // Gaps between columns
  const GAP_COL1_COL2 = "gap-[100px]";

  // Build criteria data from constants
  const criteriaData = [
    {
      code: "S01",
      name: SCORE_LABELS.S01,
      weight: `${DEFAULT_WEIGHTS.S01}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "How frequently the machine experiences failures. A score of 10 reflects near-zero breakdowns and proven performance in commercial settings; a 5 indicates inconsistent reliability and budget-grade components. Evaluated through comparison and scoring."
    },
    {
      code: "S02",
      name: SCORE_LABELS.S02,
      weight: `${DEFAULT_WEIGHTS.S02}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "A 10 reflects intuitive controls, clear labeling, ergonomic adjustments, and no learning curve. A 5 reflects a complex interface, unclear controls, and awkward ergonomics. Scoring is weighted toward ease of use for older adults. Evaluated through comparison and scoring."
    },
    {
      code: "S03",
      name: SCORE_LABELS.S03,
      weight: `${DEFAULT_WEIGHTS.S03}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "An assessment of the vendor's overall quality, reputation, and standing in the commercial fitness industry. A 10 reflects a top-tier vendor with excellent track record; a 5 reflects a vendor with mixed reputation or limited commercial presence. Evaluated through comparison and scoring."
    },
    {
      code: "S04",
      name: SCORE_LABELS.S04,
      weight: `${DEFAULT_WEIGHTS.S04}%`,
      equipment: "All",
      type: "Quantitative",
      explanation: "Lowest price receives a 10; all other models score as a factor of the lowest price."
    },
    {
      code: "S05",
      name: SCORE_LABELS.S05,
      weight: `${DEFAULT_WEIGHTS.S05}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "How visually appealing the machine is, especially in a small gym. A 10 reflects a luxury-studio appearance with sleek lines and high-quality finishes; a 5 reflects a home-gym look with mismatched styling and visible compromises. Evaluated through comparison and scoring."
    },
    {
      code: "S06",
      name: SCORE_LABELS.S06,
      weight: `${DEFAULT_WEIGHTS.S06}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "A 10 reflects elite commercial construction, excellent materials, and tight engineering tolerances; a 5 reflects adequate build quality using mixed materials and looser tolerances. Evaluated through comparison and scoring."
    },
    {
      code: "S07",
      name: SCORE_LABELS.S07,
      weight: `${DEFAULT_WEIGHTS.S07}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "How the machine holds up under long-term, heavy use. A 10 indicates world-class commercial durability with heavy-gauge materials; a 5 indicates consumer-grade construction or unproven durability. Evaluated through comparison and scoring."
    },
    {
      code: "S08",
      name: SCORE_LABELS.S08,
      weight: `${DEFAULT_WEIGHTS.S08}%`,
      equipment: "All",
      type: "Qualitative",
      explanation: "How quickly and reliably the machine can be serviced. A 10 reflects a large U.S. service network, local certified technicians, rapid parts shipping, long-term product support, and a dedicated commercial support line. A 5 reflects limited service options and slower repairs. Machines scoring below 5 fall into value brands not included in this review. Evaluated through comparison and scoring."
    },
    {
      code: "S09",
      name: SCORE_LABELS.S09,
      weight: `${DEFAULT_WEIGHTS.S09}%`,
      equipment: "All",
      type: "Quantitative",
      explanation: "Scores reflect frame, parts, and labor coverage. Frame warranties were capped at seven years to avoid skewing lifetime warranties. Because all brands evaluated are top-tier, parts and labor coverage were weighted more heavily (40% each), and frame coverage weighted at 20%."
    },
    {
      code: "S10",
      name: SCORE_LABELS.S10,
      weight: `${DEFAULT_WEIGHTS.S10}%`,
      equipment: "All",
      type: "Quantitative",
      explanation: "Measured in square inches. The smallest footprint receives a 10; all others score proportionally."
    },
    {
      code: "S11",
      name: SCORE_LABELS.S11,
      weight: `${DEFAULT_WEIGHTS.S11}%`,
      equipment: "All",
      type: "Quantitative",
      explanation: "Based on equipment weight. The heaviest machine receives a 10; all others score as a factor of that weight."
    },
    {
      code: "S12",
      name: SCORE_LABELS.S12,
      weight: "100%",
      equipment: "All",
      type: "Calculated",
      explanation: "Weighted average of all individual criteria scores."
    },
  ];

  return (
    <div className="w-full pl-[60px] mb-[100px] py-[20px]">
      {/* Main layout: 2 columns (no images column for Criteria) */}
      <div className="flex">
        
        {/* LEFT + CENTER: Col 1 (headings) + Col 2 (content) */}
        <div className="flex flex-col gap-[40px]">
          
         {/* Page intro - spans full width */}
        <div className={`text-[18px] leading-[1.9] text-slate-700 italic font-lexend text-left mb-[40px]`}
              style={{ width: '950px' }}>
          Each piece of equipment was evaluated against 11 criteria. Below is a detailed 
          explanation of each criterion, including how scores were calculated for quantitative 
          measures and assigned for qualitative assessments.
        </div>

          {/* Criteria sections */}
          {criteriaData.map((criteria, index) => (
            <div key={index} className={`flex ${GAP_COL1_COL2}`}>
              {/* Col 1: Code and Name */}
              <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
                <span className="font-lexend italic text-[#b300de] text-[18px] mt-[5px] leading-tight text-right">
                  {criteria.code} - {criteria.name}
                </span>
              </div>
              
              {/* Col 2: Details */}
              <div className={`${COL2_WIDTH} text-[16px] leading-[1.8] text-slate-700 font-lexend text-left`}>
                <div className="flex gap-[40px] mb-[20px] text-[14px]">
                  <span className="text-slate-500">
                    Weight:  <span className="font-bold ml-[12px]">{criteria.weight}</span>
                  </span>
                  <span className="text-slate-500">
                    <span style={{fontFamily: 'Lexend' }}>Type:</span>
                  </span>
                  <span className={`font-semibold ml-[-20px] ${
                    criteria.type === 'Quantitative' ? 'text-[#7f4fbd]' : 
                    criteria.type === 'Calculated' ? 'text-[#059669]' : 
                    'text-[#af1285]'
                  }`}>
                    {criteria.type}
                  </span>
                </div>
                {/* Explanation */}
                <p>{criteria.explanation}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}