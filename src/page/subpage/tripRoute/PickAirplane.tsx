import React, { useState, useEffect } from 'react';
// import { StyledBtn } from '../../styleComponents/ui';
// import Barslider from "../../components/Barslider";
// import element from "../../scss/elements.module.scss";
import { CommingSoon , FilterBox } from '../../../component/util';

interface Airline {
  name: string;
  logo: string;
}

// 항공편 정보
interface FlightInfo {
  depTime: string;
  arrTime: string;
  price: string;
}

// 항공 상품 정보
interface FlightProduct {
  productId: string;
  go: FlightInfo;
  back: FlightInfo;
  created: string;
  updated: string;
}

// 공항 정보
interface Airport {
  [city: string]: {
    iata: string;
  };
}

// 전체 airplane 데이터 타입
interface AirplaneData {
  airways: {
    [code: string]: Airline;
  };
  flightproduct: FlightProduct[];
  airports: Airport;
}

// PickAirplane Props 타입
interface PickAirplaneProps {
  airplane: AirplaneData;
  airport: Airport;
  departureCity : string;
  arrivalCity : string;
  activeTab: string;
}

const PickAirplane :React.FC<PickAirplaneProps> = ({departureCity, arrivalCity, airplane, airport}) => { 
 

    const [isOneWay, setIsOneWay] = useState(false);
    
    const toggleOneWay = () => {
    setIsOneWay((prev) => !prev);
    };

    //
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);  

    useEffect(() => {
        if (!airplane?.airways || !airplane?.flightproduct) return;
    
        const airlineKeys = Object.keys(airplane.airways);
        const roundTripProducts = airplane.flightproduct.filter(product => product.back);
    
        const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
        const randomAirlines = Array.from({ length: 4 }, () => getRandomItem(airlineKeys))
            .map(key => airplane.airways[key]);
    
        const randomProducts = Array.from({ length: 4 }, () => getRandomItem(roundTripProducts));
    
        setSelectedAirlines(randomAirlines);
        setSelectedProducts(randomProducts);
    }, [airplane]);
    //찜기능
    const [isHeart, setIsHeart] = useState(false);
    const toggleHeart = (index) => {
    setIsHeart((prev) =>({...prev,[index]:!prev[index]}) );}

    //city to IATA
    function getIataCode(city) {
        if (!city) return null;  // 입력 전엔 null (아무것도 안 보여줌)
        return airport[city]?.iata || null; // 없으면 null 반환
    }
    const depIATA = getIataCode(departureCity);
    const arrIATA = getIataCode(arrivalCity);

    // IATA 코드가 없으면 빈 화면 표시
    if (depIATA === null || arrIATA === null) {
      return (<CommingSoon showHeader={true}></CommingSoon>)
  }


    return (
        <>
        <div className="filter_title d-flex justify-content-between align-items-center">
          <ul className="d-flex align-items-center gap-3">
            <li className="plane_title_all">전체보기</li>
            <li>
              <FillterBox>
                {({ closeDropdown }) => (
                  <>
                    <div className="d-flex flex-column gap-2">
                      <div className="filter_section_title">
                        <span className="title">유형</span>
                      </div>
                      <ul className="d-flex gap-3">
                        {[
                          {
                            label: "왕복",
                            checked: !isOneWay,
                            onChange: toggleOneWay,
                          },
                          {
                            label: "편도",
                            checked: isOneWay,
                            onChange: toggleOneWay,
                          },
                        ].map(({ label, checked, onChange }) => (
                          <li
                            key={label}
                            className="filter_radio d-flex align-items-center gap-1"
                          >
                            <label className={element.checkbox_label}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={onChange}
                              />
                              <span>{label}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="filter_section_title">
                        <span className="title">경유</span>
                      </div>
                      <ul className="d-flex gap-3">
                        {["직항", "1회이상 경유"].map((label) => (
                          <li
                            key={label}
                            className="filter_radio d-flex align-items-center gap-1"
                          >
                            <label className={element.checkbox_label}>
                              <input type="checkbox" />
                              <span>{label}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="filter_section_title ">
                        <span className="title">시간대</span>
                      </div>
                      {["가는 날", "오는 날"].map((day) => (
                        <div key={day}>
                          <p>{day}</p>
                          <div className="timeTable ">
                            <div
                              id={`sliderbar_${
                                day === "가는 날" ? "go" : "back"
                              }`}
                            ></div>
                            <Barslider></Barslider>
                          </div>
                        </div>
                      ))}
                    </div>
                    <li className="filter_radio d-flex align-items-center gap-1">
                      <label className={element.checkbox_label}>
                        <input type="checkbox" />
                        <span
                          className="text-blue"
                          style={{
                            fontSize: "var(--semismall-text)",
                            fontWeight: "700",
                          }}
                        >
                          찜 모아보기
                        </span>
                      </label>
                    </li>
                    <div className="d-flex justify-content-center">
                      <StyledBtn
                        padding={[0.5, 1]}
                        fontSize="var(--semismall-text)"
                        fontWeight="700"
                        color="var(--trip-yellow)"
                        onClick={closeDropdown}
                      >
                        저장
                      </StyledBtn>
                    </div>
                  </>
                )}
              </FillterBox>
            </li>
          </ul>
          <div className="d-flex gap-2">
            <div className="front_btn">
              <a href="#none">계획짜기</a>
            </div>
          </div>
        </div>   
        
            <div className="plane_listbox d-flex flex-column" id="airplaneArea">
                {selectedAirlines.map((selectedAirline, index) => (
                <div className="plane_list d-flex align-items-end justify-content-between" key={index}>
                    <ul className="plane_left d-flex justify-content-center flex-column gap-2">
                        <li className="d-flex" style={{ gap : "5rem"}}>
                            <div className="planeLogo_box d-flex flex-column align-items-center gap-2"> 
                                <div className="planeLogo">
                                    {selectedAirline && <img src={selectedAirline.logo} alt={selectedAirline.name} />}
                                </div>
                                <span>{selectedAirline?.name}</span>
                            </div>
                            <div className="plane_section_time d-flex justify-content-between align-items-center">
                                <div className="plane_time d-flex flex-column align-items-center gap-1">
                                    <p className="airport">{depIATA}</p>
                                    <p>{selectedProducts[index]?.go?.depTime}</p>
                                </div>
                                <i clasName="arrow-right"></i>
                                <div className="plane_time d-flex flex-column align-items-center gap-1">
                                    <p className="airport">{arrIATA}</p>
                                    <p>{selectedProducts[index]?.go?.arrTime}</p>
                                </div>
                            </div>
                        </li>
                    {!isOneWay && selectedProducts[index]?.back && (
                        <li className="d-flex" style={{ gap : "5rem"}}>
                            <div className="planeLogo_box d-flex flex-column align-items-center gap-2">
                                <div className="planeLogo">
                                    {selectedAirline && <img src={selectedAirline.logo} alt={selectedAirline.name} />}
                                </div>
                                <span>{selectedAirline?.name}</span>
                            </div>
                            <div className="plane_section_time d-flex justify-content-between align-items-center rel">
                                <div className="plane_time d-flex flex-column align-items-center gap-1">
                                    <p className="airport">{arrIATA}</p>
                                    <p>{selectedProducts[index]?.back?.depTime}</p>
                                </div>
                                <i className="arrow-right"></i>
                                <div className="plane_time d-flex flex-column align-items-center gap-1">
                                    <p className="airport">{depIATA}</p>
                                    <p>{selectedProducts[index]?.back?.arrTime}</p>
                                </div>
                            </div>
                        </li>
                        )}
                    </ul>
                
            
                    
                    {/* 가격표시 */}
                    <div className="plane_right d-flex flex-column justify-content-end align-items-end gap-2">
                        <div className="totalPrice">
                        {isOneWay ? (      
                            <span>₩{parseInt(selectedProducts[index]?.go?.price.replace(',', ''))
                                .toLocaleString()}</span>
                        ) : (
                            <span>
                                ₩{(parseInt(selectedProducts[index]?.go?.price.replace(',', '')) +
                                parseInt(selectedProducts[index]?.back?.price.replace(',', '')))
                                .toLocaleString()}
                            </span>
                        )}
                        </div>
                        <StyledBtn padding={[0.625, 1.5]} fontSize="var(--semismall-text)" fontWeight="700" color="var(--trip-yellow)">계획에 담기</StyledBtn>
                        <div className="share_heart_group d-flex align-items-end justify-content-end gap-1">
                        <button className="share-btn" alt="공유">
                            <span className="share_icon"></span>
                        </button> 
                        <button className="heart-btn" alt="찜" onClick={()=>toggleHeart(index)}>
                            <span className={isHeart[index] ? "heart_icon Heart" : "heart_icon"}></span>
                        </button>
                    </div> 
                    </div>
                </div>
                ))}
            </div>
            </>
    );

};

export default PickAirplane;