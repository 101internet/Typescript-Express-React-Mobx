import * as React from "react";
import { withStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

const styles = theme => ({
    root: {
        width: "100%"
    }
});

interface PageProps extends RouteComponentProps<any> {
    theme: Theme;
    classes: any;
}

class Main extends React.Component<PageProps, any> {
    constructor(props, context: any) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Админка</div>;
    }
}

export const MainPage = withStyles(styles, { withTheme: true })(Main);