import { Link } from 'react-router-dom';

const MainBanner = () => {
    return(
        <div id="Mainbanner">
            <div className="bg" data-aos="fade-left" data-aos-duration={1200}>
                <img src="/img/main_banner.jpg" alt="핸드폰 속 부동산 지도를 보여주는 이미지" />
            </div>
            <div className="banner-wrap">
                <p data-aos="fade-up" data-aos-duration={1200}>내집찾는 홈페이지</p>
                <h1 data-aos="fade-up" data-aos-duration={1200}>샘플 부동산</h1>
                <ul>
                    <li data-aos="fade-up" data-aos-duration={1200}>
                        <Link to="/land/search">
                            <p>Search Map</p>
                            <h3>매물보기</h3>
                            <img src="/img/icon_01.png" alt="빌딩 아이콘" />
                        </Link>
                    </li>
                    <li data-aos="fade-up" data-aos-duration={1200}>
                        <Link to="/consult/write">
                            <p>Reservation</p>
                            <h3>부동산 방문예약</h3>
                            <img src="/img/icon_02.png" alt="문서 작성 아이콘" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainBanner;