import React, { useState } from "react";
// import { Link } from "react-router-dom";

import PickAirplane from "./PickAirplane";
// import PickHotel from "./PickHotel";
// import Wishlist from "../user/Wishlist";
import PlanMakerForm, {PlanMakerInfo} from "./PlanMakerForm";
import {TabMenu } from "../../../component/util";
import airlineData from "../../../data/airlineData.json";


interface TripDate {
  start: Date | null;
  end: Date | null;
}

const PlanMaker: React.FC = () => {
  const [formState, setFormState] = useState<{
    tripDate: TripDate; //여행일
    departureCity: string; //출발도시
    arrivalCity: string; //도착도시
    planConfirmed: boolean; //
    count : number; //인원
  }>({
    tripDate: { start: null, end: null },
    departureCity: '',
    arrivalCity: '',
    planConfirmed: false,
    count: 1
  });

  type ShowFormState = boolean;
  const [showForm, setShowForm] = useState<ShowFormState>(true); //폼 결과&폼 노출 여부

  //tab 메뉴 상태
  const [activeTab, setActiveTab] = useState<string>("항공권");


  return (
    <>
      <div className="flex flex-col gap-[2.5rem]">
      {showForm ? <PlanMakerForm        //부모의 상태변수 props로 전달
          formState = { formState }
          setFormState = { setFormState }
          setShowForm = { setShowForm }
        />
       : <PlanMakerInfo
          formState = { formState }
          setShowForm = { setShowForm } />
      }
        <div className="flex flex-col gap-4">
        {showForm &&
        <span style={{fontSize:"var(--semismall-text)", fontWeight:"500"}} >계획에 필요한 상품을 추가해보세요</span>
        } 
        <TabMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        </div>
      </div>
      <div>
          <PickAirplane 
            activeTab={activeTab}
            departureCity={formState.departureCity as string}
            arrivalCity={formState.arrivalCity as string}
            airplane = {airlineData["airplane"]}
            airport = {airlineData["airplane"]["airports"]}
          />
        {/* {activeTab === "숙박" &&formState.planConfirmed && ( <PickHotel />)}  */}
      </div> 
    </>
  );
};
export default PlanMaker;
