import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productApi from 'api/productApi'
import Header from 'components/Header'
import './ProductInfo.scss'
import { GlobalActions } from "redux/rootAction";

const ProductInfo = (props) => {
    const [modifiedCocktail, setModifiedCocktail] = useState([]);
    const { drinkId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(GlobalActions.showLoading())
            console.log("drinkId", drinkId);
            const productList = await productApi.getLookupId(drinkId);
            setModifiedCocktail(productList[0]);
            console.log(modifiedCocktail)
            dispatch(GlobalActions.showLoading())
        };
        fetchProducts();
    }, [])
    const handleAddToCart = (product) => {
        dispatch(GlobalActions.addToCart(product))
    }
    if (!modifiedCocktail) {
        return <h2 className="section-title">No Cocktail to Display</h2>;
    }
    const { strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass } =
        modifiedCocktail;
    return (
        <>
            <Header />
            <section className="section cocktail-section">
                <Link to="/">
                    <button className="btn btn-back" style={{ marginTop: "1" }}>
                        Go Back
                    </button>
                </Link>
                <h2 className="section-title">{strDrink}</h2>
                <section className="drink-section">
                    <img src={strDrinkThumb} alt={strDrink} />
                    <div className="drink-info">
                        <p>
                            <span className="drink-data">Name :</span> {strDrink}
                        </p>
                        <p>
                            <span className="drink-data">Category :</span> {strCategory}
                        </p>
                        <p>
                            <span className="drink-data">Info :</span> {strAlcoholic}
                        </p>
                        <p>
                            <span className="drink-data">Glass :</span> {strGlass}
                        </p>
                        <p className="cocktail-section__add">
                            <button className="btn btn-add" onClick={() => handleAddToCart(modifiedCocktail)}>Add</button>
                        </p>
                    </div>
                </section>
            </section>
        </>
    );
};

export default ProductInfo;
