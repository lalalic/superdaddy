const requires={
	
}

export function compile(code,name){
    code=`(function(){${code}})();`
    code=`${code}\r\n//# sourceURL=knowledges/${name}/index.js`
    const compiled=new Function("module,exports,require",code)
    const module={exports:{}}
    const returned=compiled(module, module.exports, a=>requires[a])
    if(returned){//webpack module
        if(returned.default)
            return returned.default
        return returned
    }
    return module.exports
}

export function asModule(urlOrCode){
    try{
        if(urlOrCode.length<256 || new URL(urlOrCode)){
            return fetch(urlOrCode)
                .then(res=>res.arrayBuffer())
                .then(arrayBuffer=>new Buffer(arrayBuffer,"utf8").toString())
                .then(compile)
        }
    }catch(e){
        return Promise.resolve(compile(urlOrCode))
    }
}

export function test(code){
    try{
        compile(code)
    }catch(e){
        return e.message
    }
}