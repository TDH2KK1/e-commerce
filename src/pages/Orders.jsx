import axios from 'axios';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
const Orders = () => {

  const { backendUrl, token, currency, setCartItems} = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])
  const mergedParams = useMemo(() => {
    const vnp_Params = window.location.search;
    const paramsString = vnp_Params.slice(vnp_Params.indexOf("?") + 1);
    const paramsArray = paramsString.split("&").map((param) => {
      const [key, value] = param.split("=");
      return { [key]: decodeURIComponent(value) };
    });
    return paramsArray.reduce((merged, param) => {
      return { ...merged, ...param };
    }, {});
  }, []);

  const handlePaymentCheck = async (orderData) => {
    try {
      // Kiểm tra nếu orderData hoặc mergedParams không có dữ liệu
      if (!orderData || !mergedParams) {
        throw new Error('Missing order data or merged parameters');
      }
  
      // Gửi yêu cầu kiểm tra thanh toán
      const res = await axios.post(
        `${backendUrl}/api/order/vnpay_return`,
        {
          orderData: orderData,
          vnp_Params: mergedParams,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          withCredentials: true, // ✨ Thêm dòng này để gửi cookie
        }
      );
  
      // Kiểm tra kết quả trả về từ API
      if (res.data.success) {
        toast.success("Payment successfully!",{
          position: "top-right", // Hoặc "bottom-right" tùy theo thiết kế của bạn
          autoClose: 500, // Tự động đóng sau 0.5 giây
      });
        setCartItems({});
        
        // Kiểm tra nếu trang đã được tải lại trước đó
        if (!localStorage.getItem('paymentChecked')) {
          localStorage.setItem('paymentChecked', 'true');
        }
  
        Cookies.remove("orderData");
      } else {
      }
    } catch (error) {
      // Xử lý lỗi và thông báo cho người dùng
      console.error('Payment check error: ', error);
      toast.error("An error occurred while checking payment.");
    }
  };

  useEffect(() => {
    const orderData = Cookies.get("orderData");
    const orderDatas = orderData ? JSON.parse(orderData) : [];
    if (orderDatas != null && mergedParams) {
      handlePaymentCheck(orderDatas);
    }
  }, [mergedParams,token]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
        console.log(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{item.price.toLocaleString("vi-VN")} {currency}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>

                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
              </div>
              <button onClick={loadOrderData} className='border px-5 py-2 text-sm font-medium rounded-sm border-gray-400'>Track Order</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders