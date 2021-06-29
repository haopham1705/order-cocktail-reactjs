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
            console.log(productList)
            setModifiedCocktail(productList[0]);
            dispatch(GlobalActions.showLoading())
        };
        fetchProducts();
    }, [])
    const handleAddToCart = (product) => {
        dispatch(GlobalActions.addToCart(product))
    }
    // if (!modifiedCocktail) {
    //     return <h2 className="section-title">No Cocktail to Display</h2>;
    // }
    const { strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass, strInstructions } =
        modifiedCocktail;
    return (
        <>
            <Header />
            {
                !modifiedCocktail ? 
                    (
                        <div className="cocktail-section">
                            <h2 className="msg-not-found">No Cocktail to Display</h2>
                        </div>
                    )
                    :
                    (
                        <section className="cocktail-section">
                            <Link to="/">
                                <button className="btn btn-back" style={{ marginTop: "1" }}>
                                    Go Back
                                </button>
                            </Link>
                            <h2 className="section-title">{strDrink}</h2>
                            <section className="drink-section">
                                <div className="drink-section__img-hover">
                                    <img className="drink-section__img" src={strDrinkThumb} alt={strDrink} />
                                </div>
                                
                                <div className="drink-info">
                                    <p className="drink-info__detail">
                                        <span className="drink-info__data">Name :</span> <span className="drink-info__content">{strDrink}</span>
                                    </p>
                                    <p className="drink-info__detail">
                                        <span className="drink-info__data">Category :</span> <span className="drink-info__content">{strCategory}</span>
                                    </p>
                                    <p className="drink-info__detail">
                                        <span className="drink-info__data">Type :</span> <span className="drink-info__content">{strAlcoholic}</span>
                                    </p>
                                    <p className="drink-info__detail">
                                        <span className="drink-info__data">Glass :</span> <span className="drink-info__content">{strGlass}</span>
                                    </p>
                                    <p className="drink-info__detail">
                                        <span className="drink-info__data">Detail :</span> <span className="drink-info__content">{strInstructions}</span> 
                                    </p>
                                    <p className="cocktail-section__add">
                                        <button className="btn btn-add" onClick={() => handleAddToCart(modifiedCocktail)}>Add</button>
                                    </p>
                                </div>
                            </section>
                        </section>
                    )
            }
            
        </>
    );
};

export default ProductInfo;
