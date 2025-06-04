import React from "react";

import { Route, Routes } from 'react-router-dom';
import Index from "../page/mainpage/Index"
import SubContents from "../page/subpage/SubContents"
import User from "../page/subpage/user/User";

import allData from '../data/allData.json'

import {AllData, MyFeelterQ} from '../types/common'


const Contents:React.FC = () => {
    return (
        <Routes>
           <Route path="/" element={<Index id="mainPage" allData={allData as AllData}/>} />
           <Route path="/user/:page?" element={<User />} />
           <Route path="/bbs/:tab?" element={<SubContents id="bbs" />} />
           <Route path="/tripRoute/:tab?" element={<SubContents id="tripRoute" myfilter={allData.myfeelterQ as MyFeelterQ }  />} />
           <Route path="/tripTalk/:tab?" element={<SubContents id="tripTalk" />} />
           <Route path="/tripterEvent/:tab?" element={<SubContents id="tripterEvent" />} />

           {/* 최적화 해야 하는 부분 */}
           <Route path="/products/airplane/:tab?" element={<SubContents id="airplane" />} />
           <Route path="/products/accommodation/:tab?" element={<SubContents id="accommodation" />} />
           <Route path="/products/reservation/:tab?" element={<SubContents id="reservation" />} />

        </Routes>
    );
};

export default Contents;