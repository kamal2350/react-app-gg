import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import { incrementCart,decrementCart, removeFromCart,emptyCart } from '../redux/cartSlice'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import '../styles/cartpage.css';
import { HostName } from '../utils/config'
const Cartpage = () => {
    const cartItems = useSelector(state=>state.cart.cartItems);
    const[subTotal,setSubTotal]= useState(0);
    const[discount,setDiscount]=useState(0);
    const discountCriteria=999;
    const discountvalue=50
    const[billPopup,setShowBillPopup]=useState(false);
    const dispatch= useDispatch();
    const handleIncreament = (record) => {
        dispatch(incrementCart(record._id))
        console.log(quantity+=1);
      };
      const handleDecreament = (record) => {
        if (record.quantity !== 1) {
          dispatch(decrementCart(record._id, ))
      }
    }
    useEffect(()=>{
      let temp=0;
      cartItems.forEach((item)=>temp=temp+(item.price*item.quantity));
      setSubTotal(temp);
      {temp>discountCriteria ? setDiscount(discountvalue):setDiscount(0)}
    },[cartItems]);
    const column=[
      
      {title:"name",dataIndex:'name',key:"_id"},
      {title:'image',dataIndex:'_id',render:(_id,item)=>(
        <img src={item.image}  key={_id} alt={item.name}  style={{ height:'70px', width:'70px',objectFit:"contain"}}/>
      )},
      {title:'price',dataIndex:'price'},
      {title:'Quantity',dataIndex:'quantity',render:(_id,item)=>(
        <div>
          <MinusCircleOutlined  className='mx-3' onClick={()=>handleDecreament(item)}/>
            {item?.quantity}
          <PlusCircleOutlined className='mx-3' onClick={()=>handleIncreament(item)}/>
        </div>
      )},
      {
        title:'Total',render:(_id,record)=>(

          <>
          {record.quantity*record.price}
          </>
        )
      },
      {title:'Actions',render:(_id,record)=>(
        <DeleteOutlined key={record?._id} onClick={()=>dispatch(removeFromCart(record._id))}/>
      )

      }
 

    ]
  
    const onFinish =async(values)=>{
      
      try {
        const billObj={
          ...values,
          cartItems:cartItems,
          subTotal:subTotal,
          discount:discount, 
          totalAmount:Number((subTotal-discount).toFixed(2))
        }
        console.log(billObj);

        const res = await axios.post(`${HostName}/api/bills/add-bill`,billObj);
        console.log(res.data);
        setShowBillPopup(false);
        dispatch(emptyCart())
        message.success("Bill generated Successfully")

      } catch (error) {
         message.error("Something went wrong");
      }

      }
    
  
   
  return (
    <DefaultLayout>
       <div >
       <h1>Cart Page</h1>
        <div className="cart_page">
            {cartItems.length>0?<Table pagination={false} dataSource={cartItems} columns={column} />:
              <div className='empty_cart'>
                <img src='https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png'  height="400px" width="400px"alt='cart'/>
              </div>
             }
        </div>
        {cartItems.length>0 && <div>
            <h1>SubTotal</h1>
            <h1>{subTotal.toFixed(2)}</h1>
             <Button type='primary' onClick={()=>setShowBillPopup(true)}> Invoice</Button>
             <Modal title="Invoice" footer={false} open={billPopup} onCancel={()=>setShowBillPopup(false)}>
              <Form layout="vertical" onFinish={onFinish} >
                <Form.Item name ="customerName" label="Customer Name" required="true"  rules={[
                 { required:true,
                  message:"Enter customer name"}
                ]}>
                  <Input/>
                </Form.Item>
                <Form.Item name ="customerNumber" label="Phone Number" >
                  <Input/>
                </Form.Item>
                <Form.Item name="paymentMode" label="Payment Mode" >
                  <Select  >
                    <Select.Option value="Cash">Cash</Select.Option>
                    <Select.Option value="Card">Card</Select.Option>
                  </Select>
                </Form.Item>
                <div className='bill_item'>
                   <h5>Subtotal:₹{subTotal.toFixed(2)}</h5>
                   {discount>0 &&<h5>Discount:₹ -{discount}
                   </h5>}
                   <h3>Grand Total: ₹ {subTotal>discountCriteria?Number(subTotal-discount).toFixed(2)  :Number(subTotal.toFixed())}</h3>
                </div>
                <Button className='' type='primary' htmlType="submit">Generate Bill</Button>
              </Form>
             </Modal>
        </div>}
       
       </div>
    </DefaultLayout>
  )
}

export default Cartpage
