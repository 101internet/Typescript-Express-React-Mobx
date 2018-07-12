import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { IReactComponent } from "mobx-react";
import { Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as classNames from "classnames";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden" as "hidden",
    position: "relative" as "relative",
    display: "flex" as "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute" as "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none" as "none"
  },
  drawerPaper: {
    position: "relative" as "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex" as "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  },
  toolbar: theme.mixins.toolbar
});

export interface LayoutProps {
  component: IReactComponent;
  path: string;
  theme: Theme;
  classes: any;
  render: any;
}

export interface LayoutState {
  mobileOpen: boolean;
  open: boolean;
  anchor: "left" | "right";
}

class Layout extends React.Component<LayoutProps, LayoutState> {
  state;

  constructor(props, context: any) {
    super(props, context);

    this.state = {
      open: false,
      anchor: "left"
    };
  }

  // handleDrawerOpen = () => {
  //     this.setState({ open: true });
  // };

  // handleDrawerClose = () => {
  //     this.setState({ open: false });
  // };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  handleClickMainMenu = event => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    let { component: Component, classes, theme, render, ...rest } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <NavLink to="/admin">
            <ListItem button divider>
              <ListItemText primary="Mobx демо" />
            </ListItem>
          </NavLink>

          <NavLink to="/admin/page">
            <ListItem button divider>
              <ListItemText primary="админка/страницы" />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleClickMainMenu}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Administration panel
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open
              }
            )}
          >
            <div className={classes.drawerHeader} />
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

export const AdminLayout = withStyles(styles, { withTheme: true })(Layout);
