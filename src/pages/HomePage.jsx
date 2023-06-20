import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import {Row,Col} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import '../styles/homepage.css'
import { addToCart,removeFromCart } from '../redux/cartSlice';
import { HostName } from '../utils/config';
const HomePage = () => {
  const [itemsData,setItemsData] = useState([]);
  const [showAdd,setShowAdd]=useState(true);
  const dispatch = useDispatch();
  let cart = useSelector(state=>state.cart.cartItems);
  console.log(cart);
  const handleCategory =async(e)=>{
    const category=(e.target.innerText);
   
      try {
       
        if(category==="All"){
          const {data } = await axios.get(`${HostName}api/items/get-items`);
          setItemsData(data);
        }
        else{
          const {data} = await axios.get(`${HostName}/api/items/get-items/${category}`);
          setItemsData(data);
        }
      } catch (error) {
        console.log(error);
      }
  }
  
  // useEffect
  useEffect(()=>{
    const getAllItems = async()=>{
      try {
        const {data } = await axios.get('http://localhost:4000/api/items/get-items');
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }



    getAllItems();
  },[])


  return (
    <div>
        <DefaultLayout>
          <div className='home_container'>
            <div className="category_section">
              <Row className='category_row'>
                <div className= 'category_col'  onClick={handleCategory}>All</div>
                <div className= 'category_col'  onClick={handleCategory}>Vegetables</div>
                <div className= 'category_col' onClick={handleCategory}> Fruits</div>
                <div className= 'category_col' onClick={handleCategory}>Grocery</div>
              </Row>
            </div>
            <div className="product_section">
            {itemsData.map((item)=>{
              return(
                    <div className='product' key={item._id}>
                        <img src={item.image} alt={item.name}/>
                        <b>{item.name}</b>
                        <div className="product_info">
                          <p>price</p>
                          <p>₹ {item.price}</p>
                        </div>                        
                         <button onClick={()=>dispatch(addToCart({...item,quantity:1}))}>Add to Cart</button>
                        
                    </div>
                
              )
            })}
            </div> 
                
           
          </div>
        </DefaultLayout>
    </div>
  )
}

export default HomePage
