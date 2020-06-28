import React, {useState} from 'react'
import {History} from "history";
import {connect} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {AppStateType} from "../../redux/redux-store";
import {loginAdminRequest} from '../../redux/admin-reducer';
import {ErrorCodeEnum, LoginResponseType} from "../../api/api";
import {LoginAdminDataType} from "../../types/types";
import {makeStyles, Button, Typography,Grid} from "@material-ui/core";
import {renderTextField} from "../FormInstances/FormComponents";


const useStyles = makeStyles(theme => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    container: {
        minHeight: "100vh"
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

type OwnPropsType = {
    match: any
    history: History
}

type MapDispatchPropsType = {
    loginAdmin: (data: LoginAdminDataType) => Promise<LoginResponseType>
}

const LoginForm: React.FC<MapDispatchPropsType & OwnPropsType> = ({loginAdmin, match,history}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    let defaultValues = {
        admin_name: "",
        admin_password: ""
    };
    if (match.params && match.params.quest_key && match.params.quest_key === "quest") defaultValues = {admin_name: "demoquest12", admin_password: "futobhUTN32"};
    const {handleSubmit, control, reset, formState} = useForm<LoginAdminDataType>({
        defaultValues,
        mode: "onChange"
    });
    const onSubmit = handleSubmit((data) => {
        loginAdmin(data)
            .then(response => {
                if (response.error_code === ErrorCodeEnum.wrongAuth) {
                    setMessage("Неверный пароль или логин")
                }
            })
            .catch(error => console.log(error));
        reset(defaultValues);
        history.push('/admin')
    })
    return (
        <Grid container className={classes.container} spacing={0} direction="column" alignItems="center"
              justify="center">
            <Grid item>
                <Typography variant="h5">
                    Admin
                </Typography>
                {message && <Typography color="secondary">{message}</Typography>}
                <form className={classes.form} onSubmit={onSubmit}>
                    <Controller as={renderTextField} control={control} label="Login"
                                rules={{required: true}}
                                name="admin_name" margin="normal" variant="outlined"/>
                    <Controller as={renderTextField} control={control} label="Password"
                                rules={{required: true}}
                                name="admin_password" type="password" margin="normal" variant="outlined"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formState.isValid}
                        className={classes.submit}
                    >
                        Log in
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}


let mapStateToProps = (state: AppStateType) => ({})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    loginAdmin: (data) => {
        return dispatch(loginAdminRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)