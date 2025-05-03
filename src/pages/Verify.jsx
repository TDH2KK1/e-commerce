import React, { useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const paymentMethod = searchParams.get('method') || 'Stripe' // default là Stripe
  const userId = localStorage.getItem('userId') // giả sử userId bạn lưu trong localStorage sau đăng nhập

  const verifyPayment = async () => {
    try {
      if (!token || !orderId) return

      const verifyUrl =
        paymentMethod === 'VNPay'
          ? '/api/order/verifyVNPay'
          : '/api/order/verifyStripe'

      const response = await axios.post(
        backendUrl + verifyUrl,
        { success, orderId, userId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        navigate('/cart')
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return <div></div>
}

export default Verify
