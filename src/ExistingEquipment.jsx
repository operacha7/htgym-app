import React from "react";

// Import all existing equipment images dynamically
const imageModules = import.meta.glob("./assets/Exist-*.jpeg", { eager: true });

// Get all existing equipment images as an array
const existingImages = Object.entries(imageModules).map(([path, module]) => ({
  path,
  src: module.default,
  // Extract filename for alt text
  name: path.split("/").pop().replace("Exist-", "").replace(".jpeg", "").replace(/_/g, " "),
}));

export default function ExistingEquipment() {
  // Adjustable widths
  const TEXT_COLUMN_WIDTH = "650px";
  const IMAGE_WIDTH = "360px";  // Width of each image
  const IMAGE_GAP = "40px";     // Gap between images
  const COLUMN_GAP = "180px";    // Gap between text and images

  return (
    <div className="w-full pt-[20px] pb-[100px] pl-[60px]">
      {/* Main layout: 2 columns - text and images */}
      <div style={{ display: "flex", gap: COLUMN_GAP }}>
        
        {/* Left column: Text content */}
        <div style={{ width: TEXT_COLUMN_WIDTH, flexShrink: 0 }}>
          <div className="flex flex-col gap-[30px]">
            {/* Paragraph 1 */}
            <p className="text-[18px] leading-[1.8] text-slate-700 font-lexend text-left">
              The existing strength equipment was made by Quantum, a company that is
              no longer in business. Our treadmills, ellipticals, and upright bike are
              Precor models purchased pre-owned from Marathon Fitness. The
              recumbent bike is by True, and the rower is a Concept2. All vendors stated
              that our current equipment has no resale value; all offered to haul it away
              at no cost except Top Fitness, which would charge a fee.
            </p>

            {/* Paragraph 2 */}
            <p className="text-[18px] leading-[1.8] text-slate-700 font-lexend text-left">
              I also contacted a used-equipment broker, who confirmed that our
              equipment holds no value and declined to purchase it. While we could try
              selling it online, any proceeds would likely be minimal given the volume of
              used equipment on the market.
            </p>

            {/* Paragraph 3 */}
            <p className="text-[18px] leading-[1.8] text-slate-700 font-lexend text-left">
              I visited the fire station on Alabama Street to see if they might want
              donated equipment. They were very interested—even enthusiastic. Much of
              their cardio equipment is broken, and our strength pieces are clearly
              better than what they have. I told them I would send photos and arrange
              a tour once we know what, if anything, we are replacing. Marathon said
              they could deliver the equipment for a fee; I expect the other vendors
              would do the same due to the station's proximity. If we cannot get the fee
              waived for a good cause, Kay and I will cover it. Although the firefighters
              could likely pick it up themselves, it is better for insurance purposes to
              have the vendor handle the move.
            </p>
          </div>
        </div>

        {/* Right column: Images in 2 columns x 4 rows */}
        <div style={{ flexShrink: 0 }}>
          <div 
            style={{ 
              display: "grid",
              gridTemplateColumns: `${IMAGE_WIDTH} ${IMAGE_WIDTH}`,
              gap: IMAGE_GAP,
            }}
          >
            {existingImages.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
                style={{
                  width: IMAGE_WIDTH,
                  backgroundColor: "#E5E5E5",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}