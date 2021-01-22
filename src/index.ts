import _ from 'lodash'
// import {analyze} from 'web-audio-beat-detector'
// import Music from 'music-tempo'

const fileElement = document.getElementById('file') as HTMLInputElement
const context = new AudioContext()
let source;


const calcTempo = (buffer:AudioBuffer) => {
    console.log(buffer)


    // analyze(buffer).then((tempo) => {
    //     console.log(tempo)
    // }).catch(err => {
    //     console.error(err)
    // })

    const channel1 = buffer.getChannelData(0)
    const channel2 = buffer.getChannelData(1)

    // const mt = new Music(channel1)

    // console.log(mt)
    
    // const offlineCtx = new OfflineAudioContext(2, buffer.duration * buffer.sampleRate, buffer.sampleRate)
    // source = offlineCtx.createBufferSource();
    // source.buffer = buffer;
    // source.connect(offlineCtx.destination)
    // source.start()

    const width = channel1.length  / 800

    draw('channel1', channel1, width)
    draw('channel2', samping(channel1, 100), width)
    // draw('channel2', channel2)
}

function samping(buffer: Float32Array, split: number) {
    let b = new Float32Array(buffer.length / split)
    let i = 0
    for (i=0; i < b.length; i++) {
        b[i] = buffer[split * i]
    }    
    return b;
}

document.getElementById('submit').addEventListener('click', () => {
    const file = fileElement.files[0]
    let reader = new FileReader()
    reader.onload = (fileEvent) => {
        context.decodeAudioData(fileEvent.target.result as ArrayBuffer, calcTempo);
    }    
    reader.readAsArrayBuffer(file);
}, false)

document.getElementById('play').addEventListener('click', () => {
    context.p
}, false)

function draw(canvasId: string, buffer: Float32Array, width: number){
    console.log(buffer)
    const WIDTH = width;
    const HEIGHT = 300;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const canvasCtx = canvas.getContext('2d')
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(100,100,100)'
    canvasCtx.beginPath()
    
    const sliceWidth = (WIDTH - 20) / buffer.length;
    let x = 10
    buffer.forEach((b, index) => {
        var scale = b * 120
        var y = 150 - scale
        if (index === 0) {
            canvasCtx.moveTo(x, y)
        } else {
            canvasCtx.lineTo(x,y)
        }

        x += sliceWidth
    })
    
    canvasCtx.stroke()

}