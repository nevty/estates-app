import {ThunkAction} from "redux-thunk";
import {InferActionTypes, LoginAdminDataType} from "../types/types";
import {AppStateType} from "./redux-store";
import {adminAPI} from "../api/api";
import {getToken, GetTokenType} from "../utils/sessionStorage";

const initialState = {
    isAdminAuth: false as boolean,
    confirmDialog: {
        isOpen: false as boolean,
        AcceptAction: {
            handledFunc: (args:any)=>{},
            handledArgs: null as any,
        },
    },
    objectFormEdit: {
        isOpen: false as boolean,
    }
}

export type initialStateType = typeof initialState;

const adminReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "admin-reducer/SET_ADMIN_AUTH":
            return {
                ...state,
                isAdminAuth: action.boolean,
            }
        case "admin-reducer/SET_CONFIRM_OPEN":
            return {
                ...state,
                confirmDialog: {
                    ...state.confirmDialog,
                    isOpen: action.boolean
                }
            }
        case "admin-reducer/SET_CONFIRM_HANDLED_FUNCTION":
            return {
                ...state,
                confirmDialog: {
                    ...state.confirmDialog,
                    AcceptAction: {
                        handledFunc: action.func,
                        handledArgs: action.args
                    }
                }
            }
        case "admin-reducer/SET_EDIT_FORM_OPEN":
            return {
                ...state,
                objectFormEdit: {
                    ...state.objectFormEdit,
                    isOpen: action.boolean
                }
            }
        default:
            return state;
    }
}

export const adminActions = {
    setAdminAuth: (boolean: boolean) => ({type: "admin-reducer/SET_ADMIN_AUTH", boolean} as const),
    setConfirmOpen: (boolean: boolean) => ({type:"admin-reducer/SET_CONFIRM_OPEN",boolean} as const),
    setConfirmHandledFunc: (func: ()=>any,args:any) => ({type:"admin-reducer/SET_CONFIRM_HANDLED_FUNCTION",func,args} as const),
    setEditFormOpen: (boolean:boolean)=> ({type:"admin-reducer/SET_EDIT_FORM_OPEN",boolean} as const),
}

export type ActionTypes = InferActionTypes<typeof adminActions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type AsyncThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAdminAuthStatus = (): ThunkType => (dispatch) => {
    let token: ReturnType<GetTokenType> = getToken();
    adminAPI.me(token).then(response => {
        dispatch(adminActions.setAdminAuth(true));
    }, error => {
        if (error.response && error.response.status !== 403) {
            console.log(error)
        }
    })
}
export const loginAdminRequest = (reqData: LoginAdminDataType): ThunkType => (dispatch) => {
    return adminAPI.login(reqData)
        .then((response) => {
            sessionStorage.setItem('Authorization', `bearer ${response.data.token}`)
            dispatch(adminActions.setAdminAuth(true))
            return response.data
        }, error => error.response.data)
}



export default adminReducer;