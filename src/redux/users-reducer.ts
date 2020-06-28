import {ThunkAction} from "redux-thunk";
import {InferActionTypes, SubmitClientDataType} from "../types/types";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../api/api";

const initialState = {
    isFetching: false,
    LayoutsModal: {
        numberOrFalse: false as boolean | number,
    }
}

export type initialStateType = typeof initialState;

const userReducer = (state = initialState, action:ActionTypes):initialStateType => {
    switch (action.type) {
        case "user-reducer/SET_USER_FETCHING":
            return {
                ...state,
                isFetching: action.boolean,
            }
        case "user-reducer/SET_LAYOUTS_MODAL_OPEN":
            return {
                ...state,
                LayoutsModal: {
                    numberOrFalse: action.numberOrFalse
                }
            }
        default:
            return state;
    }
}

export const userActions = {
    setUserIsFetching: (boolean:boolean) => ({type: "user-reducer/SET_USER_FETCHING", boolean} as const),
    setLayoutsModalOpen: (numberOrFalse:false | number)=> ({type:"user-reducer/SET_LAYOUTS_MODAL_OPEN",numberOrFalse} as const)
}

export type ActionTypes = InferActionTypes<typeof userActions>

export type ThunkType = ThunkAction<void,AppStateType,unknown,ActionTypes>
export type AsyncThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionTypes>


export const addUserRequest = (data:SubmitClientDataType):ThunkType => (dispatch) => {
    dispatch(userActions.setUserIsFetching(true));
    usersAPI.addUser(data)
        .then(response=> {
                dispatch(userActions.setUserIsFetching(false));
            },error=>{
            }
        )
}

export default userReducer;