import React from "react";

export default function Criteria() {
  // Column widths - same as Introduction
  const COL1_WIDTH = "w-[200px]";
  const COL2_WIDTH = "w-[650px]";
  const COL3_WIDTH = "w-[200px]";
  
  // Gaps between columns
  const GAP_COL1_COL2 = "gap-[100px]";
  const GAP_COL2_COL3 = "gap-[100px]";

  const criteriaData = [
    {
      code: "S01",
      name: "Reliability",
      weight: "22%",
      equipment: "All",
      type: "Qualitative",
      explanation: "How frequently the machine experiences failures. A score of 10 reflects near-zero breakdowns and proven performance in commercial settings; a 5 indicates inconsistent reliability and budget-grade components. Evaluated through comparison and scoring."
    },
    {
      code: "S02",
      name: "Ease of Use",
      weight: "18%",
      equipment: "All",
      type: "Qualitative",
      explanation: "A 10 reflects intuitive controls, clear labeling, ergonomic adjustments, and no learning curve. A 5 reflects a complex interface, unclear controls, and awkward ergonomics. Scoring is weighted toward ease of use for older adults. Evaluated through comparison and scoring."
    },
    {
      code: "S03",
      name: "Stack Weight",
      weight: "6%",
      equipment: "Dual Pulley, Leg Ext/Curl",
      type: "Quantitative",
      explanation: "For applicable machines, scores are based on stack weight. The highest weight receives a 10; all others score proportionally."
    },
    {
      code: "S03",
      name: "Step Up Height",
      weight: "6%",
      equipment: "Elliptical, Treadmill",
      type: "Quantitative",
      explanation: "Scores are based on step-up height. The lowest height receives a 10; all other machines score as a factor of that height."
    },
    {
      code: "S03",
      name: "Step Thru Access",
      weight: "6%",
      equipment: "Recumbent Bike",
      type: "Qualitative",
      explanation: "How easy it is to get on and off the Recumbent Bike. Evaluated through comparison and scoring."
    },
    {
      code: "S03",
      name: "Accessibility",
      weight: "6%",
      equipment: "Rower",
      type: "Qualitative",
      explanation: "Based on seat height. A qualitative score was required because Technogym lists a user-height range instead of a seat-height dimension. Evaluated through comparison and scoring."
    },
    {
      code: "S03",
      name: "Mobility",
      weight: "6%",
      equipment: "Bench",
      type: "Qualitative",
      explanation: "Ease of moving the bench, including weight, handle design, and wheel quality. Evaluated through comparison and scoring."
    },
    {
      code: "S04",
      name: "Price",
      weight: "12%",
      equipment: "All",
      type: "Quantitative",
      explanation: "Lowest price receives a 10; all other models score as a factor of the lowest price."
    },
    {
      code: "S05",
      name: "Aesthetics",
      weight: "12%",
      equipment: "All",
      type: "Qualitative",
      explanation: "How visually appealing the machine is, especially in a small gym. A 10 reflects a luxury-studio appearance with sleek lines and high-quality finishes; a 5 reflects a home-gym look with mismatched styling and visible compromises. Evaluated through comparison and scoring."
    },
    {
      code: "S06",
      name: "Build Quality",
      weight: "8%",
      equipment: "All",
      type: "Qualitative",
      explanation: "A 10 reflects elite commercial construction, excellent materials, and tight engineering tolerances; a 5 reflects adequate build quality using mixed materials and looser tolerances. Evaluated through comparison and scoring."
    },
    {
      code: "S07",
      name: "Durability",
      weight: "8%",
      equipment: "All",
      type: "Qualitative",
      explanation: "How the machine holds up under long-term, heavy use. A 10 indicates world-class commercial durability with heavy-gauge materials; a 5 indicates consumer-grade construction or unproven durability. Evaluated through comparison and scoring."
    },
    {
      code: "S08",
      name: "Svc/Parts Availability",
      weight: "8%",
      equipment: "All",
      type: "Qualitative",
      explanation: "How quickly and reliably the machine can be serviced. A 10 reflects a large U.S. service network, local certified technicians, rapid parts shipping, long-term product support, and a dedicated commercial support line. A 5 reflects limited service options and slower repairs. Machines scoring below 5 fall into value brands not included in this review. Evaluated through comparison and scoring."
    },
    {
      code: "S09",
      name: "Warranty",
      weight: "4%",
      equipment: "All",
      type: "Quantitative",
      explanation: "FScores reflect frame, parts, and labor coverage. Frame warranties were capped at seven years to avoid skewing lifetime warranties. Because all brands evaluated are top-tier, parts and labor coverage were weighted more heavily (40% each), and frame coverage weighted at 20%."
    },
    {
      code: "S10",
      name: "Footprint",
      weight: "1%",
      equipment: "All",
      type: "Quantitative",
      explanation: "Measured in square inches. The smallest footprint receives a 10; all others score proportionally."
    },
    {
      code: "S11",
      name: "Weight",
      weight: "1%",
      equipment: "All",
      type: "Quantitative",
      explanation: "Based on equipment weight. The heaviest machine receives a 10; all others score as a factor of that weight."
    },
    {
      code: "S12",
      name: "Overall Score",
      weight: "100%",
      equipment: "All",
      type: "Qualitative",
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
                <span className="font-lexend italic text-[#00bfde] text-[18px] leading-tight text-right">
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
                  <span className={`font-semibold ml-[-20px] ${criteria.type === 'Quantitative' ? 'text-[#7f4fbd]' : 'text-[#af1285]'}`}>
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