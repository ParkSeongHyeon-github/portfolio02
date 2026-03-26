import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { LandPropsWrite } from '../type/Land/Land-type';
import type { ResultProps } from '../type/result/result-type';
import { optionprops } from '../constants/property';
import { LandInsert ,LandSelectOne, LandUpdate } from '../api/land/land-api';
import DaumPostcode from 'react-daum-postcode';
import ResultMessage from '../components/ResultMessage';
import "../css/Land.css";

const LandWrite = ({user} : {user : string | null}) => {
    const nav = useNavigate();
    const {land_id} = useParams();
    const [result, setResult] = useState<ResultProps | null>(null);
    const [address, setAddress] = useState<string>('');
    const [zoneCode, setZoneCode] = useState<string>('');
    const [postView, setPostView] = useState<boolean>(false);
    const {register, handleSubmit, watch, setValue, reset} = useForm<LandPropsWrite>({
        defaultValues: {
            land_type: '사무실',
            land_price: '월세'
        }
    });
    const dealType = watch("land_price");

    const handleComplete = (data: any) => {
        setAddress(data.address);
        setZoneCode(data.zonecode);

        setValue("land_postcode", data.zonecode);
        setValue("land_add", data.address);
    };

    const ChangeNumber = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    const Upload = async(data : LandPropsWrite) => {
        const files = Array.from(data.land_img ?? []);
        const fileNames = files.map((file: any) => {
            return file.name ? file.name : file;
        });
        const newData = {...data, land_img: fileNames};

        try{
            if(!land_id){
                await LandInsert(newData);
                setResult({
                    type : "success",
                    message : "정상적으로 매물이 등록되었습니다."
                })
            }else{
                await LandUpdate(newData, land_id); 
                setResult({
                    type : "success",
                    message : "정상적으로 매물이 수정되었습니다."
                })
            }
        }catch{ 
            setResult({
                type : "error",
                message : "매물 업로드에 실패했습니다."
            })
        }
    }

    useEffect(() => {
        if(land_id){
            const load = async() => {
                try{
                    const result = await LandSelectOne(land_id);
                    reset(result);
                    setAddress(result.address);
                    setZoneCode(result.zonecode);
                }catch{
                    alert("올바른 접근이 아닙니다.")
                }
            }
            load()
        }
    }, [land_id, reset])


    if (!user || user === '2') nav('/');
    return(
        <div id="LandWrite">
            {result && <ResultMessage title={"매물등록"} type={result.type} message={result.message} onClose={() => setResult(null)} link={'/land/search'} />}
            <h1>매물등록</h1>
            <form onSubmit={handleSubmit(Upload)} autoComplete='off'>
                <div className="item">
                    <p className="cate">매물구분</p>
                    <ul className="input-container">
                        <li>
                            <p className="label">매물종류</p>
                            <div className="input-wrap">
                            {optionprops.typeArr.map((val, index) => {
                                return(
                                    <div key={val}>
                                        <input type="radio" {...register("land_type", {required : true})} value={val} id={`land_type${index}`} />
                                        <label htmlFor={`land_type${index}`}>{val}</label>
                                    </div>
                                )
                            })}
                            </div>
                        </li>
                        <li>
                            <p className="label">가격구분</p>
                            <div className="input-wrap">
                            {optionprops.dealArr.map((val, index) => {
                                return(
                                    <div key={val}>
                                        <input type="radio" {...register("land_price", {required : true})} value={val} id={`land_deal${index}`} />
                                        <label htmlFor={`land_deal${index}`}>{val}</label>
                                    </div>
                                )
                            })}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="item">
                    <p className="cate">위치정보</p>
                    <ul className="input-container address">
                        <li>
                            <p className="label">주소</p>
                            <div className="input-wrap">
                                <button type="button" className="add-btn" onClick={() => setPostView(prev => !prev)}>주소 검색</button>
                                
                                <label htmlFor="land_postcode" className="sound_only">우편번호</label>
                                <input type="text" {...register("land_postcode", {required : true})} value={zoneCode} className="input postcode" readOnly placeholder='우편번호'/>
                                <label htmlFor="land_add" className="sound_only">주소</label>
                                <input type="text" {...register("land_add", {required : true})} value={address} className="input add" readOnly placeholder='주소를 검색해주세요'/>
                                <label htmlFor="land_add" className="sound_only">주소</label>
                                <input type="text" {...register("land_add_detail")} className="input add_detail" placeholder='상세주소를 입력해주세요.'/>
                            </div>
                        </li>
                        {postView && <DaumPostcode onComplete={handleComplete}/>}
                    </ul>
                </div>
                <div className="item">
                    <p className="cate">매물정보</p>
                    <ul className="input-container">
                        <li>
                            <p className="label">가격</p>
                            {dealType === '월세' && (
                                <div className="input-wrap type">
                                    <div>
                                    <label htmlFor="land_deposit" className="sound_only">월세보증금</label>
                                    <input type="text" {...register("land_deposit")} className="input" placeholder='월세보증금' onChange={ChangeNumber} /> 만원
                                    </div>
                                    <div>
                                    <label htmlFor="land_monthly_rent" className="sound_only">월세</label>
                                    <input type="text" {...register("land_monthly_rent")} className="input" placeholder='월세' onChange={ChangeNumber} /> 만원
                                    </div>
                                    <div>
                                    <label htmlFor="land_premium" className="sound_only">권리금</label>
                                    <input type="text" {...register("land_premium")} className="input" placeholder='권리금' onChange={ChangeNumber} /> 만원
                                    </div>
                                </div>
                                )}

                                {dealType === '전세' && (
                                <div className="input-wrap">
                                    <div>
                                    <label htmlFor="land_jeonse_price" className="sound_only">전세가</label>
                                    <input type="text" {...register("land_jeonse_price")} className="input" placeholder='전세가' onChange={ChangeNumber} /> 만원
                                    </div>
                                    <div>
                                    <label htmlFor="land_jeonse_premium" className="sound_only">전세 권리금</label>
                                    <input type="text" {...register("land_jeonse_premium")} className="input" placeholder='전세 권리금' onChange={ChangeNumber} /> 만원
                                    </div>
                                </div>
                                )}

                                {dealType === '단기' && (
                                <div className="input-wrap">
                                    <div>
                                    <label htmlFor="land_short_deposit" className="sound_only">단기 보증금</label>
                                    <input type="text" {...register("land_short_deposit")} className="input" placeholder='단기 보증금' onChange={ChangeNumber} /> 만원
                                    </div>
                                    <div>
                                    <label htmlFor="land_short_rent" className="sound_only">단기 월세</label>
                                    <input type="text" {...register("land_short_rent")} className="input" placeholder='단기 월세' onChange={ChangeNumber} /> 만원
                                    </div>
                                </div>  
                                )}

                                {dealType === '매매' && (
                                <div className="input-wrap">
                                    <div>
                                    <label htmlFor="land_sale_price" className="sound_only">매매가</label>
                                    <input type="text" {...register("land_sale_price")} className="input" placeholder='매매가' onChange={ChangeNumber} /> 만원
                                    </div>
                                    <div>
                                    <label htmlFor="land_sale_premium" className="sound_only">매매 권리금</label>
                                    <input type="text" {...register("land_sale_premium")} className="input" placeholder='매매 권리금' onChange={ChangeNumber} /> 만원
                                    </div>
                                </div>  
                            )}
                        </li>
                        <li>
                            <p className="label">관리비</p>
                            <div className="input-wrap maintenance">
                                <div>
                                    <label htmlFor="land_maintenance" className="sound_only">관리비</label>
                                    <input type="text" {...register("land_maintenance")} className="input" placeholder='관리비' onChange={ChangeNumber} /> 만원
                                </div>
                                <div className="input-wrap maintenance_item">
                                    <p>관리비 포함내역</p>
                                    {optionprops.maintenanceArr.map((val, index) => {
                                        return(
                                            <div key={val}>
                                                <input type="checkbox" {...register("land_maintenance_items")} value={val} id={`maintenance_items${index}`} onChange={ChangeNumber} />
                                                <label htmlFor={`maintenance_items${index}`}>{val}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </li>
                        <li>
                            <p className="label">면적</p>
                            <div className="input-wrap area">
                                <div>
                                    <label htmlFor="supply_area">공급면적 </label>
                                    <input type="text" {...register("supply_area")} className="input" onChange={ChangeNumber} /> ㎡
                                </div>

                                <div>
                                    <label htmlFor="exclusive_area">실면적 </label>
                                    <input type="text" {...register("exclusive_area")} className="input" onChange={ChangeNumber} /> ㎡
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="item">
                    <p className="cate">기본정보</p>
                    <ul className="input-container">
                        <li>
                            <p className="label">매물명</p>
                            <div className="input-wrap">
                                <label htmlFor="land_subject" className='sound_only'>매물명</label>
                                <input type="text" {...register("land_subject", {required : true})} className="input full" />
                            </div>
                        </li>   
                        <li>
                            <p className="label">방 수</p>
                            <div className="input-wrap">
                                <label htmlFor="land_room" className='sound_only'>방수</label>
                                <input type="text" {...register("land_room")} className="input" onChange={ChangeNumber} />개
                            </div>
                        </li>   
                        <li>
                            <p className="label">해당층</p>
                            <div className="input-wrap">
                                <label htmlFor="land_floor" className='sound_only'>해당층</label>
                                <input type="text" {...register("land_floor")} className="input" onChange={ChangeNumber} />층
                            </div>
                        </li>   
                        <li>
                            <p className="label">전체층</p>
                            <div className="input-wrap">
                                <label htmlFor="land_total_floor" className='sound_only'>전체층</label>
                                <input type="text" {...register("land_total_floor")} className="input" onChange={ChangeNumber} />층
                            </div>
                        </li>   
                        <li>
                            <p className="label">방향</p>
                            <div className="input-wrap">
                                <label htmlFor="land_direction" className='sound_only'>방향</label>
                                <select {...register("land_direction")} className="input">
                                    <option value="">방향선택</option>
                                    {optionprops.directionArr.map((val) => {
                                        return(
                                            <option key={val} value={val}>{val}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </li>   
                        <li>
                            <p className="label">건축물 용도</p>
                            <div className="input-wrap">
                                <label htmlFor="land_building_use" className='sound_only'>건축물 용도</label>
                                <select {...register("land_building_use")} className="input">
                                    <option value="">선택안함</option>
                                    {optionprops.buildingUseArr.map((val) => {
                                        return(
                                            <option key={val} value={val}>{val}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </li>   
                        <li>
                            <p className="label">입주일</p>
                            <div className="input-wrap">
                                <label htmlFor="land_move_in" className='sound_only'>입주일</label>
                                <input type="text" {...register("land_move_in")} className="input half" placeholder='예 : 2026년 1월, 바로입주, 7일이내' />
                            </div>
                        </li>
                        <li>
                            <p className="label">주차</p>
                            <div className="input-wrap">
                                <label htmlFor="land_parking" className='sound_only'>주차</label>
                                <input type="text" {...register("land_parking")} className="input half" placeholder='총 몇데 / 세대당 몇대' />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="item">
                    <p className="cate">관리정보</p>
                    <div className="input-container">
                        <ul>
                            <li>
                                <p className="label">담당자 이름</p>
                                <div className="input-wrap">
                                    <label htmlFor="agent_name" className='sound_only'>담당자 이름</label>
                                    <input type="text" {...register("agent_name", {required : true})} className="input" />
                                </div>
                            </li>
                            <li>
                                <p className="label">담당자 연락처</p>
                                <div className="input-wrap">
                                    <label htmlFor="agent_phone" className='sound_only'>담당자 연락처</label>
                                    <input type="text" {...register("agent_phone", {required : true})} className="input" onChange={ChangeNumber} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <p className="cate">이미지</p>
                    <div className="input-container">
                        <ul>
                            <li>
                                <p className="label">매물 이미지</p>
                                <div className="input-wrap">
                                    <input type="file" {...register("land_img")} multiple className="input file" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="btn-wrap">
                    <li><button type="submit">매물 등록</button></li>
                    <li><Link to='/'>취소</Link></li>
                </ul>
            </form>
        </div>
    )
}

export default LandWrite;