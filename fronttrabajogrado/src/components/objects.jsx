import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllObjects } from '../actions/Objects';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomButton from './recursivebutton'
import InputText from './inputs'

const homeImages = require.context('../components/icons', true);

const Objects = ({ selectedCategoryNombre, totalArticles, setTotalArticles, totalVolumen, setTotalVolumen, resetIndicator }) => {
    const dispatch = useDispatch();
    const objects = useSelector((state) => state.reduxObjects.objects);

    useEffect(() => {
        if (selectedCategoryNombre) {
            dispatch(fetchAllObjects(selectedCategoryNombre));
        }
    }, [selectedCategoryNombre, dispatch]);

    const filteredObjects = selectedCategoryNombre
        ? objects.filter(object => object.categoria === selectedCategoryNombre)
        : objects;

    const [counters, setCounters] = useState({});
    const [categoryCounters, setCategoryCounters] = useState({});
    const [specialObjectValues, setSpecialObjectValues] = useState({
        nombre: '',
        ancho: '',
        largo: '',
        alto: '',
    });
    const [speciallySavedObjects, setSpeciallySavedObjects] = useState([]);

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
        if (resetIndicator) {
            setCounters({});
            setCategoryCounters({});
        } else if (selectedCategoryNombre && categoryCounters[selectedCategoryNombre]) {
            setCounters(categoryCounters[selectedCategoryNombre]);
        } else {
            setCounters({});
        }
    }, [resetIndicator, selectedCategoryNombre, categoryCounters]);

    const handleInputChange = (field, value) => {
        setSpecialObjectValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSaveSpecialObject = () => {
        const { nombre, ancho, largo, alto } = specialObjectValues;
        if (!nombre || !ancho || !largo || !alto) {
            return;
        }

        const newSpecialObject = {
            categoria: 'Objeto especial',
            nombre,
            ancho,
            largo,
            alto,
        };

        setSpeciallySavedObjects((prevObjects) => [...prevObjects, newSpecialObject]);

        console.log('Guardar objeto especial:', newSpecialObject);

        setSpecialObjectValues({
            nombre: '',
            ancho: '',
            largo: '',
            alto: '',
        });
    };

    return (
        <div className='container-objects'>
            {filteredObjects.length === 0 && selectedCategoryNombre === "Objeto especial" ? (
                <div className='container-object-special-form'>
                    <div className='container-object-special-form-info'>
                        <div className='container-object-special-image'>
                            <img src={homeImages(`./${selectedCategoryNombre}/Objeto especial.svg`)} alt={selectedCategoryNombre} />
                        </div>
                        <div className='container-object-special-title'>
                            <h2>{selectedCategoryNombre}</h2>
                        </div>
                        <div className='container-object-special-info'>
                            <p>Por favor, ingresa el nombre y las medidas del objeto que desees agregar a tu listado, asegurándote que las medidas sean en metros (m).</p>
                        </div>
                    </div>
                    <div className='container-object-special-form-inputs'>
                        <div className='container-object-special-form-inputs-name'>
                            <h4>Nombre</h4>
                            <InputText texto='Nombre del artículo' onChange={(e) => handleInputChange('nombre', e.target.value)} />
                            <h4>Ancho</h4>
                            <InputText texto='Ancho en metros' onChange={(e) => handleInputChange('ancho', e.target.value)} />
                            <h4>Largo</h4>
                            <InputText texto='Largo en metros' onChange={(e) => handleInputChange('largo', e.target.value)} />
                            <h4>Alto</h4>
                            <InputText texto='Alto en metros' onChange={(e) => handleInputChange('alto', e.target.value)} />
                            <div className='container-object-special-form-inputs-buttons'>
                                <CustomButton content='Cancelar' />
                                <CustomButton content='Guardar' onClick={handleSaveSpecialObject} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                filteredObjects.length === 0 ? (
                    <div className='container-objects-empty'>
                        <h2>¡No hay objetos en esta categoría!</h2>
                    </div>
                ) : (
                    filteredObjects.map((object, index) => (
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
                    ))
                )
            )}
        </div>
    );
}

export default Objects;
