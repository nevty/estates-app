import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {adminActions} from "../redux/admin-reducer";
import {userActions} from "../redux/users-reducer";
import {deleteEstateByIdRequest, getEstateByIdRequest} from "../redux/estates-reducer";
import {EstateType} from "../types/types";
import {Grid, IconButton, Container} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

let mapStateToPropsForAdmin = (state: AppStateType) => ({
    isAdminAuth: state.adminState.isAdminAuth
})

let mapDispatchToPropsForAdmin = (dispatch: any): MapDispatchPropsType => ({
    deleteEstateById: (id) => {
        dispatch(deleteEstateByIdRequest(id))
    },
    async getEstateById(id) {
        await dispatch(getEstateByIdRequest(id))
    },
    setConfirmOpen(boolean:boolean){
        dispatch(adminActions.setConfirmOpen(boolean))
    },
    setEditFormOpen(boolean:boolean){
        dispatch(adminActions.setEditFormOpen(boolean))
    },
    setLayoutsModalOpen: (numberOrFalse) => {
        dispatch(userActions.setLayoutsModalOpen(numberOrFalse))
    },
    handleFunc(func:any,args:any) {
        dispatch(adminActions.setConfirmHandledFunc(func,args))
    }
})

type MapStatePropsType = {
    isAdminAuth: boolean
}

type MapDispatchPropsType = {
    deleteEstateById: (id: number) => void
    getEstateById: (id: number) => void
    handleFunc: (func: any,args:any)=>void
    setConfirmOpen: (boolean:boolean)=>void
    setEditFormOpen: (boolean:boolean)=>void
    setLayoutsModalOpen: (numberOrFalse: number | false) => void
}

type OwnPropsType = {
    item: EstateType
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


export const withEstatesCardAdmin = <P extends object>(Component: React.ComponentType<P>) => {
    const EstatesCardAdminComponent: React.FC<PropsType> = (
        {
            isAdminAuth,
            deleteEstateById,
            getEstateById,
            setConfirmOpen,
            setEditFormOpen,
            setLayoutsModalOpen,
            handleFunc,
            item,
            ...props}) => {

        const handleDelete = (id: number) => {
            setConfirmOpen(true);
            handleFunc(deleteEstateById,id)
        }
        const handleEdit = async (id: number) => {
            await getEstateById(id);
            setEditFormOpen(true)
        }

        const adminLayoutsRequest = ()=>{

        }
        const clientLayoutsRequest = (id:number)=>{
            if (id) setLayoutsModalOpen(id)
        };

        if (!isAdminAuth) {
            return <Component item={item} layoutsRequest={() => item.id ? clientLayoutsRequest(item.id) : null} {...props as P}/>

        } else {
            return (
                <Grid item>
                    <Container fixed disableGutters>
                        <IconButton aria-label="delete" onClick={() => item.id ? handleDelete(item.id) : null}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => item.id ? handleEdit(item.id) : null}>
                            <EditIcon/>
                        </IconButton>
                    </Container>
                    <Component {...props as P} id={item.id} item={item} layoutsRequest={adminLayoutsRequest}/>
                </Grid>
            )
        }
    }
    return connect(mapStateToPropsForAdmin, mapDispatchToPropsForAdmin)(EstatesCardAdminComponent)
}