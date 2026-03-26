import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';

const Section03 = () => {
    return(
        <div id="Section03" data-aos="fade-up" data-aos-duration={1200}>
            <div className="wrap">
                <h2>
                    <span>나에게 딱 맞는,</span><br />
                    우리동네 매물찾기
                </h2>
                <Link to='/land/search'>매물 보러가기 <ChevronRight /></Link>
            </div>
        </div>
    )
}

export default Section03;