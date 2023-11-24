import data from './data/creds.json';
import numbers from './data/report.json'

export const getUsers = () => data;

export const getNumbers = () => numbers;


export const addUser = (newUser) => {

    data.push(newUser);
    console.log(data);
    return data;
};