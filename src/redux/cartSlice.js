import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        loading:false,
        cartItems:[],
        quantity:0,
        totalPrice:0
    },

    reducers:{
        addToCart:(state,action)=>{
            const filter = state.cartItems.find(item=>item._id===action.payload._id);
            console.log(filter);
            if(filter){
                message.warning(`${action.payload.name} is already in cart`)
                state.cartItems=state.cartItems
            }
            else{
            message.success("Item added to cart")
            state.cartItems.push(action.payload)
            state.quantity=1
            }
        },
        removeFromCart:(state,action)=>{
           const filter = state.cartItems.filter(item=>item._id!==action.payload);
            state.cartItems=filter;
            state.quantity=state.cartItems.length
        },
        incrementCart:(state,action)=>{
            state=state;
            state.cartItems.flat().forEach((item)=>{
                
                if(item._id===action.payload){
                    
                    item.quantity+=1
                }
                

        });
        },
        emptyCart:(state,action)=>{
                state.cartItems=[];
        },
        decrementCart:(state,action)=>{
            state=state;
            state.cartItems.flat().forEach((item)=>{
                
                if(item._id===action.payload){
                    
                    item.quantity-=1;
                   
                }
                

        });
        },
        

    },
});
export const {addToCart,removeFromCart,incrementCart,decrementCart,emptyCart}= cartSlice.actions;
export default  cartSlice.reducer;