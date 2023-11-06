import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllObjects } from '../actions/Objects';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const homeImages = require.context('../components/icons', true);

const Objects = ({ selectedCategoryNombre, totalArticles, setTotalArticles, totalVolumen, setTotalVolumen }) => {
    const dispatch = useDispatch();
    const objects = useSelector((state) => state.reduxObjects.objects);

    useEffect(() => {
        if (selectedCategoryNombre) {
            dispatch(fetchAllObjects(selectedCategoryNombre));
        }
    }, [selectedCategoryNombre, dispatch]);

    const filteredObjects = selectedCategoryNombre
        ? objects.filter(object => object.categoria.nombre === selectedCategoryNombre)
        : objects;

    // Manejar el estado del contador para cada objeto
    const [counters, setCounters] = useState({});

    // Mantener contadores por categoría
    const [categoryCounters, setCategoryCounters] = useState({});

    const handleIncrement = (index) => {
        setCounters(prevCounters => ({
            ...prevCounters,
            [index]: (prevCounters[index] || 0) + 1
        }));

        setCategoryCounters(prevCategoryCounters => ({
            ...prevCategoryCounters,
            [selectedCategoryNombre]: {
                ...prevCategoryCounters[selectedCategoryNombre],
                [index]: (prevCategoryCounters[selectedCategoryNombre]?.[index] || 0) + 1
            }
        }));

        setTotalArticles(prevTotal => prevTotal + 1);

        setTotalVolumen(prevTotalVolumen => {
            const object = filteredObjects[index];
            if (object && object.volumen) {
                const newTotalVolumen = prevTotalVolumen + object.volumen;
                return parseFloat(newTotalVolumen.toFixed(2));
            }
            return prevTotalVolumen;
        });
    };

    const handleDecrement = (index) => {
        if (counters[index] > 0) {
            setCounters(prevCounters => ({
                ...prevCounters,
                [index]: prevCounters[index] - 1
            }));

            setCategoryCounters(prevCategoryCounters => ({
                ...prevCategoryCounters,
                [selectedCategoryNombre]: {
                    ...prevCategoryCounters[selectedCategoryNombre],
                    [index]: (prevCategoryCounters[selectedCategoryNombre]?.[index] || 0) - 1
                }
            }));

            setTotalArticles(prevTotal => prevTotal - 1);

            setTotalVolumen(prevTotalVolumen => {
                const object = filteredObjects[index];
                if (object && object.volumen) {
                    const newTotalVolumen = prevTotalVolumen - object.volumen;
                    return parseFloat(newTotalVolumen.toFixed(2));
                }
                return prevTotalVolumen;
            });
        }
    };

    useEffect(() => {
        if (selectedCategoryNombre && categoryCounters[selectedCategoryNombre]) {
            setCounters(categoryCounters[selectedCategoryNombre]);
        } else {
            setCounters({});
        }
    }, [selectedCategoryNombre, categoryCounters]);

    return (
        <div className='container-objects'>
            {filteredObjects.map((object, index) => (
                <div key={index} className='object-item'>
                    <div className='container-objects-image'>
                        <img src={homeImages(`./${selectedCategoryNombre}/${object.nombre}.svg`)} alt={object.nombre} />
                    </div>
                    <div className='container-objects-title'>
                        <h2>{object.nombre}</h2>
                        <p>({object.largo} X {object.ancho} X {object.alto})</p>
                    </div>
                    <div className='container-objects-buttons'>
                        <button onClick={() => handleDecrement(index)}>
                            <RemoveIcon style={{ fontSize: '15px' }} />
                        </button>
                        {counters[index] > 0 && <div className='container-objects-count'><span>{counters[index]}</span></div>}
                        <button onClick={() => handleIncrement(index)}>
                            <AddIcon style={{ fontSize: '15px' }} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Objects;
