import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export default function Thanks() {
  const { backendUrl, token } = useContext(ShopContext);
  const vnp_Params = window.location.search;
  const paramsString = vnp_Params.slice(vnp_Params.indexOf("?") + 1);
  const paramsArray = paramsString.split("&").map((param) => {
    const [key, value] = param.split("=");
    return { [key]: decodeURIComponent(value) };
  });
  const mergedParams = paramsArray.reduce((merged, param) => {
    return { ...merged, ...param };
  }, {});

  const handlePaymentCheck = async (orderData) => {
    try {
      const res = await axios.post(
        backendUrl + `/api/order/vnpay_return`,
        {
          orderData: orderData,
          vnp_Params: mergedParams,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          withCredentials: true, // ✨ Thêm dòng này
        }
      );
      Cookies.remove("orderData");
      if (res.data.success == true) {
        toast.success("Payment successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const orderData = Cookies.get("orderData");
    const orderDatas = orderData ? JSON.parse(orderData) : [];
    if (orderDatas != null) {
      handlePaymentCheck(orderDatas);
    }
  }, [mergedParams]);
  return <div>Thanks Successfully</div>;
}
