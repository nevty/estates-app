import {ThunkAction} from "redux-thunk";
import { EstateType, InferActionTypes } from "../types/types";
import {AppStateType} from "./redux-store";
import {estatesAPI} from "../api/api";
import {getToken, GetTokenType} from "../utils/sessionStorage";

const initialState = {
    estates: [] as Array<EstateType>,
    estate: {} as EstateType,
    isFetching: false as boolean,
}
export type initialStateType = typeof initialState
enum ActionTypeEnum {
    setEstates="estates-reducer/SET_ESTATES",
    setEstate="estates-reducer/SET_ESTATE",
    setEstatesFetching="estates-reducer/SET_ESTATES_FETCHING"
}
const estatesReducer = (state = initialState, action:ActionTypes):initialStateType => {
    switch (action.type) {
        case ActionTypeEnum.setEstates:
            return {
                ...state,
                estates: action.payload
            }
        case ActionTypeEnum.setEstate:
            return {
                ...state,
                estate:action.payload
            }
        case ActionTypeEnum.setEstatesFetching:
            return {
                ...state,
                isFetching: action.boolean,
            }
        default: return state;
    }
}

export const estatesActions = {
    setEstatesActionCreator: (payload:Array<EstateType>) => ({type: ActionTypeEnum.setEstates, payload} as const),
    setEstateActionCreator: (payload:EstateType)=>({type:ActionTypeEnum.setEstate,payload} as const),
    setEstatesIsFetching: (boolean:boolean) => ({type: ActionTypeEnum.setEstatesFetching, boolean} as const)
}

type ActionTypes = InferActionTypes<typeof estatesActions>

export type ThunkType = ThunkAction<void,AppStateType,unknown,ActionTypes>
export type AsyncThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionTypes>

export const getEstatesRequest = ():AsyncThunkType => async(dispatch) => {
    dispatch(estatesActions.setEstatesIsFetching(true));
    return await estatesAPI.getEstates()
        .then(estateArray=>{
            dispatch(estatesActions.setEstatesActionCreator(estateArray));
            dispatch(estatesActions.setEstatesIsFetching(false));
        })
}
export const getEstateByIdRequest = (id:number):AsyncThunkType => async (dispatch) => {
    dispatch(estatesActions.setEstatesIsFetching(true));
    let estate = await estatesAPI.getEstateById(id);
    dispatch(estatesActions.setEstateActionCreator(estate));
    dispatch(estatesActions.setEstatesIsFetching(false));
}
export const appendEstateRequest = (data:EstateType):ThunkType => (dispatch) => {
    dispatch(estatesActions.setEstatesIsFetching(true));
    let token:ReturnType<GetTokenType> = getToken();
    estatesAPI.appendEstate(data,token)
        .then(response=>{
            dispatch(estatesActions.setEstatesIsFetching(false));
            dispatch(getEstatesRequest());
        },error=>{
            console.log(error)
        })
}
export const updateEstateRequest = (id:number,data:EstateType):ThunkType => (dispatch)=>{
    dispatch(estatesActions.setEstatesIsFetching(true));
    let token:ReturnType<GetTokenType> = getToken();
    estatesAPI.updateEstateById(id,data,token)
        .then(response=>{
            dispatch(estatesActions.setEstatesIsFetching(false));
            dispatch(getEstatesRequest())
        },error=>{
            console.log(error);
        })
}
export const deleteEstateByIdRequest = (id:number):ThunkType => (dispatch) => {
    let token:ReturnType<GetTokenType> = getToken();
    estatesAPI.deleteEstateById(id,token)
        .then(response=> {
            dispatch(getEstatesRequest());
            },error=>{
                console.log(error)
            }
        )
}

export default estatesReducer;