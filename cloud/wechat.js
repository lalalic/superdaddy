//text,image,voice, video,location,event,device_test,device_event
Cloud.wechat.on((req,res,next)=>{
    console.log(req.message.MsgType)
    next()
}).on('event',(req, res)=>{
    
}).on('text', (req, res)=>{
    res.success(req.message.Content)
}).on('image', (req, res)=>{

}).on('voice', (req,res)=>{

}).on('video', (req,res)=>{

}).on('location', (req,res)=>{

}).on('link', (req,res)=>{

}).on('device_text', (req,res)=>{

}).on('device_event', (req,res)=>{

}).on('subcribe', (req, res)=>{

}).on('unsubscribe', (req, res)=>{

}).on('scan', (req, res)=>{

})
