import React from 'react';
import EstatesContainer from "../Components/EstatesContainer/EstatesContainer";
import ScrollTop from "react-scroll-up";
import LayoutsRequestModal from "../Components/LayoutsContainer/LayoutsRequestModal/LayoutsRequestModal";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Header from "../Components/Header/Header";
import Fab from "@material-ui/core/Fab";

function Home() {
    const sections = [{title:"Главная",active: true},"Новостройки","Ипотека"];
    return (
        <>
            <Header sections={sections}/>
            <main>
                <EstatesContainer/>
                <LayoutsRequestModal/>
                <ScrollTop showUnder={150} style={{
                    position: 'fixed',
                    bottom: 50,
                    right: 70,
                    cursor: 'pointer',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'linear',
                    transitionDelay: '0s'
                }}>
                    <Fab color="primary" size="medium">
                        <ArrowUpwardIcon fontSize="default"/>
                    </Fab>
                </ScrollTop>
            </main>
        </>
    );
}

export default Home;
