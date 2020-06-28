import React, {useState} from "react";
import {EstateCollectionType, EstateType} from "../../types/types";
import {Controller, useForm} from "react-hook-form";
import {
    Box,Grid,TextField,InputAdornment,Typography,
    Table, TableHead, TableCell, TableBody, TableRow,
    Button,IconButton,
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {renderTextField} from "./FormComponents";
import {groupBy} from "../../utils/lodash";

type OwnPropsType = {
    isFetching: boolean
    appendEstate?: (data: EstateType) => void
    updateEstate?: (id: number, data: EstateType) => void
    setFormOpen: (boolean: boolean) => void
    estateFields?: EstateType
    estatesForOptions: Array<EstateType>
}

const ObjectCreatorFormInstance: React.FC<OwnPropsType> = (
    {
        isFetching,
        estateFields,
        estatesForOptions,
        setFormOpen,
        updateEstate,
        appendEstate
    }) => {
    const defaultValues = estateFields || {
        "building": "",
        "district": "",
        "location": "",
        "photos": "",
        "collection": [
            {"apartment_type": "Ст", "price": null, "square": null},
            {"apartment_type": "1к", "price": null, "square": null},
            {"apartment_type": "2с", "price": null, "square": null},
            {"apartment_type": "2к", "price": null, "square": null},
            {"apartment_type": "3с", "price": null, "square": null},
            {"apartment_type": "3к", "price": null, "square": null},
            {"apartment_type": "4+", "price": null, "square": null},
        ],
    };
    const {handleSubmit, control, reset, errors} = useForm<EstateType>({
        defaultValues
    });
    const [collectionState, setCollection] = useState<EstateCollectionType[]>(defaultValues.collection)

    const onSubmit = handleSubmit(({collection, ...data}) => {
        let date_iso = new Date().toISOString();
        collection = collectionState;
        if (defaultValues.id && updateEstate) {
            updateEstate(defaultValues.id, {date_iso, collection, ...data})
        } else if (appendEstate) {
            appendEstate({date_iso, collection, ...data})
        }
        reset(defaultValues)
        setFormOpen(false)
    })

    return (
        <form onKeyUp={() => console.log(1)} style={{
            //Для предотвращения размытия при использовании react-draggable
            transform: "translate3d(0, 0, 0)"
        }}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography component="h2" variant="h6" color="textPrimary" gutterBottom>
                        Объекты
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Controller as={renderTextField} control={control}
                                rules={{required: 'Введите Стройку'}}
                                helperText={errors.building && errors.building.message}
                                error={errors.hasOwnProperty("building")}
                                label="Стройка" name="building" margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control} name="district"
                        onChange={([e, data]) => data}
                        onInputChange={(e: any, data: string) => data}
                        rules={{required: 'Введите Район'}}
                        defaultValue={defaultValues.district}
                        as={<Autocomplete
                            id="автозаполнение-районов" freeSolo autoSelect fullWidth
                            options={
                                Object.keys(groupBy(estatesForOptions, (estate: EstateType) => estate.district))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Район" margin="normal"
                                    error={errors.hasOwnProperty("district")}
                                    helperText={errors.district && errors.district.message}
                                />
                            )}
                        />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={renderTextField} control={control} label="Адресс" name="location" margin="normal"/>
                </Grid>
            </Grid>
            <Table size="small" padding={(window.innerWidth > 767) ? "default" : "none"}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Тип
                        </TableCell>
                        <TableCell>
                            Цена от
                        </TableCell>
                        <TableCell colSpan={2}>
                            Площадь
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {collectionState.length && collectionState.map((item, index) => {
                            let editBody = <>
                                <TableCell>
                                    <TextField
                                        size="small" margin="dense"
                                        name={`collection.[${index}].price`} type="number"
                                        defaultValue={item.price}
                                        onChange={event => {
                                            setCollection([
                                                ...collectionState.map((item, pos) => {
                                                    if (pos === index) item.price = +event.target.value;
                                                    return item
                                                })
                                            ])
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment
                                                position="end">тыс.₽</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small" margin="dense"
                                        name={`collection.[${index}].square`} type="number"
                                        defaultValue={item.square}
                                        onChange={event => {
                                            setCollection([
                                                ...collectionState.map((item, pos) => {
                                                    if (pos === index) item.square = +event.target.value
                                                    return item
                                                })
                                            ])
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment
                                                position="end">м²</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" size="small" aria-label="delete apartment" component="span"
                                                onClick={() => {
                                                    setCollection([
                                                        ...collectionState.map((item, pos) => {
                                                            if (pos === index) {
                                                                item.price = null;
                                                                item.square = null
                                                            }
                                                            return item
                                                        })
                                                    ])
                                                }}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </>;
                            if ((item.price && item.square) === null) editBody = <>
                                <TableCell colSpan={3} align="left">
                                    <Button variant="outlined" color="primary"
                                            onClick={() => {
                                                setCollection([
                                                    ...collectionState.map((item, pos) => {
                                                        if (pos === index) {
                                                            item.price = 1000;
                                                            item.square = 10;
                                                        }
                                                        return item
                                                    })
                                                ])
                                            }}>
                                        Добавить
                                    </Button>
                                </TableCell>
                            </>
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th">
                                        {item.apartment_type}
                                        <Box display="none">
                                            <Controller as={renderTextField} control={control}
                                                        size="small" margin="dense"
                                                        name={`collection.[${index}].apartment_type`}
                                                        defaultValue={item.apartment_type}/>
                                        </Box>
                                    </TableCell>
                                    {editBody}
                                </TableRow>
                            )
                        }
                    )}
                </TableBody>
            </Table>
            <Controller as={renderTextField} control={control} label="Фото" name="photos" margin="normal"/>
            <Button variant="contained" color="primary" disabled={isFetching} onClick={onSubmit}>
                {appendEstate ? "Добавить" : "Изменить"} объёкт
            </Button>
        </form>
    )
}

export default ObjectCreatorFormInstance;