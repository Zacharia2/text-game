import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BGroup, Show } from "./component/gamePanel";
import { Card } from "@blueprintjs/core";
import { loadGameFile } from "./utils/readfile";

function App() {
  const [count, setCount] = useState(0);
  let gamecontent = loadGameFile("src/自然.txt").join("");
  return (
    <Card elevation={3} style={{ width: 800, height: 500 }}>
      <div>
        <Show gamecontent={gamecontent}></Show>
      </div>
      <div>
        <BGroup></BGroup>
      </div>
    </Card>
  );
}
export default App;
