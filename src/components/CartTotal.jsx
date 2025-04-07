import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {  currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p className='font-medium text-gray-500'>Subtotal</p>
                <p>{getCartAmount().toLocaleString("vi-VN")} {currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Free</p>
                <p>{(Number(delivery_fee) < 1000 ? Number(delivery_fee) * 1000 : Number(delivery_fee)).toLocaleString("vi-VN")} {currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{getCartAmount() === 0 ? 0 : (Number(getCartAmount()) +(Number(delivery_fee) < 1000 ? Number(delivery_fee) * 1000 : Number(delivery_fee))).toLocaleString("vi-VN")} {currency}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal