import * as React from "react";
import { render } from "react-dom";
import { HashRouter, Route,Switch } from "react-router-dom";
import { router } from "./../config/router";

export function MineRouter() {
  let routers = [];
  router.forEach(e => {
    // exact
    routers.push(<Route path={e.path}  component={e.component} />);
  });
  return <HashRouter><Switch>{routers}</Switch></HashRouter>;
}
