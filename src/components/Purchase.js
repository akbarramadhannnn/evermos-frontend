import React, { memo, useCallback } from "react";

const Purchase = ({ quantity, stok, setQuantity }) => {
  const handleChangeTotal = useCallback((e) => {
    const { value } = e.target;
    if (isNaN(value)) return false;
    setQuantity(Number(value));
  }, []);

  const onClickIncrement = useCallback(() => {
    if (quantity < stok) {
      setQuantity(quantity + 1);
    }
  }, [stok, quantity]);

  const onClickDecrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);
  return (
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
            disabled={quantity < stok ? false : true}
            onClick={onClickIncrement}
          >
            <span>+</span>
          </button>
        </div>
      </div>

      <div className="wrap-quantity">
        <p>
          Stok : <span className="text-price-two">{stok}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(Purchase);
