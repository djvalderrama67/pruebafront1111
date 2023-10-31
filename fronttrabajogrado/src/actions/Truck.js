import axios from '../services/api';
import { GET_TRUCKS, GET_TRUCK } from './types';

export const getTrucks = () => async dispatch => {
    try {
        const res = await axios.get('/api/vehiculo/');
        dispatch({
            type: GET_TRUCKS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const getTruck = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/vehiculo/${id}`);
        dispatch({
            type: GET_TRUCK,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}