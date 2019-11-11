import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { GridLayout } from "./grid/grid";

function App() {
  const [colls, setCols] = useState(2);

  return (
    <div className="App">
      <h1>Smart grid</h1>
      <div className="controls">
        <div style={{ paddingRight: "8px" }}>Collumns</div>
        <input
          className="input"
          onChange={e => setCols(e.target.value)}
          value={colls}
        />
      </div>
      <GridLayout
        collNumber={colls}
        css={{ marginLeft: "-8px" }}
        withSelect
        withSearch
      >
        <div className="card" name="anxious">
          anxious
        </div>
        <div className="card" name="effect">
          effect
        </div>
        <div className="card" name="through">
          through
        </div>
        <div className="card" name="attribute">
          attribute
        </div>
        <div className="card" name="attribute">
          attribute
        </div>
        <div className="card" name="information">
          information
        </div>
        <div className="card" name="diversity">
          diversity
        </div>
        <div className="card" name="compromise">
          compromise
        </div>
        <div className="card" name="appropriate">
          appropriate
        </div>
        <div className="card" name="wallet">
          wallet
        </div>
        <div className="card" name="machair">
          machair
        </div>
      </GridLayout>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
