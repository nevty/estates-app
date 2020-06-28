import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleWare from "redux-thunk";
import estatesReducer from "./estates-reducer";
import userReducer from "./users-reducer";
import adminReducer from "./admin-reducer";

let rootReducer = combineReducers({
    estatesEntity: estatesReducer,
    userState: userReducer,
    adminState: adminReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer,applyMiddleware(ThunkMiddleWare));

export default store