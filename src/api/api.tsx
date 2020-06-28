import axios from "axios"
import {EstateType, SubmitClientDataType, LoginAdminDataType, EstateLayoutsType} from "../types/types";
import {GetTokenType} from "../utils/sessionStorage";

const url = "http://api.estates.nej3no.tech/";

const instance = axios.create({
    baseURL: url,
});

type GetEstatesResponseType = Array<EstateType>

export const estatesAPI = {
    getEstates() {
        return instance.get<GetEstatesResponseType>('/estates').then(response => response.data)
    },
    getEstateById(id: number) {
        return instance.get<EstateType>(`/estates/${id}`).then(response => response.data)
    },
    appendEstate(data: EstateType, token: ReturnType<GetTokenType>) {
        return instance.post('/estates', JSON.stringify(data), {
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
    },
    deleteEstateById(id: number, token: ReturnType<GetTokenType>) {
        return instance.delete(`/estates/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
    },
    updateEstateById(id: number, data: EstateType, token: ReturnType<GetTokenType>) {
        return instance.patch(`/estates/${id}`, JSON.stringify(data), {
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
    }
}

type GetLayoutsResponseType = Array<EstateLayoutsType>

export const layoutsAPI = {
    getLayouts(id:number){
        return instance.get<GetLayoutsResponseType>(`/layouts/${id}`).then(response => response.data)
    }
}

export const usersAPI = {
    addUser(data: SubmitClientDataType) {
        return instance.post('/notify', JSON.stringify(data), {
            headers: {'content-type': 'application/json'}
        })
    }
}

export enum ErrorCodeEnum {
    wrongAuth = 4031
}

export type LoginResponseType = {
    error_code?: ErrorCodeEnum
    message?: string
    token?: string
}

export const adminAPI = {
    login(data: LoginAdminDataType) {
        return instance.post<LoginResponseType>('/admin/login', JSON.stringify(data), {
            headers: {'content-type': 'application/json'}
        })
    },
    me(token: ReturnType<GetTokenType>) {
        return instance.get('/admin/me', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
    }
}