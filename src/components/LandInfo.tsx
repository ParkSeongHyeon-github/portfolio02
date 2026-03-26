
import { Link } from 'react-router-dom';
import { LandDelete } from '../api/land/land-api';
import type { LandProps } from '../type/Land/Land-type';
import { X } from 'react-feather';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/swiper.css';

interface InfoProps {
    data : LandProps | null,
    user : string | null,
    onClose : () => void
}

const LandInfo = ({data, user, onClose} : InfoProps) => {
    const formatPhone = (num: string) => {
        return num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };
    const DeleteLand = async(id : string) => {
        try{
            const ckdelete = confirm(`해당 매물을 삭제하시겠습니까? \n삭제 후 복구는 불가능합니다.`);
            if(ckdelete){
                await LandDelete(id);
                alert("매물이 정상적으로 삭제되었습니다.");
                onClose();
            }
        }catch{
            alert("올바른 접근이 아닙니다.");
        }
    }
    if(!data) return;
    return(
        <div id="info-wrap">
            <div>
                <button type="button" className="close-btn" onClick={onClose}><X size="30"/></button>
                <div className="top">
                    <div className="left">
                        <Swiper loop={true} speed={1000} spaceBetween={10} autoplay={{ delay: 1500, disableOnInteraction: false }} modules={[Autoplay]}>
                            {data.land_img.map((val, index) => {
                                return(
                                    <SwiperSlide>
                                        <img src={`/img/land/${data.land_subject}${index + 1}.jpg`} alt={val} onError={(e) => e.currentTarget.replaceWith(document.createTextNode("이미지 경로에 파일이 업로드되지 않았습니다."))}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="right">
                        {data.land_price === '월세' && (
                            <div className="tit"><span>월</span>{Number(data.land_deposit).toLocaleString()}만원 / {Number(data.land_monthly_rent).toLocaleString()}만원</div>
                        )}
                        {data.land_price === '전세' && (
                            <div className="tit"><span>전</span>{Number(data.land_jeonse_price).toLocaleString()}만원</div>
                        )}
                        {data.land_price === '단기' && (
                            <div className="tit"><span>단</span>{Number(data.land_short_deposit).toLocaleString()}만원 / {Number(data.land_short_rent).toLocaleString()}만원</div>
                        )}
                        {data.land_price === '매매' && (
                            <div className="tit"><span>매</span>{Number(data.land_sale_price).toLocaleString()}만원</div>
                        )}
                        <div className="subject">{data.land_subject}</div>
                        <div className="address">{data.land_add} {data.land_add_detail}</div>
                        <ul>
                            <li className="type">{data.land_type}</li>
                            <li className="area"><span>공급면적</span>{data.supply_area}㎡</li>
                            <li className="maintenance"><span>관리비</span>{Number(data.land_maintenance).toLocaleString()}만원</li>
                        </ul>
                    </div>
                </div>
                <div className="bottom">
                    <div className="item-wrap">
                        <p>매물정보</p>
                        <ul>
                            <li><span>소재지</span> {data.land_add} {data.land_add_detail}</li>
                            <li><span>매물구분</span> {data.land_type}</li>
                            <li><span>가격정보</span> {data.land_price}</li>
                            <li><span>관리비</span> {Number(data.land_maintenance).toLocaleString()}만원</li>
                            <li><span>해당층/총층</span> {data.land_floor}층 / {data.land_total_floor}층</li>
                            <li><span>공급면적</span> {data.supply_area}㎡</li>
                            <li><span>전용면적</span> {data.exclusive_area}㎡</li>
                            <li><span>입주일자</span> {data.land_move_in}</li>
                            <li><span>방수</span> {data.land_room}개</li>
                            <li><span>방향</span> {data.land_direction}</li>
                            <li><span>건축물 용도</span> {data.land_building_use}</li>
                            <li><span>주차</span> {data.land_parking}</li>
                        </ul>
                    </div>
                    <div className="item-wrap">
                        <p>관리자 정보</p>
                        <ul>
                            <li><span>담당자 이름</span>{data.agent_name}</li>
                            <li><span>담당자 연락처</span>{formatPhone(data.agent_phone)}</li>
                        </ul>
                    </div>
                </div>
                {user && user === '10' && (
                <ul className="admin-btn">
                    <li><Link to={`/land/write/${data.id}`} className="edit-btn">매물 수정</Link></li>
                    <li><button className="delete-btn" onClick={() => DeleteLand(data.id)}>매물 삭제</button></li>
                </ul>
                )}
            </div>
        </div>
    )
}

export default LandInfo;