export default function smart(n){
    if(n>=100000)
        return `${parseInt(n*100/1000000)/100}m`
    else if(n>=100)
        return `${parseInt(n*10/1000)/10}k`
    return n
}