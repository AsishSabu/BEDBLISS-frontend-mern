import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import UserRouter from './user/UserRouter';
import OwnerRouter from './owner/OwnerRouter';
import "../router.css"

const MainRouter=()=>{
    return( 
        <div className="main">
             <Routes>
                <Route path="/user/*" element={<UserRouter/>}/>
                <Route path="/admin/*" element={<UserRouter/>}/>
                <Route path="/owner/*" element={<OwnerRouter/>}/>
            </Routes>
        </div> 
           
    )
}

export default MainRouter

