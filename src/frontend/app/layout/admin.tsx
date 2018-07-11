import * as React from "react";
import { Route, RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { IReactComponent } from "mobx-react";
import {
    createStyles,
    withStyles,
    Theme,
    Divider,
    Hidden,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    List,
    Drawer,
    ListItem,
    ListItemText
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const drawerWidth = 240;
const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            minHeight: 430,
            marginTop: theme.spacing.unit * 3,
            zIndex: 1
        },
        appFrame: {
            position: "relative" as "relative",
            display: "flex",
            width: "100%",
            height: "100%"
        },
        appBar: {
            position: "absolute" as "absolute",
            marginLeft: drawerWidth,
            [theme.breakpoints.up("md")]: {
                width: `calc(100% - ${drawerWidth}px)`
            }
        },
        navIconHide: {
            [theme.breakpoints.up("md")]: {
                display: "none"
            }
        },
        drawerHeader: theme.mixins.toolbar,
        drawerPaper: {
            width: 250,
            [theme.breakpoints.up("md")]: {
                width: drawerWidth,
                position: "relative",
                height: "100%"
            }
        },
        content: {
            backgroundColor: theme.palette.background.default,
            width: "100%",
            padding: theme.spacing.unit * 3,
            height: "auto",
            marginTop: 56,
            [theme.breakpoints.up("sm")]: {
                height: "auto",
                marginTop: 64
            }
        }
    });

export interface LayoutProps extends RouteComponentProps<any> {
    component: IReactComponent;
    theme: Theme;
    classes: any;
    sites: string[];
}

export interface LayoutState {
    mobileOpen: boolean;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props, context: any) {
        super(props, context);
        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        let { component: Component, classes, theme, ...rest } = this.props;

        const drawer = (
            <div>
                <div className={classes.drawerHeader} />
                <Divider />
                <List>
                    <NavLink to="/admin">
                        <ListItem button divider>
                            <ListItemText primary="админка" />
                        </ListItem>
                    </NavLink>

                    <NavLink to="/admin/page">
                        <ListItem button divider>
                            <ListItemText primary="админка/страницы" />
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                Админка
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={
                                theme.direction === "rtl" ? "right" : "left"
                            }
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <Route
                            {...rest}
                            render={matchProps => <Component {...matchProps} />}
                        />
                    </main>
                </div>
            </div>
        );
    }
}

export const AdminLayout: any = withStyles(styles, { withTheme: true })(Layout);