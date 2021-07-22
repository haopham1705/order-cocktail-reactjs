import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { GlobalActions } from 'redux/rootAction';
import Header from 'components/Header'
import './Cart.scss'

export default function Cart(props) {

    const dispatch = useDispatch();

    const coctailsSelected = useSelector(state => state.GlobalReducer.coctailsSelected);
    console.log(coctailsSelected);

    let cartQuanlity = coctailsSelected.reduce((sum, currentValue) => {
        return sum += currentValue.quantity
    }, 0)
    cartQuanlity = cartQuanlity || '';
    console.log(cartQuanlity)
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1000)
    })

    const handleIncreaseQuantity = (drink) => {
        dispatch(GlobalActions.increaseQuantity(drink))
    }

    const handleDecreaseQuantity = (drink) => {
        dispatch(GlobalActions.decreaseQuantity(drink))
    }

    const handleRemoveDrink = (drink) => {
        dispatch(GlobalActions.removeCartItem(drink))
    }
    const renderSelectedDrinks = (drink, index) => {
        return (
            <div className="cart-content__item" key={drink.idDrink} >
                <div className="cart-content__txt-info">
                    <p>{index + 1}</p>
                    <p>{drink.strDrink}</p>
                </div>
                <div className="cart-content__control-content">
                    <img className='cart-content__img' src={drink.strDrinkThumb} alt={drink.strDrink} />
                    <div className="cart-content__control">
                        <button className="btn-quantity" value={drink.idDrink} onClick={() => handleDecreaseQuantity(drink.idDrink)}>-</button>
                        {drink.quantity}
                        <button className="btn-quantity" value={drink.idDrink} onClick={() => handleIncreaseQuantity(drink.idDrink)}>+</button>
                    </div>
                    <button className="btn-remove" value={drink.idDrink}
                        onClick={() => handleRemoveDrink(drink.idDrink)}>
                        Remove
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container cart-content">
            <Header />
            <Link to="/">
                <button className="btn btn-back" style={{ marginTop: "1" }}>
                    Go Back
                </button>
            </Link>
            {coctailsSelected.length > 0 ?
                <>
                    <div className="cart-content__quantity-txt">Cart: {cartQuanlity} </div>
                    <>
                        {coctailsSelected.map(renderSelectedDrinks)}
                    </>
                </>
                :
                <div className="msg-not-found">Cart is Empty</div>
            }
        </div>
    )
}
