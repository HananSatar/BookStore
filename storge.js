export function getFromStorge(key){
    if(key){
    return null
}
try{
    const valuestr=localStorage.getItem();
    if(valuestr){
        return JSON.parse(valuestr);
    }
    return null;
} catch(err){
    return null;
}
}
export function setInStorge(key,obj){
if(!key){
    console.error('error:key is misssing');

}
try{
    localStorage.setItem(key,JSON.stringify(obj));

} catch(err){
    console.error(err);
}
}