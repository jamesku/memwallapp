const defaultState = {
    menu: "none"

};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ACTIVEMENU':
            return Object.assign({}, state, {
                menu: action.menu,
              });
        default:
            return state;
    }
}
