import { Truck, Banknote, ArrowRightLeft } from "lucide-react";

const ProductExtra = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 text-xl items-center">
        <div>
          <Truck size={30} />
        </div>
        <div>Fast Delivery</div>
      </div>
      <div className="flex space-x-2 text-xl items-center">
        <div>
          <Banknote size={30} />
        </div>
        <div>Cash on delivery available</div>
      </div>
      <div className="flex space-x-2 text-xl items-center">
        <div>
          <ArrowRightLeft size={30} />
        </div>
        <div>Easy return and exchange</div>
      </div>
      <div className="text-slate-800">100% Original Products</div>
    </div>
  );
};

export default ProductExtra;
