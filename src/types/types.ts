export type EstateType = {
    id?: number
    building: string;
    district: string;
    location?: string;
    photos?: string;
    collection: Array<EstateCollectionType> | [];
    date_iso?: string;
}

export type EstateCollectionType = {
    id?: number;
    parent_id?: number;
    apartment_type: string;
    price?: number | null;
    square?: number | null;
}

export type EstateLayoutsType = {
    layout_id?: number;
    estate_id: number;
    apartment_type: string;
    image: string;
}

export type LoginAdminDataType = {
    admin_name: string
    admin_password: string
}

export type SubmitClientDataType = {
    user_name: string
    user_surname: string
    user_patronymic: string
    user_tel: number
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>