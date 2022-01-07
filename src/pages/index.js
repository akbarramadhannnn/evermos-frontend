import React from "react";

import ProductList from "../components/ProductList";

const Index = () => {
  const data = [
    {
      name: "Produk Ini adlaha cdjksbcnjksndjkvndfjkvndf",
      image: "https://source.unsplash.com/1-nx1QR5dTE",
      price: "699.000",
    },
    {
      name: "Produk 1",
      image: "https://source.unsplash.com/1-nx1QR5dTE",
      price: "699.000",
    },
    {
      name: "Produk 1",
      image: "https://source.unsplash.com/1-nx1QR5dTE",
      price: "699.000",
    },
    {
      name: "Produk 1",
      image: "https://source.unsplash.com/1-nx1QR5dTE",
      price: "699.000",
    },
    {
      name: "Produk 1",
      image: "https://source.unsplash.com/1-nx1QR5dTE",
      price: "699.000",
    },
  ];
  return (
    <div className="container">
      {data.map((d, i) => (
        <ProductList key={i} data={d} />
      ))}
    </div>
  );
};

export default Index;
