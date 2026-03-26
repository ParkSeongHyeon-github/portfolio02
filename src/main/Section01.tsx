import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from "react-feather";

const Section01 = () => {
    const nav = useNavigate();
    const [searchLand, setSearchLand] = useState<string>('');

    const navLand = () => {
        if(searchLand !== ''){
            nav(`/land/search?subject=${searchLand}`);
        }
    }

    return(
        <div id="Section01">
            <div className="wrap">
                <div className="right" data-aos="fade-up" data-aos-duration={1200}>
                    <h2>
                        <span>고객님이 원하시는</span><br />
                        맞춤형 매물을 찾아드립니다
                    </h2>
                    <div className="search-land">
                        <input type="text" placeholder="매물명을 검색해주세요" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchLand(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){navLand()}}} />
                        <button onClick={navLand} >검색<Search size={22}/></button>
                    </div>
                </div>
                <div className="left">
                    <ul data-aos="fade-up" data-aos-duration={1200}>
                        <li>
                            <Link to='/land/search?type=사무실'>
                                <img src="/img/section01_img01.png" alt="사무실 아이콘" />
                                <p>사무실</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/land/search?type=상가'>
                                <img src="/img/section01_img02.png" alt="상가 아이콘" />
                                <p>상가</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/land/search?type=오피스텔'>
                                <img src="/img/section01_img03.png" alt="오피스텔 아이콘" />
                                <p>오피스텔</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/land/search?type=주택'>
                                <img src="/img/section01_img04.png" alt="주택 아이콘" />
                                <p>주택</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Section01;