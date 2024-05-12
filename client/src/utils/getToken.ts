
//get token from storage if available
export const getToken=()=>{
    const token= localStorage.getItem("token")||""
    if(token){
        return JSON.parse(token)
    }else{
        return token
    }
}