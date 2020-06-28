import React, {FormEventHandler} from "react";
import {EstateType} from "../../../types/types";
import {Control, Controller} from "react-hook-form";
import {
    Button, Grid, TextField,
    Typography,InputAdornment,
    Theme,makeStyles
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {apartments} from "../EstatesContainer";
import {groupBy} from "../../../utils/lodash";
import {FilterButton} from "../../../utils/styled";

type OwnPropsType = {
    onSubmit: FormEventHandler
    control: Control
    estatesForOptions: EstateType[]
    apartmentTypes: apartments
    setApartmentTypes: any
}
export type FormDataTypes = {
    filter_district: string
    filter_price: number
    filter_square: number
}

const useStyles = makeStyles((theme: Theme) => ({
    apartmentRow: {
        padding: "4px 0"
    }
}));

const EstatesFilter: React.FC<OwnPropsType> = ({onSubmit, control, estatesForOptions, apartmentTypes, setApartmentTypes}) => {
    const classes = useStyles();
    const toggleStudios = (key:string) => {
        setApartmentTypes({
            ...apartmentTypes,
            flat: {
                ...apartmentTypes.flat,
                [key]: !apartmentTypes.flat[key]
            }
        })
    }
    const toggleFlat = () => {
        setApartmentTypes({
            ...apartmentTypes,
            studios: !apartmentTypes.studios
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} justify="flex-end" alignItems="center">
                <Grid item container direction="column" alignContent="flex-start" xs={12} sm={12} md={4} lg={3}>
                    <Grid item className={classes.apartmentRow}>
                        <FilterButton
                            onClick={toggleFlat}
                            className={apartmentTypes.studios ? "active": ""}
                        >
                            Студии
                        </FilterButton>
                        {[
                            {title: "1", value: "1к"},
                            {title: "2", value: "2к"},
                            {title: "3", value: "3к"},
                            {title: "4+", value: "4+"}
                        ].map(b => (
                            <FilterButton
                                key={b.title}
                                onClick={()=>toggleStudios(b.value)}
                                className={apartmentTypes.flat[b.value] ? "active": ""}
                            >
                                {b.title}
                            </FilterButton>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5} md={3} lg={4}>
                    <Controller
                        name="filter_district"
                        control={control}
                        onChange={([e, data]) => data}
                        defaultValue={null}
                        as={
                            <Autocomplete
                                fullWidth
                                autoSelect
                                noOptionsText="Нет выриантов"
                                options={
                                    Object.keys(groupBy(estatesForOptions, (estate: EstateType) => estate.district))
                                }
                                renderInput={
                                    (params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Район"
                                            variant="outlined" size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={7} sm={4} md={3} lg={3}>
                    <Controller
                        name="filter_price" control={control}
                        variant="outlined" placeholder="Цена от" size="small"
                        type="number" defaultValue=""
                        as={TextField} fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                position="end">тыс.₽</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={5} sm={3} md={2} lg={2}>
                    <Controller
                        name="filter_square" control={control}
                        type="number" defaultValue=""
                        size="small"
                        variant="outlined" placeholder="Площадь"
                        as={TextField} fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment
                                position="end">м²</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={9} md={10} style={{textAlign:"center"}}>
                    <Typography>
                        Наши контакты: +71466849545
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} md={2} style={{textAlign:"right"}}>
                    <Button type="submit" color="primary" variant="outlined">Показать</Button>
                </Grid>
            </Grid>
        </form>)
}

export default EstatesFilter