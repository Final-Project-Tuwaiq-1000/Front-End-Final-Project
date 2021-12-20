const userLogged = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"))

const inistialState ={
    userLogged: userLogged ? userLogged:{},
    token: token ? token:undefined,
    isLogged:userLogged? true:false
}

const UserReducer = (state = inistialState,{type, payload})=>{
    switch (type){
        case "LOG_IN":
            localStorage.setItem("user",JSON.stringify(payload));
            return{
                userLogged:payload,
                token:state.token,
                isLogged:true
            };
        case "ADD_TOKEN":
            localStorage.setItem("token",JSON.stringify(payload))
            return{
                userLogged:state.userLogged,
                token:payload,
                isLogged:true
            }
        case "LOG_OUT":
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return{
                userLogged:{},
                isLogged:false
            }
        default:
            return state;
    }
}

export default UserReducer