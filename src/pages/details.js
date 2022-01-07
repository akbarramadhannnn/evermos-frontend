import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from "react";

import ImageSlider from "../components/ImageSlider";

import ConvertNumber from "../utils/convertNumber";

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

const Index = () => {
  const [storeListPrice, setStoreListPrice] = useState([]);
  const [storeImageList, setStoreImageList] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [selectedKapasitas, setSelectedKapasitas] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStoreListPrice(dummyData.listPrice);
      setStoreImageList(dummyData.imageList);
      setDetailData({
        name: dummyData.name,
        image: dummyData.imageList[0],
        description: dummyData.description,
        price: dummyData.listPrice[0].price,
        stok: dummyData.listPrice[0].stok,
      });
      setSelectedKapasitas(dummyData.listPrice[0].kapasitas);
      setIsloading(false);
    }, 5000);
  }, []);

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

  const handleClickImageSLider = useCallback((url) => {
    setDetailData((oldState) => ({
      ...oldState,
      image: url,
    }));
  }, []);

  const price = useMemo(() => {
    return ConvertNumber(detailData.price);
  }, [detailData.price]);

  const subTotal = useMemo(() => {
    return ConvertNumber(total);
  }, [total]);

  const handleChangeTotal = useCallback((e) => {
    const { value } = e.target;
    if (isNaN(value)) return false;
    setQuantity(Number(value));
  }, []);

  const handleChangeKapasitas = useCallback(
    (kapasitas) => {
      const find = storeListPrice.find((d) => d.kapasitas === kapasitas);
      setQuantity(1);
      setSelectedKapasitas(kapasitas);
      setDetailData((oldState) => ({
        ...oldState,
        price: find.price,
        stok: find.stok,
      }));
    },
    [storeListPrice]
  );

  const onClickIncrement = useCallback(() => {
    if (quantity < detailData.stok) {
      setQuantity(quantity + 1);
    }
  }, [detailData, quantity]);

  const onClickDecrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  return (
    <div className="container-details-product">
      <div className="image-area">
        {isLoading ? (
          <div className="skeleton-image"></div>
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
              <div className="skeleton-text"></div>
            ) : (
              <h1 className="text-title">{detailData.name}</h1>
            )}
          </div>

          <div className="area-section-details">
            {isLoading ? (
              <div className="skeleton-text"></div>
            ) : (
              <h2 className="text-price">Rp {price}</h2>
            )}
          </div>

          <div className="area-section-details">
            {isLoading ? (
              <div className="skeleton-description"></div>
            ) : (
              <p className="text-description">{detailData.description}</p>
            )}
          </div>

          <div className="area-section-details">
            <div style={{ marginBottom: 5 }}>
              <p>Kapasitas :</p>
            </div>
            <div className="list-kapasitas">
              {isLoading ? (
                <div className="skeleton-text"></div>
              ) : (
                <Fragment>
                  {storeListPrice.map((list, i) => (
                    <div key={i} className={`wrap-button`}>
                      <button
                        className={`wrap-button ${
                          list.kapasitas === selectedKapasitas && "is-active"
                        }`}
                        onClick={() => handleChangeKapasitas(list.kapasitas)}
                      >
                        {list.kapasitas}
                      </button>
                    </div>
                  ))}
                </Fragment>
              )}
            </div>
          </div>

          <div className="area-section-details">
            <div style={{ marginBottom: 5 }}>
              <p>Atur Pembelian :</p>
            </div>
            {isLoading ? (
              <div className="skeleton-text"></div>
            ) : (
              <div className="purchase-area">
                <div className="wrap-input">
                  <div className="input-area">
                    <button
                      className="quantity-button"
                      disabled={quantity > 1 ? false : true}
                      onClick={onClickDecrement}
                    >
                      <span>-</span>
                    </button>
                    <input
                      value={quantity}
                      onChange={handleChangeTotal}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        border: "none",
                        outline: "none",
                      }}
                      type="text"
                    />
                    <button
                      className="quantity-button"
                      disabled={quantity < detailData.stok ? false : true}
                      onClick={onClickIncrement}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>

                <div className="wrap-quantity">
                  <p>
                    Stok :{" "}
                    <span className="text-price-two">{detailData.stok}</span>
                  </p>
                </div>
              </div>
            )}

            {message && (
              <div>
                <p className="message-purchase-area">{message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="action-area">
          <div className="left-area">
            <div className="wrap-input" style={{ marginBottom: 5 }}>
              <p>Subtotal :</p>
            </div>
            {isLoading ? (
              <div className="skeleton-text"></div>
            ) : (
              <div className="text-price">Rp {subTotal}</div>
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

export default Index;
