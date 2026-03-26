const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from "react-feather";

interface userProps {
    user_name : string,
    user_phone : string,
}

interface VerifyProps {
    verify : string | null,
    onClose : () => void
}

const ConsultVerify = ({verify, onClose} : VerifyProps) => {
    const nav = useNavigate();
    const [verifyInfo, setVerifyInfo] = useState<userProps>({
        user_name : '',
        user_phone : '',
    });


    const ChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value
        if(name === 'user_phone'){
            newValue = value.replace(/[^0-9]/g, '');
        }
        setVerifyInfo(prev => ({...prev, [name] : newValue}));
    }

    const ConsultCheck = async(name : string, phone : string) => {
        if(name === '' || phone === '') return;
        try{
            const res = await fetch(baseUrl + `/consult/${verify}?user_name=${name}&user_phone=${phone}`);
            const result = await res.json();
            if(result.length > 0){
                nav(`/consult/view/${verify}`)
            }
        }catch{
            alert("올바른 접근이 아닙니다.");
        }
    }

    return(
        <div id="ConsultVerify">
            <div>
                <h2>본인 확인을 위해 정보를 입력해주세요</h2>
                <button onClick={onClose} className="close-btn"><X/></button>
                <div className="input-wrap">
                    <input type="text" name="user_name" value={verifyInfo.user_name} placeholder="이름" onChange={ChangeInput}/>
                    <input type="text" name="user_phone" value={verifyInfo.user_phone} placeholder="연락처" onChange={ChangeInput}/>
                </div>
                <button type="button" onClick={() => ConsultCheck(verifyInfo.user_name, verifyInfo.user_phone)} className="confirm-btn">확인</button>
            </div>
        </div>
    )
}

export default ConsultVerify;