const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useState, useEffect} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { LandProps } from '../type/Land/Land-type';
import LandInfo from '../components/LandInfo';
import { Search, RefreshCw } from 'react-feather';

const LandSearch = ({user} : {user : string | null}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const curSubject = searchParams.get("subject") || '';
    const curType = searchParams.get("type") || '';
    const curPrice = searchParams.get("price") || '';

    const [searchSubject, setSerachSubject] = useState<string>(curSubject);
    const [searchType, setSerachType] = useState<string>(curType);
    const [searchPrice, setSerachPrice] = useState<string>(curPrice);
    const [infoView, setInfoView] = useState<boolean>(false);
    const [landData, setLandData] = useState<LandProps[]>([]);
    const [curData, setCurData] = useState<LandProps | null>(null);
    const [totalpage, setTotalpage] = useState<number>(1);

    const pageGroup = Math.ceil(page / 10);
    const startPage = (pageGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalpage);

    const limit = 16;

    const ClickInfo = async(id : string) => {
        setInfoView(true);
        try{
            const res = await fetch(baseUrl+`/land/${id}`);
            const result = await res.json();
            setCurData(result);
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }

    const ChangePage = (page : string) => {
        setSearchParams({"subject" : searchSubject, "type" : searchType, "price" : searchPrice, "page" : page});
    }
 
    const SearchSubject = () => {
        setSearchParams({"subject" : searchSubject, "type" : searchType, "price" : searchPrice, "page" : "1"});
    }

    const SearchOpion = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        if(name === 'land_type'){
           setSearchParams({"subject" : searchSubject, "type" : value, "price" : searchPrice, "page" : "1"});
            setSerachType(value);
        }else if(name === 'land_price'){
            setSearchParams({"subject" : searchSubject, "type" : searchType, "price" : value, "page" : "1"});
            setSerachPrice(value);
        }
    }

    const Reload = () => {
        setSearchParams({});
        setSerachSubject('');
        setSerachType('');
        setSerachPrice('');
    }

    const pagingArr = Array.from({ length : endPage - startPage + 1}, (_, i) => startPage + i)

    const prevGroup = () => {
        if(startPage > 1){
            ChangePage(String(startPage - 1))
        }
    }

    const nextGroup = () => {
        if(endPage < totalpage){
            ChangePage(String(endPage + 1))

        }
    }

    useEffect(() => {
        const load = async() => {
            try{
                let query = [];
                if(searchSubject){
                    query.push(`land_subject_like=${searchSubject}`);
                }
                if (searchType) {
                    query.push(`land_type=${searchType}`);
                }
                if (searchPrice) {
                    query.push(`land_price=${searchPrice}`);
                }

                query.push(`_page=${page}`);
                query.push(`_limit=${limit}`);

                const res = await fetch(baseUrl + `/land${query.length ? `?${query.join('&')}` : ''}`);
                const Count = res.headers.get('X-Total-Count');
                const result = await res.json();
                setLandData(result);
                setTotalpage(Math.ceil(Number(Count) / limit));
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [searchParams])

    return(
        <div id="LandSearch">
            {infoView && <LandInfo data={curData} user={user} onClose={() => setInfoView(false)} />}
            <div className="search-head">
                <div className="search">
                    <input type="text" value={searchSubject} placeholder='매물명 검색' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSerachSubject(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {SearchSubject();}}}/>
                    <button type="button" onClick={SearchSubject}><Search /></button>
                </div>
                <div className="select-wrap">
                    <select name="land_type" value={searchType} onChange={SearchOpion}>
                        <option value="">사무실, 상가, 오피스텔, 주택</option>
                        <option value="사무실">사무실</option>
                        <option value="상가">상가</option>
                        <option value="오피스텔">오피스텔</option>
                        <option value="주택">주택</option>
                    </select>
                    <select name="land_price" value={searchPrice} onChange={SearchOpion}>
                        <option value="">월세, 전세, 매매, 단기</option>
                        <option value="월세">월세</option>
                        <option value="전세">전세</option>
                        <option value="매매">매매</option>
                        <option value="단기">단기</option>
                    </select>
                </div>
                <button className='refresh-btn' onClick={Reload}><RefreshCw size={18}/></button>
            </div>
            {landData.length === 0 && (
                <div className="no-land">매물이 존재 하지 않습니다.</div>
            )}
            {landData.length > 0 && (
                <ul className="land-wrap">
                    {landData.map((val) => {
                        return(
                            <li key={val.id} onClick={() => ClickInfo(val.id)}>
                                <img src={`/img/land/${val.land_subject}1.jpg`} alt={val.land_subject} onError={(e) => e.currentTarget.replaceWith(document.createTextNode("이미지 경로에 파일이 업로드되지 않았습니다."))} />
                                {val.land_price === '월세' && (
                                    <div className="tit"><span>월</span>{Number(val.land_deposit).toLocaleString()}만원 / {Number(val.land_monthly_rent).toLocaleString()}만원</div>
                                )}
                                {val.land_price === '전세' && (
                                    <div className="tit"><span>전</span>{Number(val.land_jeonse_price).toLocaleString()}만원</div>
                                )}
                                {val.land_price === '단기' && (
                                    <div className="tit"><span>단</span>{Number(val.land_short_deposit).toLocaleString()}만원 / {Number(val.land_short_rent).toLocaleString()}만원</div>
                                )}
                                {val.land_price === '매매' && (
                                    <div className="tit"><span>매</span>{Number(val.land_sale_price).toLocaleString()}만원</div>
                                )}
                                <div className="subject">{val.land_subject}</div>
                                <div className="address">{val.land_add}</div>
                                <div className="building">{val.land_building_use}</div>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className="pagination">
                {startPage > 1 && (
                    <button onClick={prevGroup}>이전</button>
                )}
                {pagingArr.map((val) => {
                    return(
                        <button key={val} type="button" onClick={() => ChangePage(String(val))} className={val === page ? 'active' : ''}>{val}</button>
                    )
                })}
                {endPage < totalpage && (
                    <button onClick={nextGroup}>다음</button>
                )}

            </div>
            {user && user === '10' && (
                <ul className="write-btn">
                    <li><Link to='/land/write'>매물등록</Link></li>
                </ul>
            )}
        </div>
    )
}

export default LandSearch;