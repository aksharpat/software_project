import data from './data/creds.json';

export const getUsers = () => data;

export const addUser = (newUser) => {

    data.push(newUser);
    console.log(data);
    return data;
};