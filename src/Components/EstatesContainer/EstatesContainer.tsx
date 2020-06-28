import React, {useEffect, useState} from 'react'
import {EstateType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {
    getEstatesRequest,
} from "../../redux/estates-reducer";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {Container, Paper, Typography, Box} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {groupBy} from "../../utils/lodash";
import EstatesList from "./EstatesList/EstatesList";
import EstatesFilter, {FormDataTypes} from './EstatesFilter/EstatesFilter';

type MapStatePropsType = {
    estates: Array<EstateType>
}

type MapDispatchPropsType = {
    getEstates: () => void
}

type handledFilterType = (item: EstateType) => EstateType | boolean

type PropsType = MapStatePropsType & MapDispatchPropsType

export type apartments = {
    studios: boolean,
    studiosReference: { [key: string]: string },
    flat: { [key: string]: boolean }
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: "650px",
        padding: theme.spacing(1, 0),
        backgroundColor: grey[100],
        color: grey[700],
    },
    filter: {
        padding: "20px",
        boxShadow: "0 3px 15px 3px rgba(153,153,153,0.2)"
    },
    headline: {
        margin: "40px 0"
    }
}));

const EstatesContainer: React.FC<PropsType> = ({getEstates, estates}) => {
    const [filteredEstates, filterEstates] = useState(estates);
    const [apartmentTypes, setApartmentTypes] = useState<apartments>({
        studios: false,
        studiosReference: {"Ст": "1к", "2с": "2к", "3с": "3к"},
        flat: {"1к": false, "2к": false, "3к": false, "4+": false}
    })
    useEffect(() => {
        getEstates();
    }, [getEstates]);
    useEffect(() => {
        if (estates && estates.length > 0) {
            filterEstates(estates)
        }
    }, [estates]);
    const {handleSubmit, control} = useForm<FormDataTypes>();
    const onSubmit = handleSubmit(data => {
        let handleFilterDistrict: handledFilterType = (item: EstateType) => item;
        let handleFilterPrice: handledFilterType = (item: EstateType) => item;
        let handleFilterSquare: handledFilterType = (item: EstateType) => item;
        let handleFilterApartmentTypes: handledFilterType = (item: EstateType) => item;

        let apartmentTypesArr = Object.keys(apartmentTypes.flat).reduce((arr: any[], key: string) => {
            if (apartmentTypes.flat[key]) {
                arr.push(key);
                if (apartmentTypes.studios) arr.push(Object.keys(apartmentTypes.studiosReference).filter(sr => apartmentTypes.studiosReference[sr] === key)[0]);
            } else if (apartmentTypes.studios) {
                arr = ["Ст"];
            }
            return arr
        }, []);
        if (data.filter_district) handleFilterDistrict = (item: EstateType) => item.district === data.filter_district;
        if (data.filter_price) handleFilterPrice = (item: EstateType) => item.collection.some(c => {
            if (c.price) {
                return c.price >= data.filter_price
            } else return false
        });
        if (data.filter_square) handleFilterSquare = (item: EstateType) => item.collection.some(c => {
            if (c.square) {
                return c.square >= data.filter_square
            } else return false
        });
        if (apartmentTypesArr.length > 0) handleFilterApartmentTypes = (item: EstateType) => item.collection.some(c => {
            let empty = (c.price && c.square) === null;
            if (!empty) {
                return apartmentTypesArr.some(t => t === c.apartment_type)
            }
            return false
        });
        filterEstates(estates.filter(handleFilterDistrict).filter(handleFilterApartmentTypes).filter(handleFilterPrice).filter(handleFilterSquare))
    });
    const classes = useStyles();
    let GroupedEstates = groupBy(filteredEstates, (estate: EstateType) => estate.district);
    return (
        <Box component="section" className={classes.container}>
            <Container maxWidth="lg">
                <Typography variant="h4" color="textPrimary" className={classes.headline}>
                    Новостройки
                </Typography>
                <Paper className={classes.filter}>
                    <EstatesFilter
                        onSubmit={onSubmit}
                        estatesForOptions={estates}
                        apartmentTypes={apartmentTypes}
                        setApartmentTypes={setApartmentTypes}
                        control={control}/>
                </Paper>
            </Container>
            <div>
                {
                    Object.keys(GroupedEstates).map((group, index) => (
                        <EstatesList key={index} title={group} estates={GroupedEstates[group]}/>
                    ))
                }
            </div>
        </Box>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    estates: state.estatesEntity.estates
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    getEstates: async () => {
        await dispatch(getEstatesRequest())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EstatesContainer);