import React, {useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Draggable from 'react-draggable'
import {
    appendEstateRequest,
    updateEstateRequest
} from "../../redux/estates-reducer";
import {adminActions} from "../../redux/admin-reducer";
import {EstateType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {Box, Modal, Paper,SvgIcon, Button, Theme,makeStyles} from "@material-ui/core";
import PanToolIcon from '@material-ui/icons/PanTool';
import ObjectCreatorFormInstance from "../FormInstances/ObjectCreatorFormInstance";
import {withAuthAdminRedirect} from "../../hoc/withAuthAdminRedirect";
import EstatesToolBar from "./EstatesToolBar/EstatesToolBar";
import EstatesContainer from "../EstatesContainer/EstatesContainer";

const useStyles = makeStyles((theme:Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        width: "100%",
        paddingTop: "20px"
    },
    paper: {
        boxSizing: "border-box",
        maxWidth: "480px",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
        padding: theme.spacing(1,3,3,3)
    },
    paperCollapsed: {
        maxHeight: "40px",
        marginTop: "-20px",
        overflowY: "hidden",
        maxWidth: "none",
        width: "100%",
    }
}))

type MapStatePropsType = {
    isFetching: boolean
    isEditFormOpen: boolean
    estate: EstateType
    estates: Array<EstateType>
}

type MapDispatchPropsType = {
    appendEstate: (data: EstateType) => void
    updateEstate: (id: number, data: EstateType) => void
    setEditFormOpen: (boolean: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const EstatesRedactor: React.FC<PropsType> = (
    {
        estate,
        estates,
        appendEstate,
        updateEstate,
        isFetching,
        setEditFormOpen,
        isEditFormOpen
    }) => {
    const classes = useStyles();
    const closeEditForm = () => {
        setEditFormOpen(false)
    }
    const [isCreateFormOpen, setCreateFormOpen] = useState(false);
    const [isFormCollapsed,setFormCollapsed] = useState(false);
    const closeCreateForm = () => {
        setFormCollapsed(false);
        setCreateFormOpen(false)
    }
    const openCreateForm = () => {
        setCreateFormOpen(true);
    }

    return (
        <>
            <Modal
                className={classes.modal} style={{left: 0, right: "auto"}}
                open={isEditFormOpen} onClose={closeEditForm} disableScrollLock
            >
                <Draggable axis="x" handle="#draggable-edit" bounds="body">
                    <Box component={Paper} className={isFormCollapsed ? `${classes.paperCollapsed} ${classes.paper}`: classes.paper}>
                        <Button id="draggable-edit" onTouchStart={()=>setFormCollapsed(!isFormCollapsed)} size="small" fullWidth disableRipple>
                            <SvgIcon color="action" fontSize="small" component={PanToolIcon}/>
                        </Button>
                        <ObjectCreatorFormInstance
                            isFetching={isFetching}
                            setFormOpen={setEditFormOpen}
                            estateFields={estate}
                            updateEstate={updateEstate}
                            estatesForOptions={estates}
                        />
                    </Box>
                </Draggable>
            </Modal>
            <Modal
                className={classes.modal} style={{left: 0, right: "auto"}}
                open={isCreateFormOpen} onClose={closeCreateForm} keepMounted disableScrollLock
            >
                <Draggable axis="x" handle="#draggable-create" bounds="body">
                    <Box component={Paper} className={isFormCollapsed ? `${classes.paperCollapsed} ${classes.paper}`: classes.paper}>
                        <Button id="draggable-create" onTouchStart={()=>setFormCollapsed(!isFormCollapsed)} size="small" fullWidth disableRipple>
                            <SvgIcon color="action" fontSize="small" component={PanToolIcon}/>
                        </Button>
                        <ObjectCreatorFormInstance
                            isFetching={isFetching}
                            setFormOpen={setCreateFormOpen}
                            appendEstate={appendEstate}
                            estatesForOptions={estates}
                        />
                    </Box>
                </Draggable>
            </Modal>
            <EstatesToolBar openForm={openCreateForm}/>
            <EstatesContainer/>
        </>
    );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    estate: state.estatesEntity.estate,
    estates: state.estatesEntity.estates,
    isFetching: state.estatesEntity.isFetching,
    isEditFormOpen: state.adminState.objectFormEdit.isOpen
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    appendEstate: (data) => {
        dispatch(appendEstateRequest(data))
    },
    updateEstate: (id: number, data: EstateType) => {
        dispatch(updateEstateRequest(id, data))
    },
    setEditFormOpen: (boolean) => {
        dispatch(adminActions.setEditFormOpen(boolean))
    },
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthAdminRedirect
)(EstatesRedactor);