import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ConsultInsert, ConsultSelectOne, ConsultUpdate } from '../api/consult/consult-api';
import { optionprops } from '../constants/property';
import type { ConsultWriteProps } from '../type/consult/consult-type';
import type { ResultProps } from '../type/result/result-type';
import ResultMessage from '../components/ResultMessage';
import "../css/Consult.css";

const ConsultWrite = () => {
    const {consult_id} = useParams();
    const [result, setResult] = useState<ResultProps | null>(null);
    const {register, handleSubmit, reset} = useForm<ConsultWriteProps>();

    const ChangeNumber = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    const Upload = async(data : ConsultWriteProps) => {
        try{
            if(!consult_id){
                await ConsultInsert(data, 'consult');
                setResult({
                    type : "success",
                    message : "방문예약 신청이 완료 되었습니다."
                })
            }else{
                await ConsultUpdate(data, consult_id);
                setResult({
                    type : "success",
                    message : "게시글 수정이 완료 되었습니다."
                })
            }
        }catch{
            setResult({
                type : "error",
                message : "방문예약 신청에 실패했습니다."
            })
        }
    }

    useEffect(() => {
        if(consult_id){
            const load = async() => {
                try{
                    const result = await ConsultSelectOne(consult_id, "consult");
                    reset(result);
                }catch{
                    alert("올바른 접근이 아닙니다.");
                }
            }
            load()
        }
    }, [consult_id])
    return(
        <div id="ConsultWrite">
            {result && <ResultMessage title={"방문예약 신청"} type={result.type} message={result.message} onClose={() => setResult(null)} link={`/consult/list`} />}
            <h1>방문예약 신청</h1>
            <form onSubmit={handleSubmit(Upload)} autoComplete='off'>
                <div className="item">
                    <label htmlFor="subject">제목</label>
                    <input type="text" {...register("subject", {required : true})} className="input" />
                </div>
                <div className="item">
                    <label htmlFor="consult_type">매물유형</label>
                    <select {...register("consult_type")} id="consult_type" className="input">
                        <option value="">매물유형을 선택해 주세요</option>
                        {optionprops.typeArr.map((val) => {
                            return(
                                <option key={val} value={val}>{val}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="consult_price">가격유형</label>
                    <select {...register("consult_price")} id="consult_price" className="input">
                        <option value="">가격유형을 선택해 주세요</option>
                        {optionprops.dealArr.map((val) => {
                            return(
                                <option key={val} value={val}>{val}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="user_name">이름</label>
                    <input type="text" {...register("user_name", {required : true})} className="input" />
                </div>
                <div className="item">
                    <label htmlFor="user_phone">연락처</label>
                    <input type="text" {...register("user_phone", {required : true})} className="input" onChange={ChangeNumber}/>
                </div>
                <div className="item">
                    <label htmlFor="content">내용</label>
                    <textarea {...register("content")}  id="content" className="input full"></textarea>
                </div>
                <ul className="btn-wrap">
                    <li><button type="submit" className="submit-btn">예약 신청</button></li>
                    <li><Link to='/consult/list'>목록</Link></li>
                </ul>
            </form>
        </div>
    )
}

export default ConsultWrite;