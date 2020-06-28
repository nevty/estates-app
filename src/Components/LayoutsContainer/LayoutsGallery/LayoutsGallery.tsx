import React, {useEffect, useState, Suspense, lazy} from "react";
import {connect} from "react-redux";
import {EstateLayoutsType} from "../../../types/types";
import {userActions} from "../../../redux/users-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {layoutsAPI} from "../../../api/api";
import {Dialog, Box, Paper} from "@material-ui/core";
import ClientForm from "../../ClientForm/ClientForm";
import "react-image-gallery/styles/css/image-gallery.css"
import {Skeleton} from "@material-ui/lab";

type MapStatePropsType = {
    // isLayoutsModalOpen: boolean
}

type MapDispatchPropsType = {
    // setLayoutsModalOpen: (boolean:boolean) => void
}

type OwnPropsType = {
    images: EstateLayoutsType[]
}

const Mock = () => (
    <>
        <Skeleton variant="rect" animation="wave" width={320} height={170}/>
        <Skeleton variant="text" animation="wave" height={60}/>
    </>
)

const ImageGallery = lazy(() => import("react-image-gallery"))

const LayoutsGallery: React.FC<OwnPropsType> = ({images}) => {
    const items = images.map(i=>(
        {
            original: i.image,
            thumbnail: i.image,
            originalClass: "imgSize",
            thumbnailClass: "tmbSize"
        }
    ))
    return (
        <Suspense fallback={<Mock/>}>
            <ImageGallery lazyLoad showPlayButton={false} items={items}/>
        </Suspense>
    )
}

export default LayoutsGallery;