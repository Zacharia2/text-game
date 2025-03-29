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
        this.currentSection++
        let key = this.keys[this.currentSection]
        return this.section.get(key)
    }
    previewSection() {
        this.currentSection--
        let key = this.keys[this.currentSection]
        return this.section.get(key)
    }
}

export { GameFile }
// let a = new GameFile(mystr)
// let b = a.nextSection()
// let c = a.nextSection()
// let p = a.previewSection()
// console.log();
