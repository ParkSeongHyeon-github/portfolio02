import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ConsultInsert, ConsultSelect } from '../api/consult/consult-api';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { QuickConsultWrite, QuickConsultProps } from "../type/consult/consult-type";
import type { ResultProps } from '../type/result/result-type';
import ResultMessage from '../components/ResultMessage';
import { Autoplay } from "swiper/modules";
import 'swiper/swiper.css';

const Section02 = () => {

    const [ckAgree, setCkAgree] = useState<boolean>(false);
    const [result, setResult] = useState<ResultProps | null>(null);
    const [quickData, setQuickData] = useState<QuickConsultProps[] | null>(null);

    const {register, handleSubmit ,reset} = useForm<QuickConsultWrite>();

    const ChangeNumber = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    const Upload = async(data : QuickConsultWrite) => {
        const newData = {...data, subject : `${data.user_name}님의 상담신청입니다.`}
        if(!ckAgree){
            setResult({
                type : 'error',
                message : "개인정보 수집 및 이용에 동의가 필요합니다"
            })
            return;
        }
        try{
            await ConsultInsert(newData, 'quick_consult');
            setResult({
                type : 'success',
                message : "빠른 상담 문의 신청이 완료 되었습니다"
            })
            reset()
        }catch{
            setResult({
                type : 'error',
                message : "빠른 상담 문의 신청에 실패했습니다 \n 다시 시도해 주세요."
            })
        }
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await ConsultSelect({page : 1, limit : 8, table : 'quick_consult'})
                setQuickData(result.data);
            }catch{
                alert("올바른 접근이 아닙니다.");
            }
        }
        load()
    }, [])

    return(
        <div id="Section02">
            {result && <ResultMessage title={"빠른 상담 문의"} type={result.type} message={result.message} onClose={() => setResult(null)} link={'/'} />}
            <div className="wrap">
                <div className="right" data-aos="fade-right" data-aos-duration={1200}>
                    <h2>
                        <span>부동산의 전문가가 함께</span><br />
                        원하는 매물을 찾아드립니다.
                    </h2>
                    <Swiper loop={true} speed={1000} direction={'vertical'} slidesPerView={4} spaceBetween={10} autoplay={{ delay: 1500, disableOnInteraction: false }} modules={[Autoplay]}>
                     {quickData && quickData.map((val) => {
                        return(
                            <SwiperSlide>
                                <span>상담문의</span>
                                <p>{val.subject}</p>
                                <span>신규</span>
                            </SwiperSlide>
                        )
                     })}
                    </Swiper>
                </div>
                <div className="left">
                    <div className="tit" data-aos="fade-left" data-aos-duration={1200}>
                        <h2>빠른 상담 문의</h2>
                        <p>담당자와 1:1 상담이 가능합니다</p>
                    </div>
                    <form onSubmit={handleSubmit(Upload)} autoComplete='off' data-aos="fade-left" data-aos-duration={1200}>
                        <div className="input-wrap">
                            <label htmlFor="user_name" className="sound_only">이름</label>
                            <input type="text" {...register("user_name", {required : true})} id="user_name" placeholder="이름"/>
                            <label htmlFor="user_phone" className="sound_only">연락처</label>
                            <input type="text" {...register("user_phone", {required : true})} id="user_phone" placeholder="연락처" onChange={ChangeNumber}/>
                        </div>
                        <label htmlFor="content" className="sound_only">내용</label>
                        <textarea {...register("content", {required : true})} id="content" placeholder="내용을 입력해주세요"></textarea>
                        <div className="agree-wrap">
                            <input type="checkbox" id="agree" onChange={() => setCkAgree(prev => !prev)} />
                            <label htmlFor="agree">개인정보 수집 및 이용에 동의합니다.</label>
                        </div>
                        <button type="submit">상담 신청하기</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Section02;