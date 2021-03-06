export default class Clock{
    constructor(){
        this.handler=null
        if(typeof(window.AudioContext)=="undefined"){
                window.AudioContext=window.webkitAudioContext
        }
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
            return navigator.mediaDevices.getUserMedia({audio:true})
                .then(stream=>this.stream=stream)
        }
        return  Promise.resolve(this.stream)
    }

    start(onStart){
        return this.getMediaStream()
            .then(stream=>{
                debugger
                const source=this.context.createMediaStreamSource(stream)

                const analyser = this.context.createAnalyser();
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                analyser.smoothingTimeConstant = 0.85;

                analyser.fftSize = 2048;
                const buffer = new Uint8Array(analyser.frequencyBinCount)

                const draw=this.draw=()=>{
                    this.animate=requestAnimationFrame(draw)
                    if(this.context.state=="running"){
                        analyser.getByteFrequencyData(buffer);
                        this.handler({time:Date.now(), buffer})
                    }
                }

                source.connect(analyser)
                onStart && onStart()

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
        if(this.animate){
            cancelAnimationFrame(this.animate)
            delete this.animate
        }
        this.context.suspend()
    }

    resume(){
        this.draw()
        this.context.resume()
    }
}