import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    const navigate = useNavigate();

    const getProducts = async () => {

        try {
            const response = await axios.get("http://localhost:8081/products");
            setProducts(response.data);
        } catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        }catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch("http://localhost:8081/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setProducts([...products, data]); //using Spread Operator a,b,c,d ,e
            setName(null);
            setPrice(null);
            setQty(null);
            setCategoryId(null);

            console.log(products)
        }).catch(error => {
            console.log(error);
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {categories && categories.map((category) => (
                                <li class="nav-item">
                                    <Link to={`/categories/${category.id}`} className="nav-link">{category.name}</Link>
                                </li>
                            ))}

                            <li class="nav-item">
                                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
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

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input type="text" required className="form-control" onChange={handleName} value={name} />
                </div>
                <div>
                    <label>Product Price</label>
                    <input type="text" required onChange={handlePrice} value={price} />
                </div>
                <div>
                    <label>Product Qty</label>
                    <input type="text" required onChange={handleQty} value={qty} />
                </div>
                <div>
                    <label>Category</label>
                    <select required onChange={handleCategory}>
                        <option>Please Select</option>

                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}

                    </select>
                </div>

                <button className="btn btn-primary" type="submit">Save Product</button>
            </form>

        </>
    )
}

export default Home;