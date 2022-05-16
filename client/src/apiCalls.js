import axios from "axios";

const loginCall = async (uesrCredential,dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post('/auth/login',uesrCredential);
        dispatch({type: "LOGIN_SUCCESS",payload: res.data});
    }catch(error){
        dispatch({type: "LOGIN_FAILURE", payload: error}); 
    }
}

export default loginCall;