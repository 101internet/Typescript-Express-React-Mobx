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

class NoMain extends React.Component<PageProps, any> {
    constructor(props, context: any) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Ещё страничка</div>;
    }
}

export const NoMainPage = withStyles(styles, { withTheme: true })(NoMain);