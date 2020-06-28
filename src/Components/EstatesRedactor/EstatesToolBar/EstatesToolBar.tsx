import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {adminActions} from '../../../redux/admin-reducer';
import {
    Button, Dialog, DialogActions,Fab,
    DialogTitle, DialogContentText, DialogContent
} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type MapStatePropsType = {
    confirmOpenState: boolean
    acceptAction: {
        handledFunc: (args:any)=>any,
        handledArgs: any,
    }
}

type MapDispatchPropsType = {
    setConfirmOpen: (boolean: boolean) => void
}

type OwnPropsType = {
    openForm: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const EstatesToolBar: React.FC<PropsType> = (
    {
        openForm,
        confirmOpenState,
        setConfirmOpen,
        acceptAction
    }) => {
    const handleReject = () => {
        setConfirmOpen(false);
    }
    const handleAccept = () => {
        acceptAction.handledFunc(acceptAction.handledArgs);
        setConfirmOpen(false);
    }
    return (
        <div style={{position:"fixed",bottom:"20px",right: "20px",zIndex:100,textAlign:"right"}}>
            <Fab color="primary" aria-label="add" size="medium" onClick={openForm}>
                <Add/>
            </Fab>
            <Dialog open={confirmOpenState} onClose={handleReject}>
                <DialogTitle id="responsive-dialog-title">Удалить объёкт?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        После удаления
                        данные пропадут
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAccept} color="secondary" autoFocus>
                        Подтвердить
                    </Button>
                    <Button onClick={handleReject} color="primary" variant="contained">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    confirmOpenState: state.adminState.confirmDialog.isOpen,
    acceptAction: state.adminState.confirmDialog.AcceptAction
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    setConfirmOpen: (boolean: boolean) => {
        dispatch(adminActions.setConfirmOpen(boolean))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(EstatesToolBar);
