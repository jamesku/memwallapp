const defaultState = {
    isLoggedIn: "no",
    email: '',
    password: '',
    token: ''

};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: "yes",
                email: action.email,
                password: action.password,
                token: action.token
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
