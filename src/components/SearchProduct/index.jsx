import React, { useRef, useEffect } from "react"; 
import "./SearchProduct.scss";

const SearchProduct = React.memo((props) => {

    const handleSearchInputChange = (e) => {
        props.onSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="section search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleSearchInputChange}
                        placeholder="Search your drink!"
                    />
                </div>
            </form>
        </section>
    );
});

export default SearchProduct;
