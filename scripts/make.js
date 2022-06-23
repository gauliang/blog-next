const path = require("path")
const write = require("write")
const readline = require("readline")

const TEMPLATE = `---
title: "__TITLE__"
date: __TIME__
draft: true
description: ""
type: "posts"    # posts | series
tags: []
series: []
author: "Gl"
cover: false     # image name
---`

const TIME = new Date()
const TIME_STR = TIME.toISOString()

async function main() {
    const SERIES = ['react']
    const TYPE_PATH = { series: '_series', post: '_posts' }
    const TYPE_OPTIONS = ['post', 'series']
    const typeIndex = await readSelectInput({ title: '请选择文章类型：', options: TYPE_OPTIONS })

    let typePath = TYPE_PATH[TYPE_OPTIONS[typeIndex]]

    if (TYPE_OPTIONS[typeIndex] === 'series') {
        const seriesIndex = await readSelectInput({ title: '请选所属系列：', options: SERIES })
        typePath = typePath + '/' + SERIES[seriesIndex]
    } else {
        typePath += '/' + TIME.getFullYear().toString()
    }

    const title = await readTextInput({
        title: '请输入文件名：', validite: input => {
            if (input.trim().length === 0) {
                return '文件名不能为空'
            }
        }
    })

    const fileName = path.resolve(process.cwd(), typePath, title.replace(/\s/gm, '-') + '.md')
    const content = TEMPLATE.replace('__TIME__', TIME_STR).replace('__TITLE__', title)
    write(fileName, content)
}

main()

function readTextInput({ title, validite }) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${title}> `
    })

    return new Promise((resolve, reject) => {
        rl.on('line', line => {
            rl.close()
            const validateRes = validite(line)
            if (validateRes) {
                reject(validateRes)
            } else {
                resolve(line)
            }
        })
        rl.prompt()
    }).catch(reason => {
        console.error('Error', reason);
        process.exit()
    })
}

function readSelectInput(config) {
    let value = 0
    readline.emitKeypressEvents(process.stdin)
    selectRender(config, value)
    return new Promise((resolve, reject) => {

        process.stdin.on('keypress', (str, key) => {
            if (key.name === 'up') {
                selectRender(config, value - 1 <= 0 ? 0 : --value)
            } else if (key.name === 'down') {
                selectRender(config, value + 1 >= config.options.length ? value : ++value)
            } else if (key.name === 'return') {
                clearOptions(config)
                process.stdin.setRawMode(false)
                process.stdin.pause()
                process.stdin.removeAllListeners('keypress')
                resolve(value)
            }
        })
        process.stdin.setRawMode(true)
        process.stdin.resume()
    })
}

function clearOptions(config) {
    process.stdout.write('\u001B[?25h')
    const clears = []
    for (let i = 0; i < config.options.length + 1; i++) {
        clears.push('\u001B[A')
    }
    process.stdout.write(clears.join('') + '\u001B[0J')
}

function selectRender(config, i = 0) {
    clearOptions(config)
    options = config.options.map((item, index) => {
        let text = `[ ] ${item}`
        if (index === i) {
            text = `\u001b[32;1m[x] ${item}\u001b[0m`
        }
        return text
    })
    options.unshift(config.title)
    process.stdout.write(options.join('\n') + '\n')
}