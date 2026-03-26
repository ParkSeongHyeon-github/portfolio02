export interface LandProps {
    id : string,
    //기본정보
    land_subject : string,
    land_room : string,
    land_floor : string,
    land_total_floor : string,
    land_direction : string,
    land_building_use : string,
    land_move_in : string,
    land_parking : string,
    agent_name : string,
    agent_phone : string,
    land_img : string[],
    //매물구분
    land_type : string,
    land_price : string,
    //주소
    land_postcode : string,
    land_add : string,
    land_add_detail : string,
    // 월세
    land_deposit: string,
    land_monthly_rent: string,
    land_premium: string,
    // 전세
    land_jeonse_price: string,
    land_jeonse_premium: string,
    // 단기
    land_short_deposit: string,
    land_short_rent: string,
    // 매매
    land_sale_price: string,
    land_sale_premium: string,
    //관리비
    land_maintenance : string,
    land_maintenance_items : string[],
    //공급면적, 전용면적
    supply_area : string,
    exclusive_area : string
}

export type LandPropsWrite = Omit<LandProps, "id">