import React, {useEffect, useState, ChangeEvent} from "react";
import {layoutsAPI} from "../../api/api";
import {EstateLayoutsType} from "../../types/types";
import {Typography, Select, MenuItem, FormControl} from "@material-ui/core";
import LayoutsGallery from "./LayoutsGallery/LayoutsGallery"
import {groupBy} from "../../utils/lodash";

type OwnPropsType = {
    id: number
}
const LayoutsContainer: React.FC<OwnPropsType> = ({id}) => {
    const [layouts, setLayouts] = useState<{[key:string]:EstateLayoutsType[]} | null>(null);
    const [value,setValue] = useState<string>("")
    useEffect(() => {
        (async () => {
            let res = await layoutsAPI.getLayouts(id);
            if (res) {
                setLayouts(groupBy(res, (estate: EstateLayoutsType) => estate.apartment_type))

            }
        })()
    }, [])
    return (
        <>
            {(layouts && (Object.keys(layouts).length > 0) && <Select
                id="apartment-select"
                value={value || Object.keys(layouts)[0]}
                onChange={(e:ChangeEvent<{ value: unknown }>)=>setValue(e.target.value as string)}
                variant="outlined"
                fullWidth
            >
                {
                    Object.keys(layouts).map((option)=>(
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                }
            </Select>) || "Нет данных"}
            {layouts && (Object.keys(layouts).length > 0) && <LayoutsGallery images={layouts[value || Object.keys(layouts)[0]]}/>}
        </>
    )
}

export default LayoutsContainer;