import axios from "axios";
import { useEffect, useState } from "react";

const Checkout = () => {

    const [products, setProducts] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0)

    const getProducts = async () => {
        const response = await axios.get('http://localhost:8081/products');
        setProducts(response.data);
    }

    const createOrder = async () => {
        const productIds = orderProducts.map(obj => obj.id);
        const data = {
            products: productIds
        }

        const response = await axios.post("http://localhost:8081/orders", data);
        if(response.status === 201) {
            setOrderProducts([]);
            setTotal(0);
            setTax(0);
        } else {
            //show error message
        }
    }



    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTax( (total/100) * 15 );
    },[total]);


    return (
        <>
            <div className="container-fluid">
                <h1>Checking Out</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Products</h2>

                        {products && products.map(product => (
                            <div className="product-box px-2 py-2">
                                {product.name} - {product.price}

                                <button className="btn btn-sm btn-primary" onClick={() => {
                                    setOrderProducts([...orderProducts, product]);

                                    let currentTotal = total;
                                    currentTotal = currentTotal + product.price;
                                    setTotal(currentTotal);

                                }}>Add to Order</button>

                            </div>
                        ))}
                    </div>
                    <div className="col-md-6">
                        <h2>Order</h2>

                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts && orderProducts.map(product => (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}

                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        Total
                                    </th>
                                    <th>
                                        {total}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>
                                        Tax
                                    </th>
                                    <th>
                                        {tax}
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout;