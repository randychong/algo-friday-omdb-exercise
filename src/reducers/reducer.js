import { CHANGE_USERNAME, ADD_USER, LOAD_TRUE, LOAD_STATE } from "../action-types/actions-types"

const initialState = {
    username: "Randy",
    newUser: "Joe",
    loadingState: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {...state, username: state.newUser}
        case ADD_USER:
            return { ...state, newUser: state.newUser }
        case LOAD_TRUE:
            return { loadingState: true }
        case LOAD_STATE:
            return { ...state }
        default:
            return state
    }
}
