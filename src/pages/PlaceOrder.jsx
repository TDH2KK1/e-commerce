import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');

  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* --------- Left Side --------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-2 justify-between'>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='First name'/>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='Last name'/>
        </div>
        <input className='border border-gray-300 rounded-md py-2 px-2 outline-none' type="email" placeholder='Email address'/>
        <input className='border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='Street'/>
        <div className='flex gap-2'>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='City'/>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-2'>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="number" placeholder='Zipcode'/>
          <input className='flex-1 border border-gray-300 rounded-md py-2 px-2 outline-none' type="text" placeholder='Country'/>
        </div>
        <input className='border border-gray-300 rounded-md py-2 px-2 outline-none' type="number" placeholder='Phone'/>
      </div>

      {/* --------- Right side ---------*/}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* --------- Payment Method Selection --------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('vnpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'vnpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.vnpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
              <button onClick={()=>navigate('/orders')} className='text-white bg-black px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder