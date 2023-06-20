import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Button, Form, Input, Modal, Table, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import '../styles/itempage.css';
import { HostName } from '../utils/config';


const ItemsPage = () => {
  const [itemData,setItemData]= useState([]);
  const[openModal,setOpenModal]=useState(false);
  const[formData,setFormData]=useState({
    'name':'',
    'price':'',
    'image':'',
    'category':''
  })
  const[editItemData,setEditItemData]=useState({
    'name':'',
    'price':'',
    'image':'',
    'category':'',
    'id':''
  });
  const[editButton,setEditButton]= useState(false);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});

  }
  const handleUpdateChange=(e)=>{
    setEditItemData({...editItemData,[e.target.name]:e.target.value});
   
  }
  
  const column =[
    {title:"Name", dataIndex:"name",key:"_id"},
    {title:"Image",dataIndex:"_id", render:(id,item)=>(
      <img src={item.image} alt={item.name} style={{height:'80px', width:"80px" ,objectFit:"contain" }} key={id} />
    )},
    {title:"Price", dataIndex:"_id",render:(id,item)=>(
      <>₹ {item.price}</>
    )},
    {title:"Actions", render:(id,item)=>(
      <>
      <DeleteOutlined   style={{cursor:'pointer'}} className='mx-3' onClick={()=>handleDelete(item)}/>
      <EditOutlined  style={{cursor:'pointer'}} className='mx-3' onClick={()=>clickEditItem(item)}/>
      </>
    )}
  ]
  const getAllItems = async()=>{
    try {
      const {data } = await axios.get(`${HostName}/api/items/get-items`);
     
      setItemData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllItems();
  },[])

// handleDelete

const handleDelete =async(item)=>{
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        showCloseButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(item._id);
          const headers={
            id:item._id
          }
          await axios.delete(`${HostName}/api/items/delete-item`,{headers})
          message.success("Item deleted Successfully");
          getAllItems();
        }
      })
    } catch (error) {
        console.log(error);
    }
}
// add item 
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
   console.log(JSON.stringify(formData));
    const res = await axios.post(`${HostName}/api/items/ad  d-item`,formData);
    message.success("Item Added Successfully");
    getAllItems();
    setFormData({
      'name':'',
      'price':'',
      'image':'',
      'category':''
    });
    res.data && setOpenModal(false);
     handleChange();
    
  } catch (error) {
   console.log(error);
  }
}

// click edit button
const clickEditItem =(item)=>{
  setEditButton(true);
setOpenModal(true);
setEditItemData({
  'category':item.category,
  'image':item.image,
  'name':item.name,
  'price':item.price,
  'id':item._id
});
}

// update button 

const handleUpdate =async(e)=>{
  e.preventDefault();
  try {
    const {id,...others} = editItemData;
    console.log(editItemData);
   const res = await axios.put(`${HostName}/api/items/edit-item`,{id,others});
    getAllItems();
    setOpenModal(false);
   message.success("Updated Successfully");

   
  } catch (error) {
    message.error("Something went Wrong");
  }
}

  return (
    <div>
      <DefaultLayout>
        <div className='item_header'>
        <h1>Items Page</h1>
        <Button type='primary' onClick={()=>{
          setEditButton(false);
          setOpenModal(true)}
          
          }>Add Item</Button>
        <Modal  title={editButton?"Update Item":"Add Item"} open={openModal}  onCancel={()=>setOpenModal(false)}  footer={false}>
        {editButton?
          <div  className='item_form'>
            <div className='form_field'>
              <label>Name:</label>
              <input type="text" name="name" required value={editItemData.name} onChange={handleUpdateChange} />
            </div>
            <div className='form_field'>
              <label>Price:</label>
              <input type="text" name="price" value={editItemData.price} onChange={handleUpdateChange} />
            </div>
            <div className='form_field'>
              <label>Image:</label>
              <input type="text" name="image" value={editItemData.image} onChange={handleUpdateChange} />
            </div>
            <div className='form_field'>
              <label>Category:</label>
              <input type="text" name="category" value={editItemData.category} onChange={handleUpdateChange} />
            </div>
            <button type="submit" onClick={handleUpdate}>Update</button>
        </div>
        :
        <div className='item_form'>
          <div className='form_field'>
            <label>Name:</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className='form_field'>
            <label>Price:</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className='form_field'>
            <label>Image:</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>
          <div className='form_field'>
            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
       </div>
        }

        
        </Modal>
        </div>
        
        <Table bordered={1}  columns={column}  dataSource={itemData}/>
        
      </DefaultLayout>
    </div>
  )
}

export default ItemsPage
