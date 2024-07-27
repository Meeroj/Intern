import React, { useState } from "react";

interface FilterProps {
  onFilter: (filters: { priceRange: number[] }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleFilter = () => {
    onFilter({ priceRange });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = +e.target.value;
    setPriceRange(newPriceRange as [number, number]);
  };

  return (
    <div className="filter-component p-2 border border-opacity-25 border-amber-300 shadow-2xl rounded-lg w-[5vw] absolute left-5 hidden xl:block ">
      <div className="mb-4">
        <label className="block font-bold mb-2">Filter:</label>
        <div className="flex items-center space-y-2">
          <div className="flex flex-col items-center space-y-2 w-full">
            <input
              type="range"
              className="w-full h-32"
              style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
              min="0"
              max="499"
              step="1"
              value={priceRange[0]}
              onChange={(e) => handleRangeChange(e, 0)}
            />
            <span >{priceRange[0]}$</span>
          </div>
          <div className="flex flex-col items-center space-y-2 w-full">
            <input
              type="range"
              className="w-full h-32"
              style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
              min="1"
              max="500"
              step="1"
              value={priceRange[1]}
              onChange={(e) => handleRangeChange(e, 1)}
            />
            <span >{priceRange[1]}$</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="bg-[#ff9910] text-white py-2 px-4 rounded-lg hover:bg-[#fca93c] transition duration-300"
      >
        Apply
      </button>
    </div>
  );
};

export default Filter;
