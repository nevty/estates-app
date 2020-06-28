import React from "react";
import InputMask from "react-input-mask";
import {InputLabel, Select} from "@material-ui/core";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import FormControlMUI, {FormControlProps} from "@material-ui/core/FormControl";

type OwnTextFieldPropsType = {
    value?: string
}

type OwnSelectFieldPropsType ={
    label: string
    name: string
    value?: string
}

export const renderTextField: React.FC<TextFieldProps & OwnTextFieldPropsType> = ({label, onChange, value, ...custom}) => (
    <TextField
        label={label}
        fullWidth={true}
        onChange={onChange}
        value={value}
        {...custom}
    />
)
export const renderMaskedTextField: React.FC<TextFieldProps & OwnTextFieldPropsType> = ({label, onChange, value, ...custom}) => (
    <InputMask mask="+7 (999) 999-99-99" maskChar={null} value={value} onChange={onChange}>
        {() => (
            <TextField
                label={label}
                fullWidth={true}
                {...custom}
            />
        )}
    </InputMask>
)

export const renderSelectField: React.FC<FormControlProps & OwnSelectFieldPropsType> = ({
        label,
        children,
        name,
        value,
        ...custom}) => {
    return (
        <FormControlMUI fullWidth={true} {...custom}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
                native
                value={value}
                inputProps={{
                    name: name,
                    id: name
                }}
            >
                {children}
            </Select>
        </FormControlMUI>
    )
}