import { ButtonGroup, Button, Card } from "@blueprintjs/core";
import { useState } from "react";
import { slpitMarkAndText } from "../utils/readfile";
import { useRef } from "react";

function Show({ instanceRef }) {
  const [currentSection, setCurrentSection] = useState([]);
  const [currentPart, setCurrentPart] = useState("");
  const currentPartPosition = useRef(0);
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
          setCurrentSection={setCurrentSection}
          setCurrentPart={setCurrentPart}
        />
      </Card>
      <ButtonGroup style={{ margin: 20 }}>
        <Button
          text="back"
          onClick={() => {
            let myCurrentSection = instanceRef.current.previewSection();
            if (myCurrentSection === undefined) return;
            let myCurrentPart = myCurrentSection[0];
            console.log(myCurrentPart);
            setCurrentSection(myCurrentSection);
            setCurrentPart(myCurrentPart);
          }}
        />
        <Button
          text="next"
          onClick={() => {
            let myCurrentSection = instanceRef.current.nextSection();
            if (myCurrentSection === undefined) return;
            let myCurrentPart = myCurrentSection[0];
            console.log(myCurrentPart);
            setCurrentSection(myCurrentSection);
            setCurrentPart(myCurrentPart);
          }}
        />

        <Button
          text="backPart"
          onClick={() => {
            if (currentPartPosition.current >= -1) {
              // 从最大值的下标开始减少
              currentPartPosition.current--;
              let myCurrentPart = currentSection[currentPartPosition.current];
              console.log(currentPartPosition.current);
              setCurrentPart(myCurrentPart);
            }
          }}
        />
        <Button
          text="nextPart"
          onClick={() => {
            // 从下标0开始增加
            if (currentPartPosition.current < currentSection.length - 1) {
              currentPartPosition.current++;
              let myCurrentPart = currentSection[currentPartPosition.current];
              console.log(currentPartPosition.current);
              setCurrentPart(myCurrentPart);
            }
          }}
        />
        <Button text="Three" />
        <Button text="four" />
        <Button text="five" />
      </ButtonGroup>
    </>
  );
}

function Links_wiki_syntax({
  strContent,
  instanceRef,
  setCurrentSection,
  setCurrentPart,
}) {
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
              let myCurrentSection = instanceRef.current.gotoSection(item.main);
              let myCurrentPart = myCurrentSection[0];
              setCurrentSection(myCurrentSection);
              setCurrentPart(myCurrentPart);
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
            let myCurrentSection = instanceRef.current.gotoSection(item.main);
            let myCurrentPart = myCurrentSection[0];
            setCurrentSection(myCurrentSection);
            setCurrentPart(myCurrentPart);
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
