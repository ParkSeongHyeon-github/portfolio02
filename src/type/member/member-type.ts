export interface RegisterProps {
    id : string,
    mb_id : string,
    mb_password : string,
    mb_email : string,
    mb_name : string,
    mb_phone : string 
}

export interface LoginProps {
    login_id : string,
    login_password : string
}

export type RegisterWrite = Omit<RegisterProps, "id">