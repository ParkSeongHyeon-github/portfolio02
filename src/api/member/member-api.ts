const baseUrl = import.meta.env.VITE_API_BASE_URL;
import type { RegisterWrite } from "../../type/member/member-type";
import type { LoginProps } from "../../type/member/member-type";

export const MemberInsert = async(data : RegisterWrite) => {
    const res = await fetch(baseUrl+`/member`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(data)
    })
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return true;
}

export const LoginCk = async(data : LoginProps) => {
    const res = await fetch(baseUrl + `/member?mb_id=${data.login_id}&mb_password=${data.login_password}`);
    
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return await res.json();
}