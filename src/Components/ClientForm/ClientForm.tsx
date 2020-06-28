import React from "react";
import {SubmitClientDataType} from "../../types/types";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {addUserRequest} from "../../redux/users-reducer";
import {Controller, useForm} from "react-hook-form";
import {
    Container, Button,Typography,
    makeStyles
} from "@material-ui/core";
import {renderMaskedTextField, renderTextField} from "../FormInstances/FormComponents";

const useStyles = makeStyles(theme => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
        textAlign: "center"
    },
    container: {
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

type MapStatePropsType = {
    isFetching: boolean
}

type MapDispatchPropsType = {
    addUser: (data: SubmitClientDataType) => void
}

const ClientForm: React.FC<MapStatePropsType & MapDispatchPropsType> = ({addUser,isFetching}) => {
    const classes = useStyles();
    const {handleSubmit, reset, errors, control} = useForm<SubmitClientDataType>({
        mode: 'onSubmit',
        reValidateMode: "onSubmit"
    });
    let submitUser = handleSubmit(data => {
        addUser(data);
        reset(data);
    })
    return (
        <Container className={classes.container}>
            <Typography variant="h3" align="center">
                Отправить Заявку
            </Typography>
            <form className={classes.form} onSubmit={submitUser}>
                <Controller as={renderTextField} label="Имя" name="user_name" margin="normal"
                            rules={{required: 'Это поле обязательно'}}
                            helperText={errors.user_name && errors.user_name.message}
                            error={errors.hasOwnProperty("user_name")}
                            control={control} defaultValue=""/>
                <Controller as={renderTextField} label="Фамилия" name="user_surname" margin="normal"
                            rules={{required: 'Это поле обязательно'}}
                            helperText={errors.user_surname && errors.user_surname.message}
                            error={errors.hasOwnProperty("user_surname")}
                            control={control} defaultValue=""/>
                <Controller as={renderTextField} label="Отчество" name="user_patronymic" margin="normal"
                            rules={{required: 'Это поле обязательно'}}
                            helperText={errors.user_patronymic && errors.user_patronymic.message}
                            error={errors.hasOwnProperty("user_patronymic")}
                            control={control} defaultValue=""/>
                <Controller as={renderMaskedTextField} label="Телефон" name="user_tel" type="tel" margin="normal"
                            rules={{required: 'Это поле обязательно', minLength: 18}}
                            helperText={errors.user_tel && errors.user_tel.message}
                            error={errors.hasOwnProperty("user_tel")}
                            control={control} defaultValue=""/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isFetching}
                    className={classes.submit}
                >
                    Отправить
                </Button>
            </form>
        </Container>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isFetching: state.estatesEntity.isFetching,
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    addUser: (data) => {
        dispatch(addUserRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);