//funny messages
let cm1 = [
    `Wow, I'm Incredible gay!`,
    `My homosexuality is immeasurable!`,
    `Any homosexuals in chat?`,
    `I'm sapien full homo.`,
    `Can somone rub katchup on my thigh?`,
    'Pope would be proud!',
    'I am also very gay.',
    'Can I feel that lump on your testicals?',
    `My homosexuality overflows from the rim of my soul!`,
    `I want to feel all the lumps.`,
    `Assholes are nice too.`,
    `Who's going to cary the child?`,
    `Relatable!`,
    "My cock is throbbing like the starving blacks in africa",
    "condoms help protect against corona virus"
]
let cm2 = [
    'Cock and Ball Torture',
    'Gawk Gawk',
    'Lock legs and swap gravy',
    'Gawk Gawk On my COck',
    'Shlong Magmus',
    'Cock Rings',
    'Cock Ring',
    'Anal Bullets',
    'Sink Gripper',
    'Vile ass fumes',
    'Dutch oven',
    'Cum rag Crawling across the floor',
    'Steping away from urinal while peeing and still make it in',
    'Sex',
    'Holloweiner Blumpkin'
]
//funny messages
const amount = 1e3,
    gameId = ''.split('/').pop(), //if nothing just uses defualt matchmaker
    arab = false; // arabic mode (DEFUALT IS GAY MODE WHEN SET TO FALSE)

const {
    TextEncoder,
    TextDecoder
} = require("text-decoding")
let TD = new TextDecoder(); //idk may use for decoding messages later
let TE = new TextEncoder();

const fs = require('fs');
const rand = (min, max) => Math.random() * (max + 1 - min) + min | 0
const rArray = (arr) => arr[Math.random() * arr.length | 0];
const names = JSON.parse(fs.readFileSync('names.txt')) //file can be edited for customized names

require('colors')
const WebSocket = require('ws'),
    murl = 'wss://game.witz.io/ws?';


//-----------datamap-----------
const singiture = [12, 0, 0, 0, 8, 0, 10, 0, 9, 0, 4, 0, 8, 0] // universaly works?? //(edit) ig it does lolol
var datamap = new Map()

function updateDataMap(sig) {
    datamap.set('sig', sig) //the server verificates data with the first 14 bytes on some messages
    datamap.set('vote', [...sig, 0, 0, 12, 0, 0, 0, 0, 5, 6, 0, 8, 0, 7, 0, 6, 0, 0, 0, 0, 0, 0, 0])
    datamap.set('talk', [...sig, 0, 0, 12, 0, 0, 0, 0, 6, 6, 0, 8, 0, 4, 0, 6, 0, 0, 0, 4, 0, 0, 0, 1e3, 0, 0, 0]) //the 1e3 defined message length
    datamap.set('ping', [12, 0, 0, 0, 8, 0, 12, 0, 11, 0, 4, 0, 8, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 1, 4, 0, 4, 0, 4, 0, 0, 0]) // use async delcore oder so I can do shit like this +1 maps xd😲 😲
    datamap.set('submit2', [4, 0, 0, 0, 244, 255, 255, 255, 16, 0, 0, 0, 0, 0, 0, 4, 8, 0, 12, 0, 11, 0, 4, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 99, 0, 0, 0])
    datamap.set('submit1', [12, 0, 0, 0, 8, 0, 12, 0, 11, 0, 4, 0, 8, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 4, 8, 0, 8, 0, 0, 0, 4, 0, 8, 0, 0, 0, 4, 0, 0, 0, 99, 0, 0, 0])
}
updateDataMap(singiture)
//-----------datamap-----------

//embedding it this way so I can have multiple players ;3
function player(id = 0, name = "BOT", clr = 'purple') {
    let gfe = false;
    let q_obj = {
            name: arab ? '﷽'.repeat(5) : name, //+ `[${id}]`,
            characterId: arab ? 'yellow' : clr
        },
        query = Object.entries(q_obj);
    if (!isFinite(gameId)) query.unshift(['gameId', gameId]);


    let ws = new WebSocket(murl + query.map(e => e.join `=`).join `&`)
    ws.s = ws.send;
    ws.send = arr => ws.s(new Uint8Array(arr));
    ws.on('open', () => {
        console.log(`[BOT:${id}]`, 'Joined'.green)

        if (arab) {
            let msg = '﷽'.repeat(1e3)
            setInterval(() => {
                let cmsg = TE.encode(msg)
                ws.send([...datamap.get('talk'), ...cmsg, 0, 0, 0])

                ws.send([...datamap.get('submit1'), ...cmsg, 0, 0, 0])
                ws.send([...datamap.get('submit2'), ...cmsg, 0, 0, 0])

                ws.send(datamap.get('vote'))
            }, 5e3);
        } else {
            let wait = rand(10e3, 40e3)
            setInterval(() => {
                let msg = rArray(cm1)
                let cmsg = TE.encode(msg)
                ws.send([...datamap.get('talk'), ...cmsg, 0, 0, 0])
            }, wait)


            setInterval(() => {
                let _msg = rArray(cm2)
                let smsg = TE.encode(_msg)

                ws.send([...datamap.get('submit1'), ...smsg, 0, 0, 0])
                ws.send([...datamap.get('submit2'), ...smsg, 0, 0, 0])

                ws.send(datamap.get('vote'))
            }, 5e3);
        }
    })
    ws.on('error', (e) => {
        let err = e + []
        if (err.includes(503)) {
            gfe = true;
        }
        if (err.includes(403)) {
            console.log('-'.repeat(9), 'IP Banned'.yellow, '-'.repeat(9))
        }
    })
    ws.on('close', (e) => {
        gfe ?
            console.log(`[BOT:${id}]`, 'Servers Full'.red) :
            e == 1005 ?
            console.log(`[BOT:${id}]`, 'Game Full'.red) :
            console.log(`[BOT:${id}]`, 'Left'.red);
        player(id, name, clr)
    })
    ws.on('message', (e) => {
        let ie = [...e]
        if (ie.length == 32) ws.send(datamap.get('ping'));
    })
}
let clrs = ["purple", "yellow", "red", "green", "blue"]
for (let i = 0; i < amount; i++) {
    if (arab) {
        player(i)
    } else {
        player(i, rArray(names), rArray(clrs))
    }
}