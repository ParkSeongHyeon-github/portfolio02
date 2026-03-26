const baseUrl = import.meta.env.VITE_API_BASE_URL;
import type { ConsultWriteProps } from "../../type/consult/consult-type";
import type { QuickConsultWrite } from "../../type/consult/consult-type";

type ApiData = ConsultWriteProps | QuickConsultWrite

export const ConsultInsert = async<T extends ApiData>(data : T, table : string) => {
    const res = await fetch(baseUrl + `/${table}`, {
        method : "post",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(data)
    })
    if(!res.ok){
        throw new Error("서버 접속 실패")
    }
    return true;
}

export const ConsultUpdate = async(data : ConsultWriteProps, id : string) => {
    const res = await fetch(baseUrl + `/consult/${id}`, {
        method : "put",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    });
    if(!res.ok){
        throw new Error("서버 접속 실패")
    }
    return true;
}

export const ConsultSelect = async({page = 1, limit = 15, subject = '', table = ''}) => {
    let url = `${baseUrl}/${table}?_page=${page}&_limit=${limit}`;
    if(subject){
        url += `&subject_like=${subject}`
    } 
    const res = await fetch(url);
     if(!res.ok){
        throw new Error("서버 접속 실패")
    }
    const totalCount = res.headers.get('X-Total-Count');
    const data = await res.json();
    return {
        data,
        totalCount: Number(totalCount)
    };
}

export const ConsultSelectOne = async(id : string, table : string) => {
    const res = await fetch(baseUrl + `/${table}/${id}`);
     if(!res.ok){
        throw new Error("서버 접속 실패")
    }
    return await res.json();
}

export const ConsultDelete = async(id : string, table : string) => {
    const res = await fetch(baseUrl + `/${table}/${id}`, {
        method : "delete"
    });
    if(!res.ok){
        throw new Error("서버 접속 실패")
    }
    return true;
}