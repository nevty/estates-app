import React from "react";
import {EstateType} from "../../../types/types";
import {Grid, Typography, Box} from "@material-ui/core";
import EstateCard from "../EstateCard/EstateCard";

type PropsType = {
    estates: Array<EstateType>
    title: string
}

const EstatesList:React.FC<PropsType> = ({estates,title})=> {
    return (
        <Box m={2}>
            <Box p={2}>
                <Typography color="textSecondary" variant="h4">
                    {title}
                </Typography>
            </Box>
            <Grid container spacing={2} justify="center">
                {estates.map((item, index) => <EstateCard key={index} item={item}/>)}
            </Grid>
        </Box>
    )
}

export default EstatesList;