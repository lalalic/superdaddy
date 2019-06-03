export default class Clock{
    constructor(){
        this.context=new AudioContext()
        this.handler=null
    }

    onData(handler){
        this.handler=handler
    }

    getMediaStream(){
        if(!this.stream){
            return new Promise((resolve,reject)=>{
                navigator.getUserMedia({audio:true},stream=>resolve(this.stream=stream), reject)
            })
        }
        return  Promise.resolve(this.stream)
    }

    start(){
        return this.getMediaStream()
            .then(stream=>{
                const source=this.context.createMediaStreamSource(stream)

                const analyser = this.context.createAnalyser();
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                analyser.smoothingTimeConstant = 0.85;

                analyser.fftSize = 2048;
                const bufferLengthAlt = analyser.frequencyBinCount
                const dataArrayAlt = new Uint8Array(bufferLengthAlt)

                
                
                let draw=()=>{
                    this.animate=requestAnimationFrame(draw)
                    analyser.getByteFrequencyData(dataArrayAlt);
                    this.handler({time:Date.now(), fr: Math.max(...dataArrayAlt), data:dataArrayAlt})
                }

                source.connect(analyser)
                draw()
            })
    }

    stop(){
        if(this.animate){
            cancelAnimationFrame(this.animate)
        }

        this.context.close()
    }

    pause(){
        this.context.suspend()
    }

    resume(){
        this.context.resume()
    }
}