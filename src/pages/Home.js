import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts();   
    },[])

    const getProducts = () => {
        fetch("http://localhost:8081/products")
            .then((response) => {
                return response.json();
            }).then((data) => {
                //setting products state
                setProducts(data);

            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <h1>Home</h1>

            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
            </ul>

            <button onClick={getProducts}>Load Products</button>

            <ol>
                {products && products.map((product) => ( //for each
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ol>

        </>
    )
}

export default Home;