import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";

import AdvancedCanvasManipulate from "./containers/AdvancedCanvasManipulate/AdvancedCanvasManipulate";
import BasicCanvasManipulate from "./containers/BasicCanvasManipulate/BasicCanvasManipulate";
import Lojban from "./containers/Lojban/Lojban";

export const App: React.FC<{}> = () => {
  return (
    <Router>
      <Header></Header>
      <Route path="/" exact component={AdvancedCanvasManipulate} />
      <Route path="/basic" exact component={BasicCanvasManipulate} />
      <Route path="/lojban" exact component={Lojban} />
    </Router>
  );
};
