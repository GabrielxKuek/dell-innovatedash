const Border = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Border Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        {/* Screen Container */}
        <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black rounded-b-2xl px-6 py-1">
              <div className="w-14 h-1 bg-gray-800 rounded-full mx-auto"></div>
            </div>
          </div>
          
          {/* Screen Content Area */}
          <div className="relative bg-white h-[640px] w-[320px] overflow-hidden">
            {/* Content goes here */}
            <div className="h-full w-full overflow-hidden">
              {children}
            </div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        
        {/* Side Buttons */}
        <div className="absolute left-0 top-20 w-1 h-12 bg-gray-700 rounded-r-md"></div>
        <div className="absolute left-0 top-36 w-1 h-8 bg-gray-700 rounded-r-md"></div>
        <div className="absolute left-0 top-48 w-1 h-8 bg-gray-700 rounded-r-md"></div>
        <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-l-md"></div>
      </div>
    </div>
  );
};

export default Border;