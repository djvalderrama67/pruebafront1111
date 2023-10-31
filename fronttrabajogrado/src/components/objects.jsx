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

    // Mantener el estado del volumen total global
    const [totalVolume, setTotalVolume] = useState(0);

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

        setTotalVolumen(calcularVolumenTotal());
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

            setTotalVolumen(calcularVolumenTotal());
        }
    };

    const calcularVolumenTotal = () => {
        let volumenTotal = 0;

        Object.keys(counters).forEach((index) => {
            if (counters[index] > 0) {
                const object = filteredObjects[index];
                if (object && object.volumen) {
                    volumenTotal += object.volumen * counters[index];
                }
            }
        });

        return volumenTotal;
    };

    const calcularVolumenTotalGlobal = () => {
        let volumenTotalGlobal = 0;

        Object.keys(categoryCounters).forEach((category) => {
            const counters = categoryCounters[category];
            const categoryObjects = objects.filter(object => object.categoria.nombre === category);

            Object.keys(counters).forEach((index) => {
                if (counters[index] > 0) {
                    const object = categoryObjects[index];
                    if (object && object.volumen) {
                        volumenTotalGlobal += object.volumen * counters[index];
                    }
                }
            });
        });

        return volumenTotalGlobal;
    };

    useEffect(() => {
        if (selectedCategoryNombre && categoryCounters[selectedCategoryNombre]) {
            setCounters(categoryCounters[selectedCategoryNombre]);
        } else {
            setCounters({});
        }

        const newTotalVolume = calcularVolumenTotalGlobal();
        setTotalVolume(newTotalVolume);
    }, [selectedCategoryNombre, categoryCounters]);

    useEffect(() => {
        setTotalVolumen(totalVolume);
    }, [totalVolume]);

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
                        <p>{object.volumen} m3 Total volumen</p>
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
