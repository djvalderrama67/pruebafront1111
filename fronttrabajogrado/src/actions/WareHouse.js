import axios from '../services/api';
import { GET_WAREHOUSES, GET_WAREHOUSE } from './types';

export const getWarehouses = () => async dispatch => {
    try {
        const res = await axios.get('/api/bodega/');
        dispatch({
            type: GET_WAREHOUSES,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const getWarehouse = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/bodega/${id}`);
        dispatch({
            type: GET_WAREHOUSE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}