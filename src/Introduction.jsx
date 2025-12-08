import React from "react";
import dualPulleyImg from "./assets/E01V01-dual_pulley_life_fitness.png";
import legExtImg from "./assets/E02V03-leg_ext_curl_matrix.png";
import treadmillImg from "./assets/E03V04-treadmill_technogym.png";
import ellipticalImg from "./assets/E04V03-elliptical_matrix.png";
import bikeImg from "./assets/E05V05-recumbent_bike_top_fitness.png";
import rowerImg from "./assets/E06V03-rower_concept2.png";
import benchImg from "./assets/E07V04-bench_technogym.png";

export default function Introduction() {
  // Column widths
  const COL1_WIDTH = "w-[200px]";
  const COL2_WIDTH = "w-[650px]";
  const COL3_WIDTH = "w-[200px]";
  
  // Gaps between columns
  const GAP_COL1_COL2 = "gap-[100px]";
  const GAP_COL2_COL3 = "gap-[100px]";

  // Images array for the column
  const images = [
    { src: dualPulleyImg, alt: "Dual Pulley", label: "Dual Pulley" },
    { src: legExtImg, alt: "Leg Extension/Curl", label: "Leg Ext/Curl" },
    { src: treadmillImg, alt: "Treadmill", label: "Treadmill" },
    { src: ellipticalImg, alt: "Elliptical", label: "Elliptical" },
    { src: bikeImg, alt: "Recumbent Bike", label: "Recumbent Bike" },
    { src: rowerImg, alt: "Rower", label: "Rower" },
    { src: benchImg, alt: "Bench", label: "Bench" },
  ];

  // Vendors data
  const vendorsData = [
    { vendor: "Advanced Exercise", type: "Distributor", brand: "Life Fitness" },
    { vendor: "Marathon Fitness", type: "Distributor", brand: "Precor and Xebex" },
    { vendor: "Risher Fitness", type: "Distributor", brand: "Matrix and Concept2" },
    { vendor: "Technogym", type: "Manufacturer", brand: "Technogym" },
    { vendor: "Top Fitness", type: "Retailer", brand: "True Fitness" },
  ];

  // Equipment data
  const equipmentData = [
    "Dual Pulley",
    "Leg Extension/Curl",
    "Treadmill",
    "Elliptical",
    "Recumbent Bike",
    "Rower",
    "Adjustable Bench",
  ];

  // Criteria data
  const criteriaData = [
    { code: "S01", name: "Reliability", weight: "22%" },
    { code: "S02", name: "Ease of Use", weight: "18%" },
    { code: "S03", name: "Varies", weight: "6%" },
    { break: true },
    { code: "S04", name: "Price", weight: "12%" },
    { code: "S05", name: "Aesthetics", weight: "12%" },
    { code: "S06", name: "Build Quality", weight: "8%" },
    { code: "S07", name: "Durability", weight: "8%" },
    { break: true },
    { code: "S08", name: "Svc/Parts Availability", weight: "8%" },
    { code: "S09", name: "Warranty", weight: "4%" },
    { break: true },
    { code: "S10", name: "Footprint", weight: "1%" },
    { code: "S11", name: "Weight", weight: "1%" },
    { break: true },
    { code: "S12", name: "Overall Score", weight: "100%" },
  ];

  return (
    <div className="w-full py-[20px]">
      {/* Main layout: 3 columns */}
      <div className={`flex ${GAP_COL2_COL3}`}>
        
        {/* LEFT + CENTER: Col 1 (headings) + Col 2 (paragraphs) */}
        <div className="flex flex-col gap-[30px]">
          
          {/* === SECTION 1: Vendors & Brands === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex pt-[10px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Vendors & Brands
              </span>
            </div>
            {/* Col 2: Paragraphs */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[20px] font-lexend text-left`}>
              <p className="mb-[20px]">
                I received and evaluated quotes from five vendors, which included discounts ranging 
                from 11% to 29% off the base price. Each quote covered delivery, installation, 
                removal of existing equipment, and sales tax.
              </p>
              <p className="mb-[20px]">
                To create an "All In Unit Price" for this analysis, I allocated these additional 
                costs to each piece of equipment. This "All In Unit Price" is what is displayed 
                and used throughout the analysis unless otherwise specified.
              </p>
              <p className="mb-[20px]">
                It is important to note that while the base price of equipment is static, the 
                delivery and installation costs are dependent on the total amount purchased. If 
                we do not purchase all quoted equipment, these additional costs, while lower in 
                total, will be a higher percentage of the overall bill.
              </p>
              <p className="italic text-[16px]">
                (See the "Vendor & Brand Overview" section for more detailed information.)
              </p>
            </div>
          </div>

          {/* Vendors & Associated Brands Table - centered in Col 2 */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} />
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[550px]">
                {/* Table Title */}
                <div className="text-center font-lexend italic text-[18px] mb-[10px]">
                  Vendors & Associated Brands
                </div>
                <div className="border-t-2 border-slate-700" />
                
                {/* Table Rows */}
                <div className="py-[15px]">
                  {vendorsData.map((row, index) => (
                    <div key={index} className="flex py-[8px] font-lexend text-[16px]">
                      <div className="w-[180px]">{row.vendor}</div>
                      <div className="w-[150px]">{row.type}</div>
                      <div className="flex-1">{row.brand}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-b-2 border-slate-700" />
              </div>
            </div>
          </div>

          {/* Equipment Table - centered in Col 2 */}
          <div className={`flex ${GAP_COL1_COL2} mt-[20px]`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} />
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[250px]">
                {/* Table Title */}
                <div className="text-center font-lexend italic text-[18px] mb-[10px]">
                  Equipment
                </div>
                <div className="border-t-2 border-slate-700" />
                
                {/* Table Rows */}
                <div className="py-[15px]">
                  {equipmentData.map((item, index) => (
                    <div key={index} className="py-[6px] font-lexend text-[16px]">
                      {item}
                    </div>
                  ))}
                </div>
                
                <div className="border-b-2 border-slate-700" />
              </div>
            </div>
          </div>

          {/* === SECTION 2: Evaluation Criteria === */}
          <div className={`flex ${GAP_COL1_COL2} mt-[40px]`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex pt-[10px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Evaluation Criteria
              </span>
            </div>
            {/* Col 2: Paragraphs */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[20px] font-lexend text-left`}>
              <p className="mb-[20px]">
                I established eleven criteria to evaluate each piece of equipment. These criteria 
                were a mix of quantitative factors, such as price and warranties, and qualitative 
                factors, like durability and reliability.
              </p>
              <p className="mb-[20px]">
                All research relied on publicly available online information. To ensure consistency 
                in scoring and for analysis, AI tools were extensively utilized. A score was 
                assigned for each criterion and piece of equipment.
              </p>
              <p className="mb-[20px]">
                The overall score was calculated as a weighted average, with the weights assigned 
                based on the importance of each criterion.
              </p>
              <p className="mb-[20px]">
                The same eleven criteria were applied to all equipment, with the exception of one 
                factor, labeled S03, which was related to ease of use and varied based on the 
                specific equipment.
              </p>
              <p className="italic text-[16px]">
                (Refer to the "Criteria" section for comprehensive details.)
              </p>
            </div>
          </div>

          {/* Criteria & Associated Weights Table - centered in Col 2 */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} />
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[500px]">
                {/* Table Title */}
                <div className="text-center font-lexend italic text-[18px] mb-[10px]">
                  Criteria & Associated Weights
                </div>
                <div className="border-t-2 border-slate-700" />
                
                {/* Table Rows */}
                <div className="py-[15px]">
                  {criteriaData.map((row, index) => (
                    row.break ? (
                      <div key={index} className="py-[10px]" />
                    ) : (
                      <div key={index} className="flex py-[6px] font-lexend text-[16px]">
                        <div className="w-[80px]">{row.code}</div>
                        <div className="flex-1">{row.name}</div>
                        <div className="w-[80px] text-right">{row.weight}</div>
                      </div>
                    )
                  ))}
                </div>
                
                <div className="border-b-2 border-slate-700" />
              </div>
            </div>
          </div>

          {/* === SECTION 3: Scenarios === */}
          <div className={`flex ${GAP_COL1_COL2} mt-[40px]`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex pt-[10px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Scenarios
              </span>
            </div>
            {/* Col 2: Paragraphs */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[40px] font-lexend text-left`}>
              <p className="mb-[20px]">
                This section details the fitness equipment, categorized by vendor and brand, 
                including the All In Unit Cost and a comparative score for each item.
              </p>
              <p className="mb-[20px]">
                This structure allows for flexible analysis and scenario planning, such as:
              </p>
              <ul className="mb-[20px] ml-[20px] list-disc list-outside">
                <li className="mb-[8px]">Selecting equipment based on factors like the highest score, lowest price, or optimal reliability.</li>
                <li className="mb-[8px]">Calculating the total cost for specific equipment subsets or when limiting choices to certain vendors.</li>
                <li className="mb-[8px]">Evaluating how custom weighting of criteria affects the overall equipment scores.</li>
              </ul>
              <p className="mb-[20px]">
                Further analysis is available in related reports. The Equipment Comparison report 
                provides a radar chart showing overall vendor scores, individual criteria scores, 
                and a final recommendation for each piece of equipment. The Equipment Detail report 
                offers comprehensive information on a particular machine, including links to the 
                manufacturer's website.
              </p>
            </div>
          </div>

        </div>

        {/* Col 3: Images - single column, centered, evenly spaced */}
        <div className={`${COL3_WIDTH} flex-shrink-0 flex flex-col items-center gap-[40px] pt-[40px]`}>
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center text-[10px] text-slate-600">
              <img
                src={image.src}
                alt={image.alt}
                className="h-[180px] w-auto object-contain"
              />
              <span className="mt-[4px] font-serif italic">{image.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}