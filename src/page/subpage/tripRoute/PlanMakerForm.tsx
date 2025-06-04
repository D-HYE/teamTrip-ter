import React from "react";
// import { Link } from "react-router-dom";
import { Calendar} from "../../../component/util";
// import { StyledBtn } from "../../styleComponents/ui";
import hyo from "../../../scss/hyo.module.scss";

interface TripDate {
    start: Date | null;
    end: Date | null;
  }
  
  interface FormState {
    tripDate: TripDate;
    departureCity: string;
    arrivalCity: string;
    planConfirmed: boolean;
    count: number;
  }
  
  type PlanMakerFormProps = {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  type PlanMakerInfoProps = {
    formState: FormState;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  };

  


const PlanMakerForm: React.FC<PlanMakerFormProps> = ({formState ,setFormState, setShowForm}) => {
    
    const [inputValues, setInputValues] = React.useState<{ [key: string]: string }>({
        departureCity: '',
        arrivalCity: '',
        // 필요 시 다른 필드도 추가
      });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
        ...prev,
        [name]: value,
    }));
    };
  

  return (
    <div className="flex h-[254px]">
    <div className={`${hyo.formArea} flex flex-col bg-trip-white rounded-[1.875rem] shadow-[1px_1px_5px_0px_rgba(0,0,0,0.25)] relative flex-grow`}>
    <div className="my-auto mx-0">
      <ul className="flex gap-[1.5rem] px-[1.5rem]">
        <li>
          <div className="inputTripSpot flex flex-col gap-[32px]">
            <h6 className="font-[600] text-small-text">지역을 선택해주세요</h6>
            <div className="formWrap">
              <ul className="flex flex-col gap-4">
                <li className="flex flex-col gap-[0.5rem]">
                  <b className="text-blue">출발</b>
                  <div className="flex border-b border-[var(--trip-blue)]">
                  <input
                    type="text"
                    placeholder="도시를 입력하세요"
                    name="departureCity"
                    value={inputValues.departureCity}
                    onChange={handleInputChange}
                    />

                    <button
                    className={`${hyo.icon_search}`}
                    onClick={() =>
                        setFormState(prev => ({
                        ...prev,
                        departureCity: inputValues.departureCity
                        }))
                    }
                    ></button>
                  </div>
                </li>
                <li className="flex flex-col gap-[0.5rem]">
                  <b className="text-blue">도착</b>
                  <div className="flex border-b border-[var(--trip-blue)]">
                  <input
                    type="text"
                    placeholder="도시를 입력하세요"
                    name="arrivalCity"
                    value={inputValues.arrivalCity}
                    onChange={handleInputChange}
                    />
                    <button
                    className={`${hyo.icon_search}`}
                    onClick={() => {
                        setFormState(prev => ({
                        ...prev,
                        arrivalCity: inputValues.arrivalCity,
                        }));
                        console.log("클릭 직후 arrivalCity:", formState.arrivalCity); // formState 아님!
                    }}
                    ></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="flex flex-col justify-between">
          <div className={`flex flex-col gap-4`}>
            <h6 className="font-[600] text-small-text">날짜를 선택해주세요</h6>
            <Calendar
                onDateChange={(range) => {
                setFormState(prev => ({
                    ...prev,
                    tripDate: {
                    start: range.start ? new Date(range.start) : null,
                    end: range.end ? new Date(range.end) : null,
                    },
                }));
                }}
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <h6 className="font-[600] text-small-text">인원을 선택해주세요</h6>
            <div className="flex justify-between items-center gap-4">
              <button className={`rounded-[5px] bg-[var(--trip-blue)] bg-[url('https://raw.githubusercontent.com/D-HYE/trip-ter/c5c3f96782670bff5d39dfee1dda837c4e85b78c/img/icon/Minus.svg')] bg-no-repeat bg-center bg-[length:16px_16px] p-5`} onClick={()=>{
                setFormState(prevState => ({
                    ...prevState,
                    count: prevState.count - 1,
                  }));
                }}>
              </button>
              <div className="text-small-text font-theJamsil-regular">{formState.count}</div>
              <button className={`rounded-[5px] bg-[var(--trip-blue)] bg-[url('https://raw.githubusercontent.com/D-HYE/trip-ter/c5c3f96782670bff5d39dfee1dda837c4e85b78c/img/icon/Plus.svg')] 
             bg-no-repeat bg-center bg-[length:16px_16px] p-5`} onClick={()=>{
                setFormState(prevState => ({
                    ...prevState,
                    count: prevState.count + 1,
                  }));
                }}>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
    <div className={`${hyo.confirmArea} flex flex-col w-[219px] bg-trip-yellow rounded-[1.875rem] shadow-[1px_1px_5px_0px_rgba(0,0,0,0.25)] relative`}>
      <ul className="flex flex-col gap-[1.25rem] pt-[24px]">
      <li className="flex gap-4 justify-center text-center font-[700] text-semismall-text">{formState.arrivalCity || "여행지"}</li>
      <li className="tripDate flex flex-col items-center gap-4 text-center">
        <span>{formState.tripDate.start ? formState.tripDate.start.toLocaleDateString() : ""}</span><span>~{formState.tripDate.end ? formState.tripDate.end.toLocaleDateString() : ""}</span>
      </li>
      <li className="headCount flex gap-4 justify-center text-center">
        인원 <span>{formState.count}</span>명
      </li>
      </ul>
      <div className="flex justify-center">
       <button className="py-[0.625rem] px-[1.5rem] rounded-[0.625rem] bg-trip-blue text-trip-yellow text-semismall-text font-weight-700"
            onClick={() => {setShowForm(false)}}>계획에 담기</button>
      </div>
    </div>
</div>
  );
};

export const PlanMakerInfo: React.FC<PlanMakerInfoProps> = ({ formState, setShowForm }) => {
    return (
        <div className="flex items-center h-[48px] bg-trip-blue rounded-[1.875rem] px-[1.25rem] py-[0.625rem] mb-[2.5rem] gap-[5rem]">
                  <ul className="plan_info_detail flex gap-[5rem] order-2">
                    <li className="text-semismall-text text-trip-white font-[500]">{formState.departureCity || "출발"} - {formState.arrivalCity || "도착"}</li>
                    <li className="text-semismall-text text-trip-white font-[500]">
                      {formState.tripDate.start ? formState.tripDate.start.toLocaleDateString() : "출발 날짜 미정"} - 
                      {formState.tripDate.end ? formState.tripDate.end.toLocaleDateString() : "도착 날짜 미정"}
                    </li>
                    <li className="text-semismall-text text-trip-white font-[500]">인원 {formState.count}명</li>
                  </ul>
                  <ul className="flex justify-end order-3 flex-grow">
                    <li>
                      <span className="text-trip-white text-small-text font-[400] cursor-pointer" onClick={ ()=> {setShowForm(true)} }>수정하기</span>
                    </li>
                  </ul>
              </div>
    );
};


export default PlanMakerForm;