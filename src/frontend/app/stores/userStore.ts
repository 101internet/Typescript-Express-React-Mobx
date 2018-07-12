import { observable, action, IObservableArray } from "mobx";
import { User } from "../../../entity/User";

export class UserStore {
  @observable public inputAdd: string = "";
  @observable public list: IObservableArray<User> = observable.array([]);

  @action
  onChangeInput(value: string) {
    this.inputAdd = value;
  }

  @action
  add() {
    this.list.push({
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      name: this.inputAdd
    });

    this.inputAdd = "";
  }
}
