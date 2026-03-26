export interface ConsultProps {
    id : string,
    subject : string,
    consult_type : string,
    consult_price : string,
    user_name : string,
    user_phone : string,
    content : string
}

export type ConsultWriteProps = Omit<ConsultProps, "id">

export interface QuickConsultProps {
    id : string,
    subject : string,
    user_name : string,
    user_phone : string,
    content : string
}

export type QuickConsultWrite = Omit<QuickConsultProps, "id">