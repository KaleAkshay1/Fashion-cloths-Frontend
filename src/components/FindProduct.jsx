import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function FindProduct() {
  const { id, color } = useParams();
  const products = useSelector((state) => state.product);

  return (
    <div>
      {products
        .filter((ele) => ele._id === id)
        .map((ele) => (
          <ProductDetail key={ele._id} product={ele} colors={color} />
        ))}
    </div>
  );
}

export default FindProduct;
