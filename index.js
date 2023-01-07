const redux = require("redux")
const reduxLogger = require("redux-logger")
const applyMiddleware = redux.applyMiddleware
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()
//action types

const BUY_CAKE = "buyCake"
const BUY_ICECREAM = "buyIceCream"

//action creators
function buyCake(){
    return {
        type:BUY_CAKE,
        description:"buy a cake"
    }
}

function buyIceCream(){
    return {
        type:BUY_ICECREAM,
        description:"buy an icecream"
    }
}

const cakeInitialState = {
    noOfCakes:10
}

const iceCreamInitialState = {
    noOfIceCream:20
}

const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            noOfCakes:state.noOfCakes-1
        }
        default: return state
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action) =>  {
    switch(action.type){
        case BUY_ICECREAM:return{
            ...state,
            noOfIceCream:state.noOfIceCream-1
        }
        default: return state
    }
}

//store
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const createStore = redux.createStore
const store = createStore(rootReducer,applyMiddleware(logger))

console.log("initial state", store.getState())
const unsubscribe = store.subscribe(()=> console.log("updated state",store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())


