"use client";

import React, { useState } from "react";
import ProductSizeBtns from "../ProductSizeBtns/ProductSizeBtns";
import AddToCart from "../AddToCart/AddToCart";
import AddToWishlist from "../AddToWishlist/AddToWishlist";
import { Size } from "@/types/size";

interface Props {
  productSizes: Size[];
  prductSlug: string;
}

const ProductPageActions = ({ productSizes, prductSlug }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <>
      <div className="my-6">
        <ProductSizeBtns
          productSizes={productSizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
      <div className="flex my-5 space-x-5">
        <AddToCart selectedSize={selectedSize} productSlug={prductSlug} />
        <AddToWishlist productSlug={prductSlug} />
      </div>
    </>
  );
};

export default ProductPageActions;
