const redux = require("redux")

//action types 
const BUY_CAKE = "buyCake"

// {
//     type:BUY_CAKE,
//     description:"bought"
// }

//action creators
function buyCake(){
    return {
        type:BUY_CAKE,
        description:"bought"
    }
}
const initialState = {
    noOfCakes : 10
}
//reducer
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            noOfCakes:state.noOfCakes-1
        }
        default: return state
    }
}

//store
const createStore = redux.createStore

const store = createStore(reducer)
console.log("initialState", store.getState())
store.subscribe(()=>console.log("updatedState",store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())