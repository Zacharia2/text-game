import { ButtonGroup, Button, TextArea } from "@blueprintjs/core";
import { useState } from "react";

export function Show({ gameContent }) {
    let [gamestr, setGamestr] = useState("");
    setGamestr(gameContent);

  return (
    <TextArea
      style={{ width: 800, height: 400 }}
      readOnly
      //   value={gameContent}
    ></TextArea>
  );
}
export function BGroup() {
  return (
    <ButtonGroup style={{ margin: 20 }}>
      <Button text="One" />
      <Button text="Two" />
      <Button text="Three" />
      <Button text="four" />
      <Button text="five" />
    </ButtonGroup>
  );
}

// export { 按钮组, 展示 };
