import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coctailsSelected: [],
    isLoading: false,
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState: initialState,
    reducers: {
        showLoading(state, action) {
            state.isLoading = !state.isLoading
        },
        addToCart(state, action) {
            if (!state.coctailsSelected) {
                let cart = {
                    idDrink: action.payload.idDrink,
                    quantity: 1,
                    strDrinkThumb: action.payload.strDrinkThumb,
                    strDrink: action.payload.strDrink
                }
                state.coctailsSelected.push(cart)
            } else {
                let isDupplicateDrink = false
                state.coctailsSelected.map((item, key) => {
                    if (item.idDrink == action.payload.idDrink) {
                        state.coctailsSelected[key].quantity++
                        isDupplicateDrink = true
                    }
                })
                if (!isDupplicateDrink) {
                    let cart = {
                        idDrink: action.payload.idDrink,
                        quantity: 1,
                        strDrinkThumb: action.payload.strDrinkThumb,
                        strDrink: action.payload.strDrink
                    }
                    state.coctailsSelected.push(cart)
                }
            }
        },
        removeCartItem(state, action) {
            const filteredCocktail = state.coctailsSelected.filter(item => item.idDrink !== action.payload)
            state.coctailsSelected = filteredCocktail
        },
        increaseQuantity(state, action) {
            state.coctailsSelected.map((item, key) => {
                if (item.idDrink == action.payload)
                    state.coctailsSelected[key].quantity++
            })
        },
        decreaseQuantity(state, action) {
            state.coctailsSelected.map((item, key) => {
                if (item.idDrink == action.payload)
                    state.coctailsSelected[key].quantity--
            })
            const filteredCocktail = state.coctailsSelected.filter(item => item.quantity > 0)
            state.coctailsSelected = filteredCocktail
        },
        logOut(state, action) {
            return initialState
        }
    }
})

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };