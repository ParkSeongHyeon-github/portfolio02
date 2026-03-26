import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { ConsultSelectOne, ConsultDelete } from '../api/consult/consult-api';
import type { ResultProps } from '../type/result/result-type';
import type { QuickConsultProps } from '../type/consult/consult-type';
import ResultMessage from '../components/ResultMessage';

const QuickView = ({user} : {user : string | null}) => {
    const nav = useNavigate();
    const {quick_id} = useParams();
    const [result, setResult] = useState<ResultProps | null>(null);
    const [viewData, setViewData] = useState<QuickConsultProps>();

    const formatPhone = (num: string) => {
        return num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    const DeleteData = async(id : string) => {
        try{
            const ckDelete = confirm(`해당 게시글을 삭제 하시겠습니까? \n삭제 후 복구는 불가능합니다.`);
            if(ckDelete){
                await ConsultDelete(id, 'quick_consult');
                setResult({
                    type : "success",
                    message : "게시글이 정상적으로 삭제되었습니다."
                })
            }
        }catch{
            setResult({ 
                type : "error",
                message : "게시글 삭제에 실패했습니다."
            })
        }
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await ConsultSelectOne(String(quick_id), 'quick_consult');
                setViewData(result);
            }catch{
                alert("올바른 접근이 아닙니다.")
            }
        }
        load()
    }, [quick_id])

    if(!viewData){
        return <div>loading...</div>
    }

    if (!user || user === '2') nav('/');
    return(
        <div id="QuickView" className='board-view'>
            {result && <ResultMessage title={"게시글 삭제"} type={result.type} message={result.message} onClose={() => setResult(null)} link={`/quick/list`} />}
               <div className="title">{viewData.subject}</div>
            <ul className="user">
                <li><span>작성자</span>{viewData.user_name}</li>
            </ul>
            <ul className="info">
                <li><span>이름</span>{viewData.user_name}</li>
                <li><span>연락처</span>{formatPhone(viewData.user_phone)}</li>
            </ul>
            <div className="content">{viewData.content}</div>
            <div className="btn">
                <Link to="/quick/list">글 목록</Link>
                <button type='button' onClick={() => DeleteData(viewData.id)} className="delete-btn">글 삭제</button>
            </div>
        </div>
    )
}

export default QuickView;