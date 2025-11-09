import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSLice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";



const appStore=configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connection:connectionSlice,
        request:requestSlice,

    }

})
export default appStore;