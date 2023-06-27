import { createSlice } from "@reduxjs/toolkit";
const user= JSON.parse(window.localStorage.getItem("user"));
const userSlice = createSlice({

    name:'user',
    initialState:{
        user:user?user:null,
        loading:false

    },


    reducers:{

        loginStart:(state,action)=>{
            return{
                user:null,
                loading:true
            }
        },
        loginSuccess:(state,action)=>{
         console.log("hit");
            return{
                user:action.payload,
                loading:false
            }
        },
        loginFail:(state,action)=>{
            return{
                user:user,
                loading:false,
            }
        },
        logoutUser:(state,action)=>{
            window.localStorage.removeItem("user");
            return{
                user:null,
                loading:false
            }
        }

    }

});
export const {loginStart,loginSuccess,loginFail,logoutUser}= userSlice.actions;
export default userSlice.reducer;