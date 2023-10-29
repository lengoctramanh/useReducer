import "./App.css";
import { Fragment } from "react";
import Test1 from "./Test1";
import Test2 from "./Test2";
import IndexTest3 from './Test3/IndexTest3.jsx'
const App = () => {
  return (
    <Fragment>
      <Test1 />
      <Test2 />
     <IndexTest3/>
    </Fragment>
  );
};

export default App;
