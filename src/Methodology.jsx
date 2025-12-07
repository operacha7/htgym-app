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
  const GAP_COL1_COL2 = "gap-[100px]";  // Adjust this for gap between heading and paragraph
  const GAP_COL2_COL3 = "gap-[100px]";  // Adjust this for gap between paragraph and images

  return (
    <div className="w-full py-[20px]">
      {/* Main layout: 3 columns */}
      <div className={`flex ${GAP_COL2_COL3}`}>
        
        {/* LEFT + CENTER: Col 1 (headings) + Col 2 (paragraphs) */}
        <div className="flex flex-col gap-[30px]">
          
          {/* === SECTION 1: Price Quotes === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            {/* Col 1: Heading - right aligned, vertically centered */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex pt-[10px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Procurement & Quotes
              </span>
            </div>
            {/* Col 2: Paragraph - centered */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[40px] font-LEXEND text-left`}>
              I obtained five price quotes for seven pieces of equipment from four distributors
              and one manufacturer. All quotes were comprehensive, covering the total cost of delivery, 
              full installation, and hauling-away existing equipment.  Details on vendors and 
              brands can be found in the Vendor & Brand Overview section.
            </div>
          </div>

          {/* Equipment List - in Col 2 area, centered */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} /> {/* Empty Col 1 */}
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[250px]">
                <div className="border-t border-slate-400" />
                <div className="text-center font-lexend italic text-[18px] pt-[20px]">
                  Equipment
                </div>
                <ol className="list-decimal list-inside space-y-[4px] text-left font-lexend italic text-[18px] pb-[10px]">
                  <li>Dual Pulley</li>
                  <li>Leg Extension/Curl</li>
                  <li>Treadmill</li>
                  <li>Elliptical</li>
                  <li>Recumbent Bike</li>
                  <li>Rower</li>
                  <li>Adjustable Bench</li>
                </ol>
                <div className="border-b border-slate-400" />
              </div>
            </div>
          </div>

          {/* === SECTION 2: Research === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex mt-[50px] justify-end`}>
              <span className="font-lexend italic italic text-[#00bfde] text-[20px] leading-tight text-right">
                Research Methodalogy
              </span>
            </div>
            {/* Col 2: Paragraph */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pt-[40px] pb-[40px] font-lexend text-left`}>
              Research covered each piece of equipment, its vendor, and its manufacturer. Data collected 
              included quantitative metrics (dimensions, weight, warranties, etc.) and qualitative information 
              (build quality, reliability). AI tools were heavily used to analyze this data and ensure 
              consistent evaluation and scoring, particularly for qualitative criteria. However, I reserved 
              the final right to adjust scores based on my professional judgment and research findings.
            </div>
          </div>

          {/* === SECTION 3: Criteria === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex mt-[10px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Evaluation Criteria & Scoring
              </span>
            </div>
            {/* Col 2: Paragraph */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[40px] font-lexend text-left`}>
              A total of 11 criteria were used to evaluate each piece of equipment, with each 
              criterion scored on a scale of 1 to 10. Ten criteria were consistently applied a
              cross all machines (e.g., Durability).
              <p>The 11th criterion (S03) was specialized for each equipment type, reflecting 
              unique functional requirements.  For the Strength equipment this was Stack Weight, 
              for Treadmill & Elliptical it was Step Up Height, for Recumbent Bike, Step Thru Access, 
              for Rower, Accessibility (primarily seat height) and for the Bench it was Mobility 
              (ease of movement).</p>
            </div>
          </div>

          {/* Criteria List - in Col 2 area, centered */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} /> {/* Empty Col 1 */}
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[460px]">
                <div className="border-t border-slate-400" />
                <div className="text-center font-lexend italic text-[18px] text-slate-700 pt-[20px]">
                  Criteria
                </div>
                <ol className="list-decimal list-inside space-y-[4px] text-left font-lexend italic text-[18px] pb-[0px]">
                  <li>Reliability  (S01)</li>
                  <li>Ease of Use  (S02)</li>
                  <li>Varies depending on equipment  (S03)</li>
                  <li>Price  (S04)</li>
                  <li>Aesthetics  (S05)</li>
                  <li>Build Quality  (S06)</li>
                  <li>Durability  (S07)</li>
                  <li>Svc/Parts Availability  (S08)</li>
                  <li>Warranty  (S09)</li>
                  <li>Footprint  (S10)</li>
                  <li>Weight  (S11)</li>
                </ol>
                <div className="border-b border-slate-400" />
              </div>
            </div>
          </div>


                    {/* === SECTION 4: Weight === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            {/* Col 1: Heading */}
            <div className={`${COL1_WIDTH} flex-shrink-0 flex mt-[50px] justify-end`}>
              <span className="font-lexend italic text-[#00bfde] text-[20px] leading-tight text-right">
                Criteria Weighting & Importance
              </span>
            </div>
            {/* Col 2: Paragraph */}
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.6] text-slate-700 pb-[40px] font-lexend pt-[40px] text-left`}>
              Not all criteria were weighted equally. The table below illustrates the assigned 
              rank and percentage weight for each factor.  For a detailed explanation of each criterion, 
              including how quantitative scores were calculated and qualitative scores were assigned, 
              please click the Criteria button.
            </div>
          </div>

{/* Criteria Weighting List - in Col 2 area, centered */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0`} /> {/* Empty Col 1 */}
            <div className={`${COL2_WIDTH} flex justify-center`}>
              <div className="w-[420px]">
                <div className="border-t border-slate-400" />
                
                {/* Group 1: S01, S02, S03 */}
                <div className="flex py-[2px] mt-[20px]">
                  <div className="flex-1 font-lexend italic text-[18px] pt-[10px]">
                    <div>S01 - Reliability</div>
                  </div>
                  <span className="font-lexend italic text-[18px] pt-[10px]">22%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S02 - Ease of Use</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">18%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S03 - Varies</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">6%</span>
                </div>

                {/* Line break */}
                <div className="py-[15px]"></div>

                {/* Group 2: S04, S05, S06, S07 */}
                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S04 - Price</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">12%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S05 - Aesthetics</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">12%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S06 - Build Quality</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">8%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S07 - Durability</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">8%</span>
                </div>

                {/* Line break */}
                <div className="py-[15px]"></div>

                {/* Group 3: S08, S09 */}
                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S08 - Svc/Parts Availability</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">8%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S09 - Warranty</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">4%</span>
                </div>

                {/* Line break */}
                <div className="py-[15px]"></div>

                {/* Group 4: S10, S11 */}
                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S10 - Footprint</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">1%</span>
                </div>

                <div className="flex py-[2px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>S11 - Weight</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">1%</span>
                </div>

                {/* Line break before Overall */}
                <div className="py-[10px]"></div>

                {/* Overall Score */}
                <div className="flex py-[15px]">
                  <div className="flex-1 font-lexend italic text-[18px]">
                    <div>Overall Score</div>
                  </div>
                  <span className="font-lexend italic text-[18px]">100%</span>
                </div>

                <div className="border-b border-slate-400 mb-[100px]" />
              </div>
            </div>
          </div>

        </div>

        {/* Col 3: Images - staggered with different left padding */}
        <div className={`${COL3_WIDTH} flex-shrink-0 flex flex-col gap-[20px] pt-[40px]`}>
          {/* Image 1 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pl-[100px]">
            <img
              src={dualPulleyImg}
              alt="Dual Pulley"
              className="h-[220px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Dual Pulley</span>
          </div>

          {/* Image 2 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pl-[200px]">
            <img
              src={legExtImg}
              alt="Leg Extension/Curl"
              className="h-[200px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Leg Ext/Curl</span>
          </div>

           {/* Image 3 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pt-[70px] pl-[100px]">
            <img
              src={treadmillImg}
              alt="Treadmill"
              className="h-[180px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Treadmill</span>
          </div>
          {/* Image 4 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pt-[50px] pl-[200px]">
            <img
              src={ellipticalImg}
              alt="Elliptical"
              className="h-[200px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Elliptical</span>
          </div>
          {/* Image 5 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pt-[70px] pl-[100px]">
            <img
              src={bikeImg}
              alt="Recumbent Bike"
              className="h-[250px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Recumbent Bike</span>
          </div>
          {/* Image 6 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pt-[50px] pl-[200px]">
            <img
              src={rowerImg}
              alt="Rower"
              className="h-[200px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Rower</span>
          </div>
          {/* Image 7 */}
          <div className="flex flex-col items-start text-[10px] text-slate-600 pt-[90px] pl-[100px]">
            <img
              src={benchImg}
              alt="Bench"
              className="h-[240px] w-auto object-contain"
            />
            <span className="mt-[4px] font-serif italic">Bench</span>
          </div>
        </div>
      </div>
    </div>
  );
}