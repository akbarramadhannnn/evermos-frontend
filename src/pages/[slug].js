import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";

import {
  ImageSlider,
  TextTitle,
  TextPrice,
  TextDescription,
  Message,
  Purchase,
  ButtonSelected,
  LoadingSkeletonImage,
  LoadingSkeletonText,
  LoadingSkeletonDescription,
} from "../components";

import { ConvertNumber } from "../utils/convert";
import { ReplaceToSlug } from "../utils/replace";

import { GetData } from "../api/data";

const dummyData = {
  id: 1,
  name: "Hp Iphone 7",
  description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
  rerum asperiores error omnis pariatur sequi placeat quia fuga ullam.
  Harum obcaecati suscipit illum similique excepturi voluptates quae
  deserunt tempore, distinctio architecto ipsum dolor laboriosam
  inventore impedit nostrum totam eaque sed est? Non rem repudiandae,
  vitae iure suscipit pariatur, cum esse sequi cumque saepe commodi
  reprehenderit quaerat. Quasi ipsam repellendus similique`,
  listPrice: [
    {
      stok: 5,
      kapasitas: "16 GB",
      price: 1000000,
    },
    {
      stok: 10,
      kapasitas: "32 GB",
      price: 1200000,
    },
    {
      stok: 15,
      kapasitas: "64 GB",
      price: 1400000,
    },
  ],
  imageList: [
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg",
  ],
};

const Index = (props) => {
  const router = useRouter();
  // List
  const [variantList, setVariantList] = useState([]);
  const [capacityList, setCapacityList] = useState([]);
  // Store
  const [storeVariantList, setStoreVariantList] = useState([]);
  const [storeImageList, setStoreImageList] = useState([]);
  // ====
  const [detailData, setDetailData] = useState({});
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedKapasitas, setSelectedKapasitas] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const data = props.data;
    const variantArr = [];
    const capacityArr = [];
    for (let i = 0; i < data.variantList.length; i++) {
      variantArr.push({
        name: data.variantList[i].name,
      });
    }
    for (let i = 0; i < data.variantList[0].priceList.length; i++) {
      capacityArr.push({
        name: data.variantList[0].priceList[i].kapasitas,
      });
    }
    setVariantList(variantArr);
    setCapacityList(capacityArr);
    setStoreVariantList(data.variantList);
    setStoreImageList(data.imageList);
    setDetailData({
      title: data.title,
      image: data.imageList[0],
      description: data.description,
      price: data.variantList[0].priceList[0].price,
      stok: data.variantList[0].priceList[0].stok,
    });
    setSelectedVariant(data.variantList[0].name);
    setSelectedKapasitas(dummyData.listPrice[0].kapasitas);
    setIsloading(false);
  }, [props]);

  useEffect(() => {
    if (detailData.price) {
      const hasilTotal = detailData.price * quantity;
      setTotal(hasilTotal);
    }
  }, [quantity, detailData.price]);

  useEffect(() => {
    if (quantity > detailData.stok) {
      setMessage(`Max. pembelian ${detailData.stok} barang`);
    } else if (quantity === 0) {
      setMessage(`Min. pembelian produk ini adalah 1 barang`);
    } else {
      setMessage("");
    }
  }, [quantity, detailData.stok]);

  const price = useMemo(() => {
    return ConvertNumber(detailData.price);
  }, [detailData.price]);

  const subTotal = useMemo(() => {
    return ConvertNumber(total);
  }, [total]);

  const handleClickImageSLider = useCallback((url) => {
    setDetailData((oldState) => ({
      ...oldState,
      image: url,
    }));
  }, []);

  const findPriceListTest = useCallback(
    (variant, kapasitas) => {
      const findVariant = storeVariantList.find((d) => d.name === variant);
      const findPriceList = findVariant.priceList.find(
        (d) => d.kapasitas === kapasitas
      );
      if (findPriceList !== undefined) {
        setDetailData((oldState) => ({
          ...oldState,
          price: findPriceList.price,
          stok: findPriceList.stok,
        }));
      } else {
        setDetailData((oldState) => ({
          ...oldState,
          price: findVariant.priceList[0].price,
          stok: findVariant.priceList[0].stok,
        }));
        setSelectedKapasitas(findVariant.priceList[0].kapasitas);
      }
    },
    [storeVariantList]
  );

  const handleChangeVariant = useCallback(
    (variant) => {
      const findCapacity = storeVariantList.find((d) => d.name === variant);
      const capacityArr = [];
      for (let i = 0; i < findCapacity.priceList.length; i++) {
        capacityArr.push({
          name: findCapacity.priceList[i].kapasitas,
        });
      }
      setCapacityList(capacityArr);
      findPriceListTest(variant, selectedKapasitas);
      setQuantity(1);
      setSelectedVariant(variant);
    },
    [storeVariantList, selectedKapasitas, findPriceListTest]
  );

  const handleChangeKapasitas = useCallback(
    (kapasitas) => {
      findPriceListTest(selectedVariant, kapasitas);
      setQuantity(1);
      setSelectedKapasitas(kapasitas);
    },
    [storeVariantList, selectedVariant, findPriceListTest]
  );

  const handleClickBackBtn = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="container-details-product">
      <div className="back-btn-area">
        <button className="back-btn" onClick={handleClickBackBtn}>
          {"<"}
        </button>
      </div>
      <div className="image-area">
        {isLoading ? (
          <LoadingSkeletonImage />
        ) : (
          <ImageSlider
            image={detailData.image}
            imageList={storeImageList}
            onClick={(url) => handleClickImageSLider(url)}
          />
        )}
      </div>

      <div className="content-area">
        <div className="info-area">
          <div className="area-section-details">
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <TextTitle>{detailData.title}</TextTitle>
            )}
          </div>

          <div className="area-section-details">
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <TextPrice>{price}</TextPrice>
            )}
          </div>

          <div className="area-section-details">
            {isLoading ? (
              <LoadingSkeletonDescription />
            ) : (
              <TextDescription>{detailData.description}</TextDescription>
            )}
          </div>

          <div className="area-section-details">
            <div className="mb-5">
              <p>Variant :</p>
            </div>
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <ButtonSelected
                data={variantList}
                selected={selectedVariant}
                onClick={(name) => handleChangeVariant(name)}
              />
            )}
          </div>

          <div className="area-section-details">
            <div className="mb-5">
              <p>Kapasitas :</p>
            </div>
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <ButtonSelected
                data={capacityList}
                selected={selectedKapasitas}
                onClick={(name) => handleChangeKapasitas(name)}
              />
            )}
          </div>

          <div className="area-section-details">
            <div className="mb-5">
              <p>Atur Pembelian :</p>
            </div>
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <Purchase
                quantity={quantity}
                setQuantity={(value) => setQuantity(value)}
                stok={detailData.stok}
              />
            )}

            <Message text={message} />
          </div>
        </div>

        <div className="action-area">
          <div className="left-area">
            <div className="wrap-input mb-5">
              <p>Subtotal :</p>
            </div>
            {isLoading ? (
              <LoadingSkeletonText />
            ) : (
              <TextPrice>{subTotal}</TextPrice>
            )}
          </div>

          <div className="button-area">
            {!isLoading && (
              <button disabled={message ? true : false}>Beli</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const { data } = await GetData();
  const result = data.find((d) => ReplaceToSlug(d.title) === slug);

  return {
    props: {
      data: result,
    },
  };
}

export default Index;
