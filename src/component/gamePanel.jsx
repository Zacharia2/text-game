import { ButtonGroup, Button, TextArea } from "@blueprintjs/core";
import { useState } from "react";

export function Show({ gamestr }) {
  const [count, setCount] = useState(0);

  return (
    <TextArea
      style={{ width: 800, height: 400 }}
      readOnly
      value={gamestr}
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
