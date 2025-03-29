import { ButtonGroup, Button, TextArea } from "@blueprintjs/core";
import { useState, useEffect, useRef } from "react";

function Show({ instanceRef }) {
  const [count, setCount] = useState(0);
  const [currentPart, setCurrentPart] = useState("");
  console.log(instanceRef.current);

  return (
    <>
      <TextArea
        style={{ width: 800, height: 400 }}
        readOnly
        value={currentPart}
        onClick={(e) => {
          setCurrentPart(instanceRef.current.nextSection());
        }}
      />
      <ButtonGroup style={{ margin: 20 }}>
        <Button
          text="preview"
          onClick={() => {
            setCurrentPart(instanceRef.current.previewSection());
          }}
        />
        <Button
          text="next"
          onClick={() => {
            setCurrentPart(instanceRef.current.nextSection());
          }}
        />
        <Button text="Three" />
        <Button text="four" />
        <Button text="five" />
      </ButtonGroup>
    </>
  );
}

export { Show };
