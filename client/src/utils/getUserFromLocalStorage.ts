//get user from local storage
const user=localStorage.getItem("user")
export const getUser=()=>{
    if(user){
        try {
            return JSON.parse(user);
        } catch (error) {
            console.log("Error parsing JSON",error)
            return null
        }
    }
    else{
        console.log("User not found in storage")
        return null
    }
}