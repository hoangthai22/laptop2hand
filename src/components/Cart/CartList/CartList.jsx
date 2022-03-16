import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { caculatorVND } from "../../../constants/Caculator";
import { LOCALSTORAGE_NAME } from "../../../constants/Pages";
import { AppContext } from "../../../contexts/AppProvider";
import "./CartList.scss";

const CartList = () => {
  const { Cart, setCart } = useContext(AppContext);
  const [listCart, setlistCart] = useState([]);
  const [paymentType, setpaymentType] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
    var totalPrice = 0;
    Cart.map((item) => {
      totalPrice = item.price + totalPrice;
    });
    setTotal(totalPrice);
    setlistCart(CartList);
  }, [Cart]);

  const handleRemoveCard = (_id) => {
    console.log(_id);
    const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
    const newCart = CartList.filter((item) => item.id !== _id);
    setCart([...newCart]);
    setlistCart([...newCart]);
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCart]));
  };
  const hanldePayment = (value) => {
    // console.log(value);
    setpaymentType(value);
    console.log(paymentType);
  };
  const hanldePaymentSubmit = () => {
    console.log();
  };
  return (
    <div className="cart__wrapper">
      <div className="cart__container">
        <div>
          <h1 style={{ textAlign: "center" }}>Giỏ hàng</h1>
        </div>
        <div className="cart__title">
          <div className="cart__img">
            <span>Hình ảnh</span>
          </div>
          <div className="cart__name">
            <span>Tên sản phẩm</span>
          </div>
          <div className="cart__price">
            <span>Đơn giá</span>
          </div>
          <div className="cart__quantity">
            <span>Số lượng</span>
          </div>
          <div className="cart__total">
            <span>Tổng</span>
          </div>
          <div className="cart__delete">
            <span>Xóa</span>
          </div>
        </div>
        {listCart.length > 0 ? (
          listCart?.map((item) => {
            return (
              <div className="cart__item">
                <div className="cart__img">
                  <img src={item.img} alt="" />
                </div>
                <div className="cart__name">
                  <span>{item.name}</span>
                </div>
                <div className="cart__price">
                  <span>{caculatorVND(item.price)}</span>
                </div>
                <div className="cart__quantity">
                  <span>{1}</span>
                </div>
                <div className="cart__total">
                  <span>{caculatorVND(item.price)}</span>
                </div>
                <div className="cart__delete">
                  <FontAwesomeIcon onClick={() => handleRemoveCard(item.id)} icon={faTrashAlt} style={{ marginRight: 5 }} />
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", marginTop: 30, fontWeight: 500, fontSize: "1.2rem" }}>Giỏ hàng hiện tại đang trống</div>
        )}
      </div>
      <div style={{ marginTop: 75, marginBottom: 50 }}>
        <h1 style={{ textAlign: "center" }}>Thanh toán</h1>
      </div>
      <div className="input__cart__wrapper">
        <div style={{ width: "50%" }}>
          <div>
            <span style={{ fontWeight: 500 }}>Họ và tên</span>
          </div>
          <div>
            <input type="text" placeholder="Họ và tên" className="input__cart" />
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Địa chỉ</span>
          </div>
          <div>
            <input type="text" placeholder="Xin vui lòng nhập địa chỉ của bạn " className="input__cart" />
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Số điện thoại</span>
          </div>
          <div>
            <input type="text" placeholder="Xin vui lòng nhập số điện thoại của bạn " className="input__cart" />
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Email</span>
          </div>
          <div>
            <input type="text" placeholder="Xin vui lòng nhập Email của bạn " className="input__cart" />
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Ghi chú</span>
          </div>
          <div>
            <textarea shape="" coords="" className="input__cart" style={{ height: 70 }} href="" alt="" />
          </div>
        </div>
        <div style={{ width: "50%", marginLeft: 50, display: "flex", flexDirection: "column" }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, paddingBottom: 20 }}>
              <span>Hình thức thanh toán</span>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", alignItems: "start" }}>
                <input
                  type="radio"
                  name="paymentType"
                  id=""
                  value={0}
                  className="radio"
                  checked={paymentType == 0}
                  style={{ marginRight: 10 }}
                  onChange={(e) => {
                    hanldePayment(e.target.value);
                  }}
                />{" "}
                <span style={{ fontSize: 18, marginRight: 30 }}>Thanh toán bằng thẻ ATM</span>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <input
                  type="radio"
                  name="paymentType"
                  id=""
                  value={1}
                  checked={paymentType == 1}
                  className="radio"
                  style={{ marginRight: 10 }}
                  onChange={(e) => {
                    hanldePayment(e.target.value);
                  }}
                />
                <span style={{ fontSize: 18 }}>Thanh toán khi nhận hàng</span>
              </div>
            </div>
            <div className={`payment__ATM${paymentType == 1 ? " visible" : ""}`}>
              <div class="img-list" data-spm-anchor-id="a2o4n.shipping.0.i3.7893705bGCdAti">
                <img src="https://laz-img-cdn.alicdn.com/tfs/TB1RI0cbLDH8KJjy1XcXXcpdXXa-80-80.png" class="bank-img" data-spm-anchor-id="a2o4n.shipping.0.i2.7893705bGCdAti" />
                <img src="https://laz-img-cdn.alicdn.com/tfs/TB1sH7_bxrI8KJjy0FpXXb5hVXa-80-80.png" class="bank-img" />
                <img src="https://laz-img-cdn.alicdn.com/tfs/TB1JmMulOqAXuNjy1XdXXaYcVXa-80-80.png" class="bank-img" />
              </div>
              <div style={{ marginTop: 15 }}>
                <div>
                  <label>Số thẻ</label>
                </div>
                <div style={{ width: "100%" }}>
                  <input type="text" data-meta="Field" className="input__payment" id="creditCard" maxlength="19" height="100%" />
                </div>
                <div>
                  <label>Họ và Tên trên thẻ</label>
                </div>
                <div style={{ width: "100%" }}>
                  <input type="text" data-meta="Field" className="input__payment" id="creditCard" maxlength="19" height="100%" />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Ngày hết hạn (MM/YY)</label>
                    <div style={{ width: "100%" }}>
                      <input type="text" data-meta="Field" className="input__payment last" id="creditCard" maxlength="19" height="100%" />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", marginLeft: 40 }}>
                    <label>CVV</label>
                    <div style={{ width: "100%" }}>
                      <input type="text" data-meta="Field" className="input__payment last" id="creditCard" maxlength="19" height="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid rgb(200, 200, 200)" }}></div>
          <div style={{ alignSelf: "end" }}>
            <div style={{ fontSize: 24, fontWeight: 600, paddingTop: 20 }}>
              <span>Chi tiết đơn hàng</span>
            </div>

            <div className="payment__cart">
              <span>Tổng tiền hàng</span>
              <span style={{ marginLeft: 50 }}>{caculatorVND(total)}</span>
            </div>
            <div className="payment__cart">
              <span>Phí vận chuyển</span>
              <span style={{ marginLeft: 50 }}>30.000 VND</span>
            </div>
            <div className="payment__cart">
              <span style={{ marginRight: 37 }}>Tổng cộng</span>
              <span style={{ marginLeft: 50, fontSize: 22, fontWeight: 600 }}>{caculatorVND(total + 30000)}</span>
            </div>
          </div>
          <div className="product__info__btn-cart__wrapper btn_payment">
            <button style={{ width: "100%" }} onClick={hanldePaymentSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
