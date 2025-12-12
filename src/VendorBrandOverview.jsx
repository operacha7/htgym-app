import React from "react";

export default function VendorBrandOverview() {
  // Column widths - same as other pages
  const COL1_WIDTH = "w-[200px]";
  const COL2_WIDTH = "w-[750px]";
  
  // Gaps between columns
  const GAP_COL1_COL2 = "gap-[100px]";

  return (
    <div className="w-full pt-[20px] pb-[100px] pl-[40px]">
      {/* Main layout */}
      <div className="flex">
        
        {/* LEFT + CENTER: Col 1 (headings) + Col 2 (content) */}
        <div className="flex flex-col gap-[40px]">
          
         {/* Page intro - spans full width */}
<div className="text-[18px] leading-[1.9] text-slate-700 italic font-lexend text-left mb-[10px]"
     style={{ width: '950px' }}>
  This document summarizes the key manufacturers and dealers under consideration 
  for the condo gym project, including background, financial scale, product 
  reputation, and local presence.
</div>

          {/* === Advanced Exercise === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Advanced Exercise
                <br />
                <span className="text-[14px] text-slate-500">(Dealer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Advanced Exercise was founded in 1986 and is based in Littleton, Colorado. Its 
                estimated annual revenue is $22.9 million. The company represents over 60 
                manufacturers and has been a top dealer for Life Fitness for nearly 30 years. 
                Advanced Exercise self-identifies as specializing in the multi-unit housing sector, 
                which aligns directly with the needs of condominium and apartment-community gyms.
              </p>
              <p>
                Advanced Exercise submitted a quote for Life Fitness equipment. Although the company 
                has Sales/Design Consultants in Houston, it does not operate a local showroom.
              </p>
            </div>
          </div>

          {/* === Life Fitness === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Life Fitness
                <br />
                <span className="text-[14px] text-slate-500">(Manufacturer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Life Fitness was founded in 1968 and is headquartered in Illinois. It is a major, 
                privately held brand with a long-standing reputation as the industry standard for 
                high-quality, reliable, durable commercial fitness equipment.
              </p>
              <p>
                In 2019, Life Fitness was acquired by KPS Capital Partners, a private equity firm. 
                Since the acquisition, some customer reviews on the consumer/retail side have indicated 
                slower response times for warranty and service issues. Notably, these concerns have not 
                appeared at the same scale on the commercial side of the business, which remains strong.  
                It should be noted that, generally, residential gym equipment generates much more complaints 
                than commercial ones.

              </p>
            </div>
          </div>

          {/* === Marathon Fitness === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Marathon Fitness
                <br />
                <span className="text-[14px] text-slate-500">(Dealer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Marathon Fitness was founded in 2003 and is based in Stafford, Texas. It is the 
                exclusive distributor for Precor commercial products in the Houston area and 
                represents over 1,000 products. Annual revenue is estimated at $15.6 million.
              </p>
              <p>
                Marathon has a strong B2B reputation with large commercial clients such as Shell, 
                Conoco, Dell, Apple, and several major multi-unit housing providers. They have a 
                showroom in Stafford where equipment can be viewed and tested.
              </p>
            </div>
          </div>

          {/* === Precor === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Precor
                <br />
                <span className="text-[14px] text-slate-500">(Manufacturer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Precor was founded in 1980 and was acquired by Peloton in 2021. Precor's annual 
                revenue is estimated between $250 million and $500 million. The brand is known for 
                performance-driven equipment, with emphasis on ergonomics, natural movement, 
                biomechanics, and user comfort.
              </p>
              <p>
                Precor does not manufacture a rower. Marathon Fitness quoted a Xebex rower, which 
                is produced by a China-based company specializing in air rowers and air bikes. 
                Xebex is recognized as a value brand.  Its estimated annual revenue ranges from $1 million 
                to $2.5 million.
              </p>
            </div>
          </div>

          {/* === The Risher Companies === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Risher Companies
                <br />
                <span className="text-[14px] text-slate-500">(Dealer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                The Risher Companies was founded in 1994, and Risher Fitness Equipment was established 
                in 2000. The firm is based in Houston, Texas and has annual revenue of under $5 million. 
                Risher is an authorized dealer for Matrix Fitness and over 20 other brands.
              </p>
              <p>
                NRisher and Matrix do not seem to have a showroom in Houston. Risher's official business 
                address points to a location that looks like an apartment or townhome complex, which suggests 
                the company is a smaller operation with a limited physical retail presence.
              </p>
            </div>
          </div>

          {/* === Matrix Fitness === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Matrix Fitness
                <br />
                <span className="text-[14px] text-slate-500">(Manufacturer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Matrix is owned by Johnson Health Tech, a global fitness company headquartered in Taiwan. 
                U.S. operations are centered in Wisconsin.  The Matrix equipment being considered is 
                manufactured in Asia.
              </p>
              <p className="mb-4">
                Johnson Health Tech has estimated revenue of $1.66 billion, with Matrix generating 
                approximately $620 million in 2019.
              </p>
              <p>
                Matrix does not manufacture a rower, and Risher quoted a Concept2 rower. Concept2, based 
                in Vermont, is widely regarded as the global standard for air-resistance cardio equipment 
                (rowers, ski trainers, and bikes). Concept2's estimated annual revenue is ~$46 million.
              </p>
            </div>
          </div>

          {/* === Technogym === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Technogym
                <br />
                <span className="text-[14px] text-slate-500">(Manufacturer – Direct)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p>
                Technogym is a direct manufacturer founded in 1983 in Cesena, Italy. Its U.S. headquarters 
                are in New Jersey. The company's annual revenue is estimated at approximately $1 billion. 
                Technogym is recognized for luxury, high-end design, cutting-edge technology, and global 
                partnerships with elite athletes and sports organizations. Although Technogym equipment 
                is present in some Houston facilities, the company does not have a local Houston showroom.
              </p>
            </div>
          </div>

          {/* === Top Fitness === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                Top Fitness
                <br />
                <span className="text-[14px] text-slate-500">(Dealer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                Top Fitness began operations in 1991, originating in the Chicago area, and has since 
                expanded to over a dozen stores in seven states. The parent entity appears to be Chicago 
                Fitness Partners, LLC, with corporate registrations pointing to Irving, Texas as the 
                current administrative headquarters.
              </p>
              <p>
                Top Fitness is privately held, with self-reported revenue historically in the $5–10 million 
                annual range. There are two Houston-area stores—West University (Kirby location) and The 
                Woodlands—and both appear to be corporate-owned, not franchised. While Top Fitness is 
                commercially capable, its core business emphasis leans toward home-gym and retail customers. 
                They use contracted service providers, not in-house technicians, which may influence 
                service-level consistency.
              </p>
            </div>
          </div>

          {/* === TRUE Fitness === */}
          <div className={`flex ${GAP_COL1_COL2}`}>
            <div className={`${COL1_WIDTH} flex-shrink-0 flex items-start justify-end`}>
              <span className="font-lexend italic text-[#b300de] mt-[25px] text-[18px] leading-tight text-right">
                TRUE Fitness
                <br />
                <span className="text-[14px] text-slate-500">(Manufacturer)</span>
              </span>
            </div>
            <div className={`${COL2_WIDTH} text-[18px] leading-[1.8] text-slate-700 font-lexend text-left`}>
              <p className="mb-4">
                TRUE Fitness was founded in 1981 as a treadmill manufacturer and has since expanded into 
                a full line of commercial-grade cardio and strength equipment. TRUE highlights decades of 
                experience serving commercial gyms, universities, YMCAs, health clubs, corporate wellness 
                centers, and other institutional facilities. The company is headquartered in St. Louis 
                (O'Fallon), Missouri and remains privately owned.
              </p>
              <p>
                Revenue estimates vary by source: Buzzfile estimates $43.4 million, while broader industry 
                estimates suggest $50–100 million. TRUE expanded in 2020 by acquiring Octane Fitness, 
                a maker of ellipticals and home-cardio equipment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}