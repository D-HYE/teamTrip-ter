import React from 'react';
import MyFeelter from './MyFeelter';
import PlanMaker from './PlanMaker';

import { MyFeelterQ } from '../../../types/common';

export interface TripRouteProps {
    tab: string;
    myfeelter?: MyFeelterQ; // optional로 받도록 지정
}

const TripRoute:React.FC<TripRouteProps> = ({tab, myfeelter}) => {
    
    
    return (
        <div>
            {tab === 'myFeelter' ? <MyFeelter myfeelter={myfeelter || []}/> : <PlanMaker/>}
            
        </div>
    );
};

export default TripRoute;