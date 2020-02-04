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
        case "ADD_ALL_USERS":
            return {
                ...state,
                users: action.payload
            };
        default:
            return state
    }
}