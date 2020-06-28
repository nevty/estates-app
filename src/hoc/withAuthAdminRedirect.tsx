import React, {useEffect} from 'react'
import {History} from "history";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {getAdminAuthStatus} from "../redux/admin-reducer";
import LoginForm from "../Components/LoginForm/LoginForm";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAdminAuth: state.adminState.isAdminAuth
})

let mapDispatchToPropsForRedirect = (dispatch: any):MapDispatchPropsType => ({
    getAdminAuthStatus: () => {
        dispatch(getAdminAuthStatus())
    }
})

type OwnPropsType = {
    match: any
    history: History
}

type MapStatePropsType = {
    isAdminAuth: boolean
}

type MapDispatchPropsType = {
    getAdminAuthStatus: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

export const withAuthAdminRedirect = <P extends object>(Component:React.ComponentType<P>) => {
    const RedirectComponent: React.FC<PropsType> = ({isAdminAuth, getAdminAuthStatus, ...restProps}) => {
        useEffect(() => {
            getAdminAuthStatus()
        }, [getAdminAuthStatus])
        if (!isAdminAuth) {
            return <LoginForm {...restProps}/>
        } else {
            return <Component {...restProps as P}/>
        }
    }

    return connect(mapStateToPropsForRedirect, mapDispatchToPropsForRedirect)(RedirectComponent)
}