import { ButtonGroup, Button, Card } from "@blueprintjs/core";
import { useState } from "react";
import { slpitMarkAndText } from "../utils/readfile";

function Show({ instanceRef }) {
  const [currentPart, setCurrentPart] = useState("");
  // console.log(instanceRef.current);

  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "90%",
        }}
        readOnly
        // onClick={(e) => {
        //   let text = instanceRef.current.nextSection();
        //   setCurrentPart(text);
        // }}
      >
        <Links_wiki_syntax
          strContent={currentPart}
          instanceRef={instanceRef}
          setCurrentPart={setCurrentPart}
        />
      </Card>
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

function Links_wiki_syntax({ strContent, instanceRef, setCurrentPart }) {
  // const handlerLink = useCallback(
  //   (targetSection) => {
  //     setCurrentPart(instanceRef.current.gotoSection(targetSection));
  //   },
  //   [instanceRef]
  // );
  // console.log(strContent);
  if (strContent instanceof Array) strContent = strContent.join("");
  if (
    strContent === null ||
    strContent === "" ||
    typeof strContent !== "string"
  ) {
    return;
  }
  // 使用react元素拼接的方式<p></p><a></a>
  let link_array = slpitMarkAndText(strContent);
  link_array = link_array.map((item) => {
    // item字典
    if (item.type === "link") {
      if (item.alias === "") {
        return (
          <a
            style={{ display: "inline" }}
            onClick={() => {
              setCurrentPart(instanceRef.current.gotoSection(item.main));
            }}
          >
            {item.main}
          </a>
        );
      }
      return (
        <a
          style={{ display: "inline" }}
          onClick={() => {
            setCurrentPart(instanceRef.current.gotoSection(item.main));
          }}
        >
          {item.alias}
        </a>
      );
    }
    return <p style={{ display: "inline" }}>{item.content}</p>;
  });
  return <div>{link_array}</div>;
}
export { Show };
