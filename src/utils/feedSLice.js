import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
            
        },
        removeFeed:(state,action)=>{
            const newFeed=state.filer(user=>user._id!==action.payload.id)
            return newFeed;
            console.log(newFeed);
        }

    }
    

});
export const {addFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;