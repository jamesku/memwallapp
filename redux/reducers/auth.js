const defaultState = {
    isLoggedIn: "no",
    email: '',
    password: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: "yes",
                email: action.email,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: "no",
                username: '',
                password: ''
            });
        case 'SIGNUP':
            return Object.assign({}, state, {
                isLoggedIn: "signup",
                username: '',
                password: ''
            });
        default:
            return state;
    }
}
