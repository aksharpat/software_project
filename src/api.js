import data from './data/creds.json';
import numbers from './data/report.json'
import tickets from './data/tickets.json'
import history from './data/history.json'

export const getUsers = () => data;

export const getNumbers = () => numbers;

export const getTickets = () => tickets;

export const getHistory = () => history;


export const addUser = (newUser) => {

    data.push(newUser);
    console.log(data);
    return data;
};