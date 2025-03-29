import { useState, useRef, useEffect } from "react";
import "./App.css";
import {  Show } from "./component/gamePanel";
import { Card } from "@blueprintjs/core";
import { GameFile } from "./utils/readfile.js";
import { mystr } from "./nature";

function App() {
  const myClassInstanceRef = useRef(null);
  useEffect(() => {
    myClassInstanceRef.current = new GameFile(mystr);
  }, []);
  // console.log(myClassInstanceRef.current);

  return (
    <Card elevation={3} style={{ width: 800, height: 500 }}>
        <Show instanceRef={myClassInstanceRef}></Show>
    </Card>
  );
}
export default App;
