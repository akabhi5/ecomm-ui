import React from "react";
import { Button } from "../ui/button";
import { Size } from "@/types/size";
import { cn } from "@/lib/utils";

interface Props {
  productSizes: Size[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const ProductSizeBtns = ({
  productSizes,
  selectedSize,
  setSelectedSize,
}: Props) => {
  return (
    <div className="space-x-2">
      {productSizes.map((size) => (
        <Button
          variant={selectedSize === size.size ? "default" : "outline"}
          className={cn(
            `rounded-full border-2 border-black w-11`,
            size.quantity <= 0 && "line-through"
          )}
          key={size.size}
          onClick={() => setSelectedSize(size.size)}
          disabled={size.quantity <= 0}
        >
          {size.size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default ProductSizeBtns;
