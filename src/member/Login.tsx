import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginCk } from '../api/member/member-api';
import type { LoginProps } from '../type/member/member-type';
import type { ResultProps } from '../type/result/result-type';
import ResultMessage from '../components/ResultMessage';
import "./member.css";

interface UserProps {
  setUser: (user : string | null) => void;
}
const Login = ({ setUser } : UserProps) => {
    const [result, setResult] = useState<ResultProps | null>(null);
    const {register, handleSubmit} = useForm<LoginProps>();
    const Upload = async(data : LoginProps) => {
        try{
            const result = await LoginCk(data);
            if(result.length > 0){
                if(result[0]['mb_id'] === 'admin'){
                    localStorage.setItem("mb_level" , "10");
                    setUser("10");
                }else{
                    localStorage.setItem("mb_level" , "2");
                    setUser("2");
                }
                setResult({
                    type : "success",
                    message : "로그인에 성공했습니다."
                })
            }else{
                setResult({
                    type : "error",
                    message : "아이디 또는 비밀번호가 일치하지 않습니다."
                })
            }
        }catch{
            setResult({
                type : "error",
                message : "로그인에 실패했습니다."
            })
        }
    }

    return(
        <div id="login" className="page">
            {result && <ResultMessage title={"로그인"} type={result.type} message={result.message} onClose={() => setResult(null)} link={'/'} />}
            <h1>MEMBER LOGIN</h1>
            <form onSubmit={handleSubmit(Upload)}>
                <label htmlFor="login_id" className="sound_only">아이디</label>
                <input type="text" {...register("login_id", { required : true})} placeholder="아이디" />
                <label htmlFor="login_password" className="sound_only">비밀번호</label>
                <input type="password" {...register("login_password", {required : true})} placeholder="비밀번호"/>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login;