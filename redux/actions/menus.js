import axios from 'axios';
import Alert from 'react-native';

export const activeMenu = (menu) => {
    return {
        type: 'ACTIVEMENU',
        menu: menu,
    };
};
