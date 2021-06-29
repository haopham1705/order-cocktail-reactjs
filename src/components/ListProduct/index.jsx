import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GlobalActions } from 'redux/slices/globalSlice'
import productApi from 'api/productApi'
import _ from 'lodash'
import SearchProduct from 'components/SearchProduct'
import "./ListProduct.scss"

const ListProduct = () => {
    const [cocktails, setCocktails] = useState([])
    const [searchDrink, setSearchDrink] = useState('')
    const dispatch = useDispatch()
    const handleSearch = _.debounce((value) => { 
        setSearchDrink(value); 
    }, 900)
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        const fetchProducts = async () => {
            const params = {
                _limit: 10,
            }
            if (searchDrink === '') {
                const productList = await productApi.getAll(params);
                setCocktails(productList);
                dispatch(GlobalActions.showLoading())
            } else {
                const productList = await productApi.getSearchName(searchDrink);
                setCocktails(productList);
                dispatch(GlobalActions.showLoading())
            }
        };
        fetchProducts();
    }, [searchDrink])
    const handleAddToCart = (product) => {
        dispatch(GlobalActions.addToCart(product))
    }

    return (
        <div className="container drink-content">
            <SearchProduct onSearch={handleSearch} />
            {
                cocktails ?
                    (<div className="row row-cols-1 row-cols-md-3 g-4">
                        {cocktails.map((item, index) => {
                            const { idDrink, strDrink, strDrinkThumb } = item;
                            return (
                                <div className="col" key={idDrink}>
                                    <div className="card h-2">
                                        <Link to={`/cocktail/${idDrink}`}>
                                            <img src={strDrinkThumb} alt={strDrink} className="card-img-top drink-content__img" />
                                            <div className="card-body" style={{ textAlign: "center" }}>
                                                <h4 className="card-title">{strDrink}</h4>
                                                <p className="card-text">{idDrink}</p>
                                            </div>
                                        </Link>
                                        <button className="btn btn-add" onClick={() => handleAddToCart(item)}>Add</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    ) : (<h2 className="msg-not-found">No Cocktails matched your search!</h2>)
            }
        </div>

    );
};

export default ListProduct;