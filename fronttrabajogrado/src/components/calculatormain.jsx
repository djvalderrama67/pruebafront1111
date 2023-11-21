import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles/style.css'
import SearchAppBar from './search'
import { fetchCategories } from '../actions/Categories'
import Categories from './categories'
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import CustomButton from './recursivebutton'
import Objects from './objects'
import Vehicles from './vehicles'
import Warehouse from './warehouse'

export const CalculadoraMain = () => {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.reduxCategories.categories);
    const [selectedCategoryNombre, setSelectedCategoryNombre] = React.useState(null);
    const [totalArticles, setTotalArticles] = useState(0);
    const [totalVolumen, setTotalVolumen] = useState(0);
    const [resetIndicator, setResetIndicator] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (nombre) => {
        setSelectedCategoryNombre(nombre);
    };

    const resetTotals = () => {
        setTotalArticles(0);
        setTotalVolumen(0);
        setResetIndicator(prev => !prev);
        setTimeout(() => {
            setResetIndicator(prev => !prev);
        }, 100);
    };

    return (
        <div className="container-main">
            <div className="container-title-calculadora">
                <h2>Calcula el volumen de tu mudanza</h2>
            </div>
            <div className="consejo-text">
                <p>Con nuestra calculadora, obtendrás estimaciones precisas para que puedas enfocarte en lo que realmente importa: dar el siguiente paso en tu nueva aventura.</p>
                <p>¡Comencemos a calcular el volumen y a hacer tu mudanza más fluida que nunca!</p>
            </div>
            <div className="container-calculadora">
                <div className="container-calculadora-head">
                    <div className="container-calculadora-search">
                        <SearchAppBar />
                    </div>
                    <div className="container-calculadora-title">
                        <h2>Selecciona una categoría</h2>
                    </div>
                </div>
                <div className="container-calculadora-componentes">
                    <div className="container-calculadora-categorias-items">
                        <div className="container-calculadora-categorias">
                            <Categories categories={categories} onCategoryClick={handleCategoryClick} />
                        </div>
                        <div className="container-calculadora-categorias-items">
                            {selectedCategoryNombre && (
                                <Objects selectedCategoryNombre={selectedCategoryNombre} totalArticles={totalArticles}
                                setTotalArticles={setTotalArticles} totalVolumen={totalVolumen} setTotalVolumen={setTotalVolumen} resetIndicator={resetIndicator} />
                            )}
                        </div>
                    </div>
                    <div className="container-calculadora-inventario">
                        <div className="container-calculadora-inventario-title">
                            <h4>Cantidad de artículos</h4>
                        </div>
                        <div className="container-calculadora-inventario-items-text">
                            <p>{totalArticles} artículos</p>
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>Volumen en metros cúbicos</h4>
                        </div>
                        <div className="container-calculadora-inventario-items-text">
                            <p>{totalVolumen} m3</p>
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>vehículo recomendado</h4>
                        </div>
                        <div className="container-calculadora-inventario-items">
                            <Vehicles totalVolumen={totalVolumen} />
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>Capacidad en m&sup3; y m&sup2; de la bodega recomendada</h4>
                        </div>
                        <div className="container-calculadora-inventario-items">
                            <Warehouse totalVolumen={totalVolumen} />
                        </div>
                        <div className="container-calculadora-inventario-buttons">
                            <div className="repeat-button" onClick={resetTotals}>
                                <ReplayCircleFilledIcon style={{ fontSize: 100 }} />
                            </div>
                            <div className="recursive-button" >
                                <CustomButton content="Descargar inventario" link="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
