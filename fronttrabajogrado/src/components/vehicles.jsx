import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrucks } from '../actions/Truck';

const homeImages = require.context('../components/icons/Vehiculos', true);

const Vehicles = ({ totalVolumen }) => { // Asegúrate de desestructurar totalVolumen
    const dispatch = useDispatch();
    const trucks = useSelector((state) => state.reduxTrucks.trucks);

    useEffect(() => {
        dispatch(fetchTrucks());
    }, [dispatch]);

    return (
        <div className="container-vehiculos">
            {trucks && trucks.map((truck) => (
                (totalVolumen <= truck.volumen_carga_max) ? ( // Utiliza el operador ternario para la condición
                    <div key={truck.idVehiculo} className='container-vehiculos-item'>
                        <img src={homeImages(`./${truck.nombre}.svg`)} alt={truck.nombre} />
                    </div>
                ) : null // Si la condición no se cumple, no renderiza nada o puedes colocar otro componente/mensaje
            ))}
        </div>
    )
}

export default Vehicles;

