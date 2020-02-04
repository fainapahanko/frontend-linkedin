import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "../reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    currentUser: undefined,
    users: [],
}

export default function configureStore() {
    return createStore(
        rootReducer, 
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
}