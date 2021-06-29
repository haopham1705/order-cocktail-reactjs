import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalActions } from 'redux/slices/globalSlice';
import "./Header.scss"

export default function Header(props) {
    const coctailsSelected = useSelector(state => state.GlobalReducer.coctailsSelected);
    console.log(coctailsSelected);

    let cartQuanlity = coctailsSelected.reduce((sum, currentValue) => {
        return sum += currentValue.quantity
    }, 0)
    cartQuanlity = cartQuanlity || '';
    const [cartQuantity, setCartQuantity] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        setCartQuantity(cartQuanlity)
    }, [cartQuanlity])


    const handleLogout = () => {
        localStorage.clear();
        dispatch(GlobalActions.logOut())
        history.push("/login");
    };
    const handleAddToCart = () => {
        history.push("/cart");
    };
    return (
        <div className="main-header">
            <Button
                variant="contained"
                onClick={handleLogout}
            > Log Out
            </Button>
            <Link to="/">
                <div className="main-header__title">Cocktail Menu</div>
            </Link>
            <Button
                variant="contained"
                startIcon={<ShoppingBasketIcon />}
                onClick={handleAddToCart} >
                <span className="main-header__cart-number">{cartQuantity}</span>
            </Button>
        </div>
    )
}
