export default class Clock{
    constructor(){
        this.handler=null
    }

    get context(){
        if(!this._context){
            this._context=new AudioContext()
        }
        return this._context
    }

    get sampleRate(){
        return this.context.sampleRate
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

    start(onStart){
        return this.getMediaStream()
            .then(stream=>{
                const source=this.context.createMediaStreamSource(stream)

                const analyser = this.context.createAnalyser();
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                analyser.smoothingTimeConstant = 0.85;

                analyser.fftSize = 2048;
                const buffer = new Uint8Array(analyser.frequencyBinCount)

                let draw=()=>{
                    this.animate=requestAnimationFrame(draw)
                    analyser.getByteFrequencyData(buffer);
                    this.handler({time:Date.now(), buffer})
                }

                source.connect(analyser)
                if(onStart){
                    onStart()
                }
                draw()
            })
    }

    stop(){
        if(this.animate){
            cancelAnimationFrame(this.animate)
            delete this.animate
        }

        this.context.close()
        delete this._context
    }

    pause(){
        this.context.suspend()
    }

    resume(){
        this.context.resume()
    }
}