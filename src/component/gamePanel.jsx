import { ButtonGroup, Button, TextArea, Card } from "@blueprintjs/core";
import { useCallback } from "react";
import { useState, useEffect, useRef } from "react";

function Show({ instanceRef }) {
  const [count, setCount] = useState(0);
  const [currentPart, setCurrentPart] = useState("");
  // console.log(instanceRef.current);
  // const handlerLink = useCallback(
  //   (targetSection) => {
  //     setCurrentPart(instanceRef.current.gotoSection(targetSection));
  //   },
  //   [instanceRef]
  // );

  const slpitMarkAndText = (text) => {
    const markpattern = /(?<!!)\[\[(.*?)\]\]/g;
    let match;
    let lastIndex = 0;
    let result = [];
    while ((match = markpattern.exec(text))) {
      // 获取匹配项之前的普通文本,match.index为匹配项开始的位置。
      if (lastIndex < match.index) {
        result.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }
      // 添加匹配的链接文本
      let link_param_arr = match[1].split("|");
      let main_param = link_param_arr[0];
      let alias_param = link_param_arr[1] || "";
      result.push({ type: "link", main: main_param, alias: alias_param });
      // 更新 lastIndex 以继续查找
      lastIndex = match.index + match[0].length;
    } // 添加最后一个匹配项之后的普通文本（如果有的话）
    if (lastIndex < text.length) {
      result.push({ type: "text", content: text.slice(lastIndex) });
    }

    return result;
  };

  function Links_wiki_syntax({ strContent }) {
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
        <Links_wiki_syntax strContent={currentPart} />
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

export { Show };
