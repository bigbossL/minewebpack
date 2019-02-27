import * as React from "react";
import { render } from "react-dom";
import { HashRouter, Route, BrowserRouter, Link,Switch} from "react-router-dom";
import { router } from "./../config/router";

export function MineRouter() {
  let routers = [];
  router.forEach(e => {
    routers.push(<Route path={e.path} component={e.component} />);
  });
  return <HashRouter><Switch>{routers}</Switch></HashRouter>;
}
