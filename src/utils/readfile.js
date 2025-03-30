// import { log } from 'node:console'

import { mystr } from "../nature.js"

// import fs from 'fs'

class GameFile {
    constructor(gameContent) {
        this.section = this.loadGameFile(gameContent)
        this.keys = this.getkeys(this.section)
        this.currentSection = -1
    }
    loadGameFile(gameContent) {
        // let gameFile = 'src/自然.txt'
        let pattern = /===(.*?)===/g

        // 带换行的字符串
        // let gameContent = fs.readFileSync(gameFile, { encoding: "utf-8" })
        let lines = gameContent.split(/[\r\n]/g)
        lines = lines.filter((value) => value !== "")
        let title = ""
        let section = new Map()
        for (const line of lines) {
            if (line.startsWith('===')) {
                title = line.split(pattern)[1]
                section.set(title, [])
            } else if (line.length !== 0) {
                section.get(title).push(line.trim())
                // section[title].push(line.trim())
            }
        }
        // log()
        return section
    }
    getkeys(section) {
        let keys = []
        for (const item of section.keys()) {
            keys.push(item)
        }
        return keys
    }
    nextSection() {
        if (this.currentSection <= this.keys.length - 1) {
            this.currentSection++
            let key = this.keys[this.currentSection]
            return this.section.get(key)
        }
    }
    previewSection() {
        if (this.currentSection > 0) {
            this.currentSection--
            let key = this.keys[this.currentSection]
            return this.section.get(key)
        }
    }
    gotoSection(key) {
        this.currentSection = this.keys.indexOf(key)
        let mkey = this.keys[this.currentSection]
        console.log(mkey);

        return this.section.get(mkey)
    }
}

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

export { GameFile, slpitMarkAndText }
// let a = new GameFile(mystr)
// let b = a.nextSection()
// let c = a.nextSection()
// let p = a.previewSection()
// console.log();

