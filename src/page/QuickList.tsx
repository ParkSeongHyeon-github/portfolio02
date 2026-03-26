import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ConsultSelect } from '../api/consult/consult-api';
import { Search, RefreshCw } from 'react-feather';
import type { QuickConsultProps } from '../type/consult/consult-type';


const QuickList = ({user} : {user : string | null}) => {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const subject = searchParams.get("subject") || '';

    const [quickData, setQuickData] = useState<QuickConsultProps[]>([]);
    const [searchSub, setSearchSub] = useState<string>(subject);
    const [totalPage, setTotalPage] = useState<number>(1);
    const limit = 15;

    const pageGroup = Math.ceil(page / 10);
    const startPage = (pageGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPage);

    const ChangePage = (page : string) => {
        setSearchParams({"subject" : searchSub, "page" : page});
    }
    const SearchSubject = () => {
        setSearchParams({"subject" : searchSub, "page" : "1"});
    }
    const Refresh = () => {
        setSearchParams({});
        setSearchSub('');
    }

    const pagingArr = Array.from({ length: endPage - startPage + 1 },(_, i) => startPage + i);

    const prevGroup = () => {
        if(startPage > 1){
            ChangePage(String(startPage - 1))
        }
    }

    const nextGroup = () => {
         if(endPage < totalPage){
            ChangePage(String(endPage + 1));
        }
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await ConsultSelect({page, limit, subject : searchSub, table : 'quick_consult'});
                setQuickData(result.data);
                setTotalPage(Math.ceil(result.totalCount / limit));
            }catch{
                alert("올바른 접근이 아닙니다.");
            }
        }
        load()
    }, [searchParams])

    if (!user || user === '2') nav('/');
    return(
        <div id="QuickList" className='board-list'>
            <h1>방문예약 목록</h1>
            <div className="search"> 
                <div className="search-wrap">
                    <input type="text" value={searchSub} placeholder='검색어를 입력해 주세요.'  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSearchSub(e.target.value)}  onKeyDown={(e) => {if (e.key === 'Enter') {SearchSubject();}}}/>
                    <button onClick={SearchSubject}><Search size={20}/></button>
                </div>
                <button className="refresh-btn" onClick={Refresh}><RefreshCw size={20}/></button>
            </div>
            <table>
                <thead>
                     <tr>
                        <th className="number">No</th>
                        <th>제목</th>
                        <th className="name">이름</th>
                    </tr>
                </thead>
                <tbody>
                    {quickData.map((val, index) => {
                        return(
                            <tr key={val.id}>
                                <td>{index + 1}</td>
                                <td className="link-td"><Link to={`/quick/view/${val.id}`}>{val.subject}</Link></td>
                                <td>{val.user_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                {startPage > 1 && (
                    <button onClick={prevGroup}>이전</button>
                )}

                {pagingArr.map((val) => (
                    <button
                        key={val}
                        type="button"
                        onClick={() => ChangePage(String(val))}
                        className={val === page ? 'active' : ''}
                    >
                        {val}
                    </button>
                ))}

                {endPage < totalPage && (
                    <button onClick={nextGroup}>다음</button>
                )}
            </div>
        </div>
    )
}

export default QuickList;