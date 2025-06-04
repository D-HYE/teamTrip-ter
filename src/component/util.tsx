import React, { useState, useRef, forwardRef, ReactNode, MouseEventHandler} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useLocation } from "react-router-dom";
import hyo from "../scss/hyo.module.scss"

// 게시판 필터
// interface SelectBoxProps {
//   children: ReactNode[];
// }

// export function SelectBox({ children }: SelectBoxProps) {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [selectedValue, setSelectedValue] = useState<string>(
//     React.Children.toArray(children)[0]?.props.children || ""
//   );
//   const selectBoxRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionClick = (option: ReactNode) => {
//     if (typeof option === "string") {
//       setSelectedValue(option);
//     } else if (typeof option === "number") {
//       setSelectedValue(option.toString());
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className={`select_box ${isOpen ? "active" : ""}`} ref={selectBoxRef}>
//       <div
//         className="select_btn d-flex justify-content-between align-items-center gap-1"
//         onClick={toggleDropdown}
//       >
//         <div className="selected_val">{selectedValue}</div>
//         <span className={`arrow ${isOpen ? "rotate" : ""}`}></span>
//       </div>
//       {isOpen && (
//         <div className="option_list">
//           <ul className="d-flex flex-column">
//             {React.Children.map(children, (child) =>
//               React.isValidElement(child)
//                 ? React.cloneElement(child, {
//                     onClick: (e: React.MouseEvent) => {
//                       child.props.onClick?.(e);
//                       handleOptionClick(child.props.children);
//                     },
//                     className: `option ${
//                       selectedValue === child.props.children ? "selected" : ""
//                     }`,
//                   })
//                 : child
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// 항공&호텔 필터
interface FillterBoxProps {
  children: ReactNode | ((args: { closeDropdown: () => void }) => ReactNode);
}

export function FillterBox({ children }: FillterBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className={`select_box ${isOpen ? "active" : ""}`}>
      <div
        className="select_btn flex justify-between items-center gap-4"
        onClick={toggleDropdown}
      >
        <div className="selected_val">필터</div>
        <span className={`arrow ${isOpen ? "rotate" : ""}`}></span>
      </div>
      {isOpen && (
        <div className="option_list">
          <div className="filter_section flex flex-col gap-[1.5rem]">
            {typeof children === "function" ? children({ closeDropdown }) : children}
          </div>
        </div>
      )}
    </div>
  );
}

// 상대시간
export function RelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}달 전`;
  return `${Math.floor(diffInSeconds / 31536000)}년 전`;
}

// 달력
interface CalendarProps {
  onDateChange?: (range: { start: string; end: string }) => void;
}

export function Calendar({ onDateChange }: CalendarProps) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(tomorrow);

  const onChange = (dates: [Date | null, Date | null] | null) => {
    const [start, end] = dates || [null, null];
    setStartDate(start || today);
    setEndDate(end || tomorrow);

    if (onDateChange) {
      onDateChange({
        start: start ? start.toLocaleDateString() : "",
        end: end ? end.toLocaleDateString() : "",
      });
    }
  };

  // forwardRef 타입 지정
  type CustomInputProps = {
    value?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <button className={`${hyo.calendarButton} flex items-center text-trip-white py-[8px] pr-[20px] pl-[10px]`} type="button" onClick={onClick} ref={ref}>
        {value || "날짜 선택"}
      </button>
    )
  );

  return (
    <div className="calendar bg-trip-blue rounded-[5px_30px_30px_5px]">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={<CustomInput />}
        locale={ko}
        dateFormat="yyyy. MM. dd"
      />
    </div>
  );
}

// 계획짜기 탭메뉴
interface TabMenuProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

export function TabMenu({ activeTab, setActiveTab }: TabMenuProps) {
  const location = useLocation();
  const Showonly = location.pathname === "/user/mypage";
  const tabs = [...(Showonly ? ["전체보기"] : []), "항공권", "숙박", "투어", "티켓", "트립카"];

  return (
    <div>
      <ul className={`${hyo.tab_content} flex items-end m-0 p-0 h-[50px] border-b-[3px] border-trip-blue`}>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`${tab === "트립카" ? hyo.tripcar_tab : ""} ${
              activeTab === tab ? hyo.tabClick : ""
            } flex items-center justify-center h-[40px] border-[0.0625rem] border-trip-blue rounded-[1.25rem_1.25rem_0_0] cursor-pointer`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="text-semismall-text text-trip-blue p-4">{tab}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 404 페이지
export function NotFound() {
    return (
        <main className="subMain page_error">
            <div className="container">
                    <div className="bangMark">!</div>
                    <p className="errorNum">404 ERROR</p>
                    <p className="errorDesc">페이지를 찾을 수 없습니다</p>
                        
                    <div className="buttonWrap" >
                        <button onClick={() => window.history.back()} className="button1">이전 페이지</button>
                        <button onClick={() => (window.location.href = "/") } className="button2">메인으로</button>
                        
                    </div>
                    <img src="https://d-hye.github.io/source/img/illustrator/error_bg.svg" alt="404 Error" />
            </div>
        </main>
    );
  }

//준비중 페이지
export function  CommingSoon({ showHeader = false }: { showHeader?: boolean }) {
    return (
        <div className="commingSoon">
            {showHeader && (
            <div className="flex items-center justify-between bg-trip-skyblue px-[0.625rem] py-[1.25rem]">
                <span className="flex items-center font-theJamsil-bold text-mediumbig-text flex-grow">전체보기</span>
                <button className="py-[0.625rem] pr-[1.5rem] pl-[0.75rem] bg-trip-yellow rounded-[0.3215rem_1.25rem_1.25rem_0.3215rem]">
                    <a className="text-semismall-text font-[700] text-trip-blue" href="#none">계획짜기</a>
                </button>
            </div>
            )}
            <div className="flex flex-col justify-center items-center gap-[2.5rem] px-[3.5rem] bg-trip-white">
                <div className="font-theJamsil-extrabold text-trip-blue text-[8rem]">!</div> 
                <img className="max-w-[681px]" src="https://d-hye.github.io/source/img/illustrator/coming_soon.svg" alt="comming_soon" />
                <p className="font-theJamsil-bold text-main-slide text-trip-blue" >준비중 입니다.</p>
                {!showHeader && (
                <div className="flex justify-center gap-[2.5rem]">
                    <button onClick={() => window.history.back()} className="bg-trip-blue py-4 px-[69px] rounded-[5px] shadow-dropShadow"><span className="font-theJamsil-bold text-big-text text-trip-white">이전 페이지</span></button>
                    <button onClick={() => (window.location.href = "/") }className="bg-trip-blue py-4 px-[69px] rounded-[5px] shadow-dropShadow"><span className="font-theJamsil-bold text-big-text text-trip-white">메인으로</span></button>
                </div>
              )}      
            </div>
        </div>
    );
  }