import React from "react";
import {connect} from "react-redux";
import {userActions} from "../../../redux/users-reducer";
import {AppStateType} from "../../../redux/redux-store";
import LayoutsContainer from "../LayoutsContainer";
import {Dialog, Box, Paper, Typography} from "@material-ui/core";;


const numberOrFalse = false as boolean | number;

type MapStatePropsType = {
    isLayoutsModalOpen: typeof numberOrFalse
}

type MapDispatchPropsType = {
    setLayoutsModalOpen: (numberOrFalse: false | number) => void
}

const LayoutsRequestModal: React.FC<MapStatePropsType & MapDispatchPropsType> = ({isLayoutsModalOpen, setLayoutsModalOpen}) => {
    const handleClose = () => setLayoutsModalOpen(false);
    return (
        <Dialog open={typeof isLayoutsModalOpen == "number"} onClose={handleClose}>
            <Box component={Paper}>
                {(typeof isLayoutsModalOpen == "number") && <LayoutsContainer id={isLayoutsModalOpen}/>}
            </Box>
        </Dialog>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isLayoutsModalOpen: state.userState.LayoutsModal.numberOrFalse
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    setLayoutsModalOpen: (numberOrFalse) => {
        dispatch(userActions.setLayoutsModalOpen(numberOrFalse))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutsRequestModal);