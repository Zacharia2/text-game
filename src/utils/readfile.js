// import { log } from 'node:console'
import fs from 'fs'


export function loadGameFile(gameFile) {
    // let gameFile = 'src/自然.txt'
    let pattern = /===(.*?)===/g

    // 带换行的字符串
    let gameContent = fs.readFileSync(gameFile, { encoding: "utf-8" })
    let line = gameContent.split(/\n/g)
    let paragraphList = line.filter(line => line.length !== 0 && line.search(pattern))
    paragraphList = paragraphList.map((value) => value.trim())
    // log()
    return paragraphList
}
