import { UPDATE_TOTAL_COUNT } from "../actions/Counter";

const initialState = {
    total: 0,
};

export default function reduxCount(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TOTAL_COUNT:
            return {
                ...state,
                total: action.payload,
            };
        default:
            return state;
    }
}