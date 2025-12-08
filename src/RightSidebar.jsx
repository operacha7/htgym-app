import { useEffect, useRef } from 'react';

const RightSidebar = ({ isOpen, onClose }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest('.what-if-button') // Don't close when clicking the What-If button
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <aside
      ref={containerRef}
      className={`
        bg-[#4C5270]
        h-full
        transition-all
        duration-200
        flex
        ${isOpen ? 'w-[320px]' : 'w-[60px]'}
      `}
    >
      
  
      <div className="w-[80px] flex flex-col mt-[15px]">
            {/*}
        <button
          type="button"
          onClick={onClose}
          className="
            ml-auto
            w-[40px]
            h-[40px]
            bg-[#ECE8E8]
            shadow-button-ht
            rounded-tl-[8px]
            rounded-bl-[8px]
            flex
            items-center
            justify-center
            hover:scale-[1.1]
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <span className="text-black text-[25px]">
            {isOpen ? '»»' : '««'}
          </span>
        </button>
              */}
      </div>


      {isOpen && (
        <div className="flex-1 p-4 text-sm mt-[120px] ml-[-55px] mr-[20px] text-[#00bfde] italic">
          <h2 className="font-lexend mb-2"></h2>
          <p className="text-xs opacity-40">
            Run from what's profitable and comfortable.
          </p>
          <p className="opacity-50">Forget safety.</p>
          <p className="opacity-60">Live where you fear to live.</p>  
          <p className="opacity-70">Destroy your reputation.</p>
          <p className="opacity-80">Be notorious.</p>
          <p className="opacity-90">I have tried prudent planning long enough.</p>
          <p>From now on, I'll be mad.</p>
          <p className="opacity-30 text-right pt-[20px]">- Jalal al-Din Mohammed al-Balkhi</p>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;