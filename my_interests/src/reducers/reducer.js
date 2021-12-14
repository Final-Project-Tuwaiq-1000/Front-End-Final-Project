const inistialState ={
    userLogged:[],
    isLogged:false
}

const UserReducer = (state = inistialState,{type, payload})=>{
    switch (type){
        case "LOG_IN":
            return{
                userLogged:[payload],
                isLogged:true
            }
        case "LOG_OUT":
            return{
                userLogged:[],
                isLogged:false
            }
        default:
            return state;
    }
}

export default UserReducer