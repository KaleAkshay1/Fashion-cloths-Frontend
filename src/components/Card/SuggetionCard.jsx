import React, { useState, useEffect } from "react";

function SuggetionCard({ item }) {
  const [image, setImage] = useState(item.images.first);

  useEffect(() => {
    setImage(item.images.first);
  }, [item]);

  const mouseEnterEvent = () => {
    setImage(item.images.last);
  };

  const mouseLeaveEvent = () => {
    setImage(item.images.first);
  };

  return (
    <div
      className="h-full relative border overflow-hidden rounded-md min-w-[220px]"
      onMouseEnter={mouseEnterEvent}
      onMouseLeave={mouseLeaveEvent}
    >
      <img className="h-full w-full rounded-md" src={image} alt="" />
      <div className="cursor-pointer absolute bottom-2 flex flex-col gap-1 bg-white mx-3 w-[90%] rounded text-white bg-opacity-70">
        <h5 className="text-md overflow-hidden  truncate dark:font-semibold font-bold tracking-tight text-gray-800 dark:text-white text-center">
          {item.name}
        </h5>
        <h3 className=" overflow-hidden text-center truncate text-[12px] font-semibold tracking-tight text-gray-700 dark:text-slate-400">
          {item.descriptions}
        </h3>
        <div className="flex w-full items-center justify-around ">
          <span className="text-lg font-bold dark:font-semibold text-pink-700 dark:text-pink-600 p-1 rounded-md">
            {item.priceInfo.formatedFinalPrice}
          </span>
          {item.priceInfo.isOnSale && (
            <>
              <del className="text-[14px] dark:text-orange-400 text-orange-600">
                {item.priceInfo.formattedInitialPrice}
              </del>
            </>
          )}
        </div>
      </div>
      {item.priceInfo.isOnSale && (
        <div className="absolute top-3 text-white text-center -left-9 px-10 bg-purple-900 -rotate-45">
          -{item.priceInfo.discountLabel}
        </div>
      )}
    </div>
  );
}

export default SuggetionCard;
