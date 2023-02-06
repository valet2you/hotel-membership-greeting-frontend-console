import axios from 'axios';

export const fetchAllGuests = () => {
    return axios.get('https://api.github.com/users/');
};
