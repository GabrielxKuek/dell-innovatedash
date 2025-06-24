// src/components/phoneComponents/Border.jsx - FIXED: Responsive phone frame
const Border = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0`}>
      {/* Border Frame - FIXED: responsive sizing */}
      <div className="relative bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-1 md:p-2 shadow-2xl w-full max-w-sm mx-auto">
        {/* Screen Container - FIXED: proper aspect ratio and overflow */}
        <div className="relative bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
          {/* Top Notch - FIXED: responsive sizing */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black rounded-b-lg md:rounded-b-2xl px-4 md:px-6 py-0.5 md:py-1">
              <div className="w-10 md:w-14 h-0.5 md:h-1 bg-gray-800 rounded-full mx-auto"></div>
            </div>
          </div>
          
          {/* Screen Content Area - FIXED: responsive dimensions and proper overflow */}
          <div className="relative bg-white w-full overflow-hidden" style={{ aspectRatio: '9/16', minHeight: '500px', maxHeight: '640px' }}>
            {/* Content container with proper scroll handling */}
            <div className="h-full w-full overflow-y-auto overflow-x-hidden">
              <div className="pt-6 pb-8 px-1">
                {children}
              </div>
            </div>
          </div>
          
          {/* Home Indicator - FIXED: responsive sizing */}
          <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-20 md:w-32 h-0.5 md:h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        
        {/* Side Buttons - FIXED: responsive positioning and sizing */}
        {/* Volume Buttons */}
        <div className="absolute left-0 top-16 md:top-20 w-0.5 md:w-1 h-8 md:h-12 bg-gray-700 rounded-r-sm md:rounded-r-md"></div>
        <div className="absolute left-0 top-28 md:top-36 w-0.5 md:w-1 h-6 md:h-8 bg-gray-700 rounded-r-sm md:rounded-r-md"></div>
        <div className="absolute left-0 top-36 md:top-48 w-0.5 md:w-1 h-6 md:h-8 bg-gray-700 rounded-r-sm md:rounded-r-md"></div>
        
        {/* Power Button */}
        <div className="absolute right-0 top-24 md:top-32 w-0.5 md:w-1 h-10 md:h-16 bg-gray-700 rounded-l-sm md:rounded-l-md"></div>
      </div>
    </div>
  );
};

export default Border;