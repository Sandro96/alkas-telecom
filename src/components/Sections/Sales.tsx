import React from "react";
import clsx from "clsx";
import { products } from "../../assets/data/Products";

const Sales: React.FC = () => {
  return (
    <div className="sales my-10">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">¡Nuestras ofertas!</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {products.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "p-5 border border-gray-300 rounded-lg shadow-lg text-center",
                "w-[350px] h-[500px]"
              )}
            >
              <div
                className={clsx(
                  "mb-4 h-[250px] flex justify-center items-center"
                )}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <h3 className={clsx("text-xl font-bold mb-4")}>{item.name}</h3>
              <div className={clsx("mb-6")}>
                <p className={clsx("text-red-300 line-through")}>
                  {item.beforePrice}
                </p>
                <p className={clsx("font-bold text-[28px]")}>
                  {item.afterPrice}
                </p>
                <p className={clsx("text-sm text-gray-600")}>
                  {item.totalPrice}
                </p>
              </div>
              <a
                className={clsx(
                  "inline-block font-bold bg-primary text-white py-2 px-8 rounded",
                  "hover:bg-accent hover:text-black hover:scale-105",
                  "transition duration-300 cursor-pointer"
                )}
              >
                Lo quiero
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            className={clsx(
              "inline-block font-bold bg-primary text-white py-2 px-6 rounded",
              "hover:bg-accent hover:text-black hover:scale-105",
              "transition duration-300 cursor-pointer"
            )}
          >
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sales;
