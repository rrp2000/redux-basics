// const redux = require("redux")
// // const createStore = redux.createStore
// const {configureStore} = require("@reduxjs/toolkit")
// const {createAction} = require("@reduxjs/toolkit")

// let lastId = 0
// //action types
// // const BUG_ADDED = "BUG_ADDED"
// // const BUG_REMOVED = "BUG_REMOVED"
// // const BUG_RESOLVED = "BUG_RESOLVED"

// //action creators
// // const bugAdded = (description)=>{
// //     return{
// //         type:BUG_ADDED,
// //         payload:{
// //             description
// //         }
// //     }
// // }
// const bugAdded = createAction("bugAdded")
// console.log(bugAdded({}))

// // const bugRemoved = (id)=>{
// //     return{
// //         type:BUG_REMOVED,
// //         payload:{
// //             id
// //         }
// //     }
// // }

// // const bugResolved = id =>{
// //     return{
// //         type:BUG_RESOLVED,
// //         payload:{
// //             id
// //         }
// //     }
// // }
// //action reducers
// const reducer = (state = [], action)=>{
//     switch(action.type){
//         case bugAdded.type:{
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description:action.payload.description,
//                     resolved:false
//                 }
//             ]
//         }
//         case "bugRemoved":{
//             return state.filter(bug=>bug.id!=action.payload.id)
//         }
//         case "bugResolved":{
//             return state.map(bug=>bug.id === action.payload.id?{...bug,resolved:true}:bug)
//         }
//         default: return state
//     }
// }

// //create store
// // const store = createStore(reducer)
// const store = configureStore({
//     reducer
// })
// // console.log(store.getState());
// // const unsubscribe = store.subscribe(()=>console.log(store.getState()))
// // store.dispatch(bugAdded("added"))
// // store.dispatch(bugAdded("added 2"))
// // store.dispatch(bugResolved(1))

// const {createAction, createReducer, configureStore} = require("@reduxjs/toolkit")

// let lastId = 0

// //action creator
// const bugAdded = createAction("bugAdded")
// const bugRemoved = createAction("bugRemoved")
// const bugResolved = createAction("bugResolved")

// //reducer
// const reducer = createReducer([],{
//     [bugAdded.type]: (state,action) =>{
//         state.push({
//             id:++lastId,
//             description:action.payload.description,
//             resolved:false
//         })
//     },
//     [bugRemoved.type]: (state,action) =>{
//         state.filter(bug=>bug.id!=action.payload.id)
//     },
//     [bugResolved.type]: (state,action) =>{
//         let index = state.findIndex(bug=>bug.id=== action.payload.id)
//         state[index].resolved = true
//     }
// })

// //store
// const store = configureStore({reducer})

// store.subscribe(()=>console.log(store.getState()))
// store.dispatch(bugAdded({description:"hello"}))
// store.dispatch(bugAdded({description:"hello"}))
// store.dispatch(bugResolved({id:1}))

// //----------------------------slice----------------------------------------

// const {createSlice,configureStore} = require("@reduxjs/toolkit")
// let lastId = 0
// const slice = createSlice({
//     name:"bugs",
//     initialState:[],
//     reducers:{
//         bugAdded: (state, action) =>{
//             state.push({
//                 id : ++lastId,
//                 description:action.payload.description,
//                 resolved:false
//             })
//         },
//         bugResolved: (state,action) =>{
//             let index = state.findIndex(bug => bug.id === action.payload.id)
//             state[index].resolved = true
//         }
//     }
// })
// const store = configureStore({reducer:slice.reducer})
// store.subscribe(()=>console.log(store.getState()))

// store.dispatch(slice.actions.bugAdded({description:"hello"}))
// store.dispatch(slice.actions.bugAdded({description:"hello"}))
// store.dispatch(slice.actions.bugAdded({description:"hello"}))

const {
  createSlice,
  configureStore,
} = require("@reduxjs/toolkit");

const {  combineReducers } = require("redux")

let lastId = 0;


let projectSlice = createSlice({
  name: "Project",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      let index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
  },
});

let rootReducer = combineReducers({
    bugs:bugSlice.reducer,
    projects:projectSlice.reducer
})

// console.log(rootReducer)

const store = configureStore({ reducer: rootReducer });
store.subscribe(() => console.log(store.getState()));
store.dispatch(bugSlice.actions.bugAdded({description:"hello"}))

