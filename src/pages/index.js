import React, { Fragment, useEffect, useState } from "react";

import ProductList from "../components/ProductList";
import LoadingProductList from "../components/LoadingProductList";

import { GetData } from "../api/data";

const Index = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetData().then((response) => {
      const dataArr = [];
      for (let i = 0; i < response.data.length; i++) {
        dataArr.push({
          image: response.data[i].imageList[0],
          title: response.data[i].title,
          price: response.data[i].variantList[0].priceList[0].price,
        });
      }
      setDataProduk(dataArr);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <LoadingProductList />
      ) : (
        <Fragment>
          {dataProduk.map((d, i) => (
            <ProductList key={i} data={d} isLoading={isLoading} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Index;
