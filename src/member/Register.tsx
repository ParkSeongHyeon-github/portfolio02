import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MemberInsert } from '../api/member/member-api';
import ResultMessage from '../components/ResultMessage';
import type { RegisterWrite } from '../type/member/member-type';
import type { ResultProps } from '../type/result/result-type';
import "./member.css";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const {register, handleSubmit, watch} = useForm<RegisterWrite>();
    const [ckId, setCkId] = useState<boolean>(false);
    const [ckPassword, setCkPassword] = useState<string>('');
    const [result, setResult] = useState<ResultProps | null>(null);
    const id = watch("mb_id");
    const password = watch("mb_password");
    const mbName = watch("mb_name");

    const CheckId = async() => {
        if(!id){
            alert("입력된 아이디가 없습니다.");
            return;
        }
        try{
            const res = await fetch(baseUrl + `/member?mb_id=${id}`);
            const memberId = await res.json();
            if(memberId.length > 0){
                alert("이미 존재하는 아이디입니다");
                return;
            }else{
                alert("아이디 중복 확인이 완료 되었습니다.");
                setCkId(true);
            }
        }catch{
            alert("올바른 접근이 아닙니다.");
        }
    }

    const Upload = async(data : RegisterWrite) => {
        if(!ckId){
            setResult({
                type : "error",
                message : "아이디 중복확인이 완료 되지 않았습니다."
            })
            return;
        }
        if(password !== ckPassword){
            setResult({
                type : "error",
                message : "비밀번호가 일치하지 않습니다."
            })
            return;
        }
        try{
            await MemberInsert(data);
             setResult({
                type : "success",
                message : `${mbName}님 환영합니다 \n회원가입이 완료 되었습니다.`
            })
        }catch{
             setResult({
                type : "error",
                message : "회원가입에 실패했습니다."
            })
        }
    }
    return(
        <div id="register" className="page">
            {result && <ResultMessage title={"회원가입"} type={result.type} message={result.message} onClose={() => setResult(null)} link={'/login'} />}
            <h1>SIGN UP <span>회원가입 정보입력</span></h1>
            <form onSubmit={handleSubmit(Upload)}>
                <div className="mb info">
                    <h2>사이트 이용정보 입력</h2>
                    <div className="member-id">
                        <label htmlFor="mb_id" className="sound_only">아이디</label>
                        <input {...register("mb_id", {required : true})} placeholder='아이디'/>
                        <button type="button" onClick={CheckId}>중복확인</button>
                    </div>
                    
                    <label htmlFor="mb_password" className="sound_only">비밀번호</label>
                    <input type="password" {...register("mb_password", {required : true,    pattern: {value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,message: "영문과 숫자를 모두 포함해야 합니다."}}) } placeholder="비밀번호 (영문 및 숫자가 포함되어 있어야 합니다.)"/>
                    
                    <label htmlFor="mb_password_ck" className="sound_only">비밀번호 확인</label>
                    <input type="password" value={ckPassword} placeholder="비밀번호 확인" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCkPassword(e.target.value)}/>
                </div>
                <div className="user info">
                    <h2>개인정보 입력</h2>
                    <label htmlFor="mb_email" className="sound_only">E-mail</label>
                    <input {...register("mb_email", {required : true})} placeholder="E-mail"/>

                    <label htmlFor="mb_name" className="sound_only">성함</label>
                    <input {...register("mb_name", {required : true})} placeholder="성함" />

                    <label htmlFor="mb_phone" className="sound_only">연락처</label>
                    <input {...register("mb_phone", {required : true})} placeholder="연락처" />
                </div>
                <div className="btn-container">
                    <Link to='/'>취소</Link>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Register;