import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import ItemsDetail from "./ItemsDetail";

function FindProduct() {
  const { id } = useParams();
  const data = useLoaderData();
  const [item, setItem] = useState(data?.data?.data);

  useEffect(() => {
    setItem(data?.data?.data);
  }, [data]);

  return (
    <div>
      <ItemsDetail product={item} />
    </div>
  );
}

export default FindProduct;
