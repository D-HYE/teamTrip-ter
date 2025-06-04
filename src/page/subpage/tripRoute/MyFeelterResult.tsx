import React from 'react';
import { Link} from 'react-router-dom';
import hyo from '../../../scss/hyo.module.scss'

interface MyFeelterResultProps {
    answers: Record<string, string | number>;
    onRestart: () => void;
}

const MyFeelterResult:React.FC<MyFeelterResultProps> = ({answers, onRestart}) => {
    const Submit = (e:React.FormEvent) =>{
        e.preventDefault();
        alert("결과가 저장되었습니다!");
    }
    return (
        <div className="p-[20px] xs:px-0 xs:py-[80px] flex flex-col gap-[40px]" id="myftresult">
            <div className='flex flex-col justify-center gap-[40px]'> 
                <h3 className="flex justify-center items-center text-medium-text font-[700] text-center">여행자님께 <wbr />추천드리는 여행지입니다.</h3>
                <div className='flex justify-center'>
                <a href="#none" className={`${hyo.img_wrap} flex justify-center items-center relative w-[360px] h-[240px] rounded-[30px]`}>
                <span className='relative text-semismall-text '>여행지</span>
                </a>
                </div>
            </div>        
            <div>
                <ul className="flex justify-center items-center gap-[20px]">
                    <li onClick={onRestart} className='order-1 w-1/2 xs:w-auto'>
                        <button className='text-trip-blue text-semismall-text p-[20px] rounded-[30px] border border-trip-blue bg-trip-white'>다시하기</button>
                    </li>
                    <li className='order-3 xs:order-2 w-full xs:w-auto'>
                        <form className="" onSubmit={Submit}>
                            <input type="hidden" name='answers' value={JSON.stringify(answers)} />
                            <button type="submit" className='bg-trip-blue text-trip-yellow p-[20px] rounded-[30px] text-semismall-text'>결과 저장하기</button>
                            {/* 비회원 일 경우 로그인(회원가입) 페이지로 넘어감  */}
                        </form>    
                    </li>
                    <li className='order-2 xs:order-3 w-1/2 xs:w-auto '><button className='bg-trip-yellow text-trip-blue text-semismall-text p-[20px] rounded-[30px] '>공유하기</button></li>
                </ul>        
            </div>
       
        
            <div className={`review flex flex-col relative ${hyo.before_login}`}>
                <ul className="review-list flex gap-[20px] px-[30px] justify-center">
                    <li className='flex flex-col gap-4'>
                        <img className='rounded-[20px] w-[220px] h-[200px] object-cover' src="https://d-hye.github.io/source/img/review/review21.jpg" alt="후기이미지" />
                        <div className='flex flex-col gap-4'>
                            <strong className='flex gap-4'>닉네임<p>★★★★★</p></strong>
                            <p>후기 내용</p>
                        </div>
                        <Link to="/tripTalk/findReview" className='flex justify-center'>
                         <button className='py-[12px] px-[24px] bg-trip-blue text-trip-white text-small-text rounded-[5px]'>보러가기</button>
                        </Link>
                    </li> 
                    <li className='flex flex-col gap-4'>                      
                        <img className='rounded-[20px] w-[220px] h-[200px] object-cover' src="https://d-hye.github.io/source/img/review/review30.jpg" alt="후기이미지" />
                        <div className='flex flex-col gap-4'>
                            <strong className='flex gap-4'>닉네임<p>★★★★★</p></strong>
                            <p>후기 내용</p>
                        </div>
                         <Link to="/tripTalk/findReview" className='flex justify-center'>
                         <button className='py-[12px] px-[24px] bg-trip-blue text-trip-white text-small-text rounded-[5px]'>보러가기</button>
                        </Link>
                    </li> 
                    <li className='flex flex-col gap-4'>                                     
                        <img className='rounded-[20px] w-[220px] h-[200px] object-cover' src="https://d-hye.github.io/source/img/review/review24.jpg" alt="후기이미지" />
                        <div className='flex flex-col gap-4'>
                            <strong className='flex gap-4'>닉네임<p>★★★★★</p></strong>
                            <p>후기 내용</p>
                        </div>
                         <Link to="/tripTalk/findReview" className='flex justify-center'>
                         <button className='py-[12px] px-[24px] bg-trip-blue text-trip-white text-small-text rounded-[5px]'>보러가기</button>
                        </Link>
                    </li>                                
                </ul>
                <div className={`absolute w-full h-full justify-center z-[100] flex flex-col text-center gap-[32px]`}>
                    <h3 className='text-medium-text font-700'>트립터 여행자님들의 계획과 후기를 확인해보세요!</h3>
                    <Link  to="/user/login"><button className="bg-trip-blue text-semismall-text text-trip-yellow px-[40px] py-[20px] rounded-[30px]">로그인 하기</button></Link>
                </div> 
            </div>
        </div>
    );
};

export default MyFeelterResult;