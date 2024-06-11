import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SuggetionCard from "./SuggetionCard";

function ItemSlider({ items }) {
  const boxRef = useRef(null);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem(items);
  }, [items]);

  const nextButtonClick = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      console.log(width);
      boxRef.current.scrollLeft = boxRef.current.scrollLeft + width;
    }
  };

  const previousButtonClick = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      boxRef.current.scrollLeft = boxRef.current.scrollLeft - width;
    }
  };

  return (
    <div className="relative h-80 w-full border bg-white rounded-2xl overflow-hidden p-2 gap-2">
      <div
        className="gap-2 h-full scroll-smooth rounded flex w-full overflow-x-scroll scrollbar-hide"
        ref={boxRef}
      >
        {item.map((ele, ind) => (
          <NavLink key={ele._id} to={`/${ele.gender}/detail/${ele._id}`}>
            <SuggetionCard item={ele} />
          </NavLink>
        ))}
      </div>
      <button
        onClick={previousButtonClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white py-7 px-3 rounded-e-md hover:bg-slate-200 border"
      >
        {"<"}
      </button>
      <button
        onClick={nextButtonClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 border bg-white py-7 px-3 rounded-s-md hover:bg-slate-200"
      >
        {">"}
      </button>
    </div>
  );
}

export default ItemSlider;
