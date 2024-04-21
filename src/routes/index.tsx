import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import UserRouter from './user/UserRouter';

const MainRouter=()=>{
    return(  
            <Routes>
                <Route path="/user/*" element={<UserRouter/>}/>
            </Routes>
    )
}

export default MainRouter

