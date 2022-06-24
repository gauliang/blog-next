const { watch } = require('node:fs');
const { WebSocketServer } = require('ws')

function main() {
    const wss = new WebSocketServer({ port: 80 })
    const caches = {
        filename:'',
        times:1
    }
    wss.on('connection', (ws, req) => {
        console.log(`[clients] ${wss.clients.size}`);
        watch(process.cwd() + '/_contents', { recursive: true }, (eventType, filename) => {
            const path = filename.replace(/^posts/, '/blogs').replace(/\.md/, '/')
            if(caches.filename===filename){
                caches.times++
                process.stdout.write(`\u001B[0G\u001B[2K[changed x ${caches.times}] ${filename} >> [route] ${path}`)
            }else{
                process.stdout.write(`\n[changed x 1] ${filename} >> [route] ${path}`)
                caches.filename = filename
                caches.times = 1
            }
            ws.send(JSON.stringify({ event: 'markdown-changed', path }))
        });
    })
}

main()