export default function (state = {}, action) {
    switch(action.type) {
        case "ADD_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "REMOVE_CURRENT_USER":
            return {
                ...state,
                currentUser: undefined
            };
        case "ADD_TOKEN":
            return {
                ...state,
                token: action.payload
            };
        case "REMOVE_TOKEN":
            return {
                ...state,
                token: undefined
            };
        default:
            return state
    }
}