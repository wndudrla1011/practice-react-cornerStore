import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

function CartComponent() {
  const { isLogin, loginState } = useCustomLogin();

  const { cartItems, refreshCart, changeCart } = useCustomCart();

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          {/* Title */}
          <div className="w-full flex">
            <div className="font-extrabold text-2xl w-4/5">
              {loginState.nickname}님의 장바구니
            </div>
            <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
              {cartItems.length}
            </div>
          </div>

          {/* List */}
          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CartComponent;
