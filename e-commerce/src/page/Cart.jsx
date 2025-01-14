

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
    const {cart_items}=useSelector(store=>store.cartStore)
    const dispatch=useDispatch()

    const removeFromCart=(id)=>e=>{
   e.preventDefault()
   dispatch({type:"REMOVE_FROM_CART",payload:id})
    }
  return (
      <div>
      <h3 className='text-center text-decoration-underline my-4'>Cart Items</h3>
      {
        cart_items.length>0?
      
        <>
        <table className='table w-75 mx-auto table-bordered text-center table-hover'>
    <thead className='table-dark'>
        <tr>
            <td>S.No</td>
            <td>Images</td>
            <td>Product</td>
            <td>Unit Price</td>
            <td>Quantity</td>
            <td>Total Price</td>
            <td>Remove</td>
        </tr>
    </thead>
    <tbody>
        {
            cart_items.map((item,i)=>{
                return  <tr key={item.cart_id}>
             <td>{i+1}</td>
    
            <td><img src={item.image} alt="" style={{height:'100px'}}/></td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.price*item.quantity} </td>
            <td><button className='btn btn bg-danger' onClick={removeFromCart(item.cart_id)}>Remove <i className='bi bi-trash'></i></button></td>

</tr>
            })
        }
    </tbody>
  </table>
  <button className='btn btn-danger' onClick={()=>{
      dispatch({type:"EMPTY_CART"})
    }}>Empty</button>
    </>
   :
   <div className='text-center my-5'>No items in the cart</div>
   }
  <button className="btn btn-success"><a href="/">Check Out</a></button>
    </div>
  )


}

export default Cart

