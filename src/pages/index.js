import React, { useEffect, useState } from "react";

import ProductList from "../components/ProductList";

import { GetData } from "../api/data";

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

const Index = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetData().then((response) => {
      setDataProduk(response.data);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="container">
      {dataProduk.map((d, i) => (
        <ProductList key={i} data={d} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default Index;
