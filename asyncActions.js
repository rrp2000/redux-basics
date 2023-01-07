const redux = require("redux")
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

//action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

//action creators

const fetchUserRequest= () =>{
    return {
        type:FETCH_USERS_REQUEST,
    }
}
const fetchUserSuccess= (users) =>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUserFailure= (err) =>{
    return {
        type:FETCH_USERS_FAILURE,
        payload: err
    }
}

const fetchUser=()=>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res=>{
                // console.log(res.data)
                dispatch(fetchUserSuccess(res.data))
            })
            .catch(err=>{
                // console.log(err)
                dispatch(fetchUserFailure(err.message))
            })
    }
}

//initial state

const initialState = {
    loading:false,
    users:[],
    error:""
}
//reducer

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading:true
        }
        case FETCH_USERS_SUCCESS: return {
            users:action.payload,
            loading:false,
            error:""
        }
        case FETCH_USERS_FAILURE: return {
            loading:false,
            users:[],
            error:action.payload
        }
        default: return state
    }
}


//store

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

console.log("inital state", store.getState())

store.subscribe(()=>console.log("updated state",store.getState()))
store.dispatch(fetchUser())