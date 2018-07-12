import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withStyles, Theme, Button, TextField, Grid } from "@material-ui/core";
import { STORE_USER } from "../../constants/stores";
import { inject } from "mobx-react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/userStore";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

interface PageProps extends RouteComponentProps<any> {
  theme: Theme;
  userStore: UserStore;
  classes: any;
}

@inject(STORE_USER)
@observer
class Main extends React.Component<PageProps, any> {
  constructor(props, context: any) {
    super(props, context);
    this.state = {
      open: false
    };
  }

  handleChangeInput = e => {
    this.props[STORE_USER].onChangeInput(e.target.value);
  };

  render() {
    const { classes } = this.props;
    const userStore = this.props[STORE_USER];

    return (
      <div>
        <Grid container spacing={16}>
          <Grid item>
            <TextField
              onChange={this.handleChangeInput}
              value={userStore.inputAdd}
            />
          </Grid>
          <Grid item>
            <Button onClick={() => userStore.add()} variant="raised">
              Добавить
            </Button>
          </Grid>
        </Grid>
        <ul>
          {userStore.list.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
    );
  }
}

export const MainPage = withStyles(styles, { withTheme: true })(Main);
