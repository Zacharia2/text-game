import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BGroup, Show } from "./component/gamePanel";
import { Card } from "@blueprintjs/core";
import { loadGameFile } from "./utils/readfile";
import { mystr } from "./自然";
import { useRef } from "react";

function App() {
  let gamestr = useRef("");
  gamestr = loadGameFile(mystr).join("\n\n");

  return (
    <Card elevation={3} style={{ width: 800, height: 500 }}>
      <div>
        <Show gamestr={gamestr}></Show>
      </div>
      <div>
        <BGroup></BGroup>
      </div>
    </Card>
  );
}
export default App;
