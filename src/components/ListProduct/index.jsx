import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import productApi from 'api/productApi';
import SearchProduct from 'components/SearchProduct';
import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GlobalActions } from 'redux/slices/globalSlice';
// import "./ListProduct.scss"
// import styles from './ListProduct.module.css'

const ListProduct = () => {

    const useStyles = makeStyles((theme) => ({
        wrapper: {
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20
        },
        link: {
            width: '100%',
            textAlign: 'center',
            '&:hover': { 
                textDecoration: 'none',
            }
        },
        card: {
            width: '100%',
            maxWidth: 350,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
            '&:hover': {
                boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)', 
            }
        },
        media: {
            height: 300,
        },
        title: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#000',
            textAlign: 'center'
        },

        button: {
            background: 'linear-gradient(45deg, #2979ff 30%, #5a93f6 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 30,
            padding: '0 30px',
        }
    }))
    const dispatch = useDispatch()
    const classes = useStyles()
    // hook
    const [cocktails, setCocktails] = useState([])
    const [searchDrink, setSearchDrink] = useState('') 
    // handle search
    const handleSearch = _.debounce((value) => {
        setSearchDrink(value);
    }, 900)
    // get APIs
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        const fetchProducts = async () => {
            const params = {
                _limit: 50,
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
    // redux add to cart
    const handleAddToCart = (product) => {
        dispatch(GlobalActions.addToCart(product))
    }

    return (
        <div className="container main-content"> 
            <SearchProduct onSearch={handleSearch} />
            {
                cocktails ?
                    (<div className={classes.wrapper}>
                        {cocktails.map((cocktail, index) => {
                            const { idDrink, strDrink, strDrinkThumb } = cocktail;

                            return (
                                <Card className={classes.card} key={idDrink}>
                                    <Link className={classes.link} href={`/cocktail/${idDrink}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={strDrinkThumb}
                                                title={strDrink}
                                            />
                                            <CardContent>
                                                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                                    {strDrink}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary" component="h4">
                                                    {idDrink}
                                                </Typography>
                                                <Rating name="disabled" value={5} disabled />
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardActions>
                                        <Button
                                            size="medium"
                                            color="secondary"
                                            onClick={() => handleAddToCart(cocktail)}
                                            className={classes.button}
                                        >
                                            ADD
                                        </Button>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </div>)
                    : (<h2 className="msg-not-found">No Cocktails matched your search!</h2>)
            } 
        </div>

    );
};

export default ListProduct;

// (<div className="row row-cols-1 row-cols-md-3 g-4">
//     {cocktails.map((cocktail, index) => {
//         const { idDrink, strDrink, strDrinkThumb } = cocktail;
//         return (
//             <div className="col" key={idDrink}>
//                 <div className="card h-2">
//                     <Link to={`/cocktail/${idDrink}`}>
//                         <img src={strDrinkThumb} alt={strDrink} className="card-img-top drink-content__img" />
//                         <div className="card-body" style={{ textAlign: "center" }}>
//                             <h4 className="card-title">{strDrink}</h4>
//                             <p className="card-text">{idDrink}</p>
//                         </div>
//                     </Link>
//                     <button className="btn btn-add" onClick={() => handleAddToCart(cocktail)}>Add</button>
//                 </div>
//             </div>
//         );
//     })}
// </div>)