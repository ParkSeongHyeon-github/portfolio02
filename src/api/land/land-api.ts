const baseUrl = import.meta.env.VITE_API_BASE_URL;
import type { LandPropsWrite } from "../../type/Land/Land-type"

export const LandInsert = async(data : LandPropsWrite) => {
    const res = await fetch(baseUrl+`/land`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(data)
    })
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return true;
}

export const LandUpdate = async(data : LandPropsWrite, id : string) => {
    const res = await fetch(baseUrl+`/land/${id}`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(data)
    })
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return true;
}

export const LandSelectOne = async(id : string) => {
    const res = await fetch(baseUrl+`/land/${id}`);
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return await res.json();
}

export const LandDelete = async(id : string) => {
    const res = await fetch(baseUrl+`/land/${id}`, {
        method : "delete"
    });
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return true;
}