import React from 'react';
import {
    Container, Link, Toolbar, makeStyles
} from "@material-ui/core";
import {indigo} from "@material-ui/core/colors";
import {ReactComponent as Logo} from "../../logo.svg"

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: `1px solid ${indigo[100]}`
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLogo: {
        display: "flex",
        flexWrap: "nowrap"
    },
    toolbarSvg: {
        width: "50px",
        height: "auto",
        fill: indigo[600],
    },
    toolbarLink: {
        position: "relative",
        padding: theme.spacing(3, 0),
        flexShrink: 0,
        "&:hover": {
            color: indigo[500],
        },
        "& hr": {
            position: "absolute",
            width: "100%",
            margin: 0,
            borderColor: indigo[600],
            borderWidth: 0,
            bottom: 0
        },
        "&:hover hr": {
            borderWidth: "1px"
        },
        "&.active": {
            color: indigo[500],
        },
        "&.active hr": {
            borderWidth: "1px"
        },
    },
}));

function Header({ sections }) {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <Container maxWidth="lg">
                <Toolbar component="nav" variant="regular" className={classes.toolbarSecondary}>
                    <Link
                        color="inherit"
                        noWrap
                        variant="body2"
                        href="#"
                        underline="none"
                        className={classes.toolbarLogo}
                    >
                        <Logo className={classes.toolbarSvg}/>
                    </Link>
                    {
                        sections.map((string, index) => (
                            <Link
                                color="inherit"
                                key={index}
                                noWrap
                                variant="body2"
                                href="#"
                                underline="none"
                                className={string.active ? `${classes.toolbarLink} active` : classes.toolbarLink}
                            >
                                {string.title || string}
                                <hr className={classes.toolbarLinkAfter}/>
                            </Link>
                        ))
                    }
                </Toolbar>
            </Container>
        </div>
    );
}

export default Header;
