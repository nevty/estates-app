import React from "react";
import {EstateCollectionType, EstateType} from "../../../types/types";
import {compose} from "redux";
import {
    Grid,Card, CardMedia, Button,Typography,
    List,ListItem,Divider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {withEstatesCardAdmin} from "../../../hoc/withEstatesCardAdmin";

const useStyles = makeStyles(theme => ({
    card: {
        width: "280px",
        paddingTop: theme.spacing(2),

    },
    cardMedia: {
        height: "200px",
    },
}));

type OwnPropsType = {
    item: EstateType;
    id: number;
    layoutsRequest: () => void
}

const EstateCard: React.FC<OwnPropsType> = (
    {item, id,layoutsRequest}) => {
    const classes = useStyles();
    let collectionArray: EstateCollectionType[] = item.collection.slice().sort(function(a, b){
        let apartmentEnum = ["Ст", "1к", "2с", "2к", "3с", "3к", "4+"];
        return apartmentEnum.indexOf(a.apartment_type) - apartmentEnum.indexOf(b.apartment_type);
    });
    const ListCollectionArray = () => {
        const collectionList = collectionArray.length && collectionArray.map((c: EstateCollectionType, index: number) => {
            if ((c.square && c.price) !== null) return (
                <React.Fragment key={index}>
                    <Divider light/>
                    <ListItem>
                        <Grid container>
                            <Grid item xs={4}>
                                {c.apartment_type}
                            </Grid>
                            <Grid item xs={5}>
                                {c.price} тыс.₽
                            </Grid>
                            <Grid item xs={3}>
                                {c.square}м²
                            </Grid>
                        </Grid>
                    </ListItem>
                </React.Fragment>
            )
            return null
        })
        return (<>{collectionList}</>)
    }

    return (
        <Grid item>
            <Card elevation={4} className={classes.card}>
                <Grid item>
                    {id && <Typography color="secondary">{id}</Typography>}
                    <Typography component="h5" variant="h5">
                        {item.building}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {item.location}
                    </Typography>
                    <CardMedia
                        className={classes.cardMedia}
                        image={item.photos || "http://www.randrs.ru/photo/0-0/13883_eyon-plbsn.jpg"}
                        title={item.building}
                    />
                    <List disablePadding>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={4}>
                                    Тип
                                </Grid>
                                <Grid item xs={5}>
                                    Цена от
                                </Grid>
                                <Grid item xs={3}>
                                    Площадь
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListCollectionArray/>
                    </List>
                </Grid>
                <Grid item style={{padding: "5px"}}>
                    <Button
                        fullWidth color="primary"
                        variant="contained"
                        onClick={()=>{
                            layoutsRequest()
                        }}
                    >
                        {id ? "Добавить планировки": "Узнать планировки"}
                    </Button>
                </Grid>
            </Card>
        </Grid>
    )
}

export default compose(
    withEstatesCardAdmin,
)(EstateCard)