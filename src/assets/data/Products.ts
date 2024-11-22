export type Product = {
    id: number;
    img: string;
    name: string;
    beforePrice: string;
    afterPrice: string;
    totalPrice: string;
  };
  
  export const products: Product[] = [
    {
      id: 1,
      img: "img/cel1.webp",
      name: "Samsung Galaxy S23",
      beforePrice: "6 x $30.000",
      afterPrice: "6 x $25.000",
      totalPrice: "PTC: $150.000",
    },
    {
      id: 2,
      img: "img/cel2.webp",
      name: "iPhone 15",
      beforePrice: "6 x $40.000",
      afterPrice: "6 x $35.000",
      totalPrice: "PTC: $210.000",
    },
    {
      id: 3,
      img: "img/cel3.webp",
      name: "Xiaomi 13",
      beforePrice: "6 x $20.000",
      afterPrice: "6 x $18.000",
      totalPrice: "PTC: $108.000",
    },
  ];
  