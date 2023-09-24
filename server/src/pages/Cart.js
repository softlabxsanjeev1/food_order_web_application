import React, { useState, useEffect } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';


export default function Cart() {
    // rozer pay code
    const [paymentStatus, setPaymentStatus] = useState(null);

    const loadScript = (src, callback) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    };
    const handlePayment = async () => {
        const options = {
            key: "rzp_test_f0owNVeA3oGs4C",
            amount: totalPrice * 100,
            currency: "INR",
            description: "Payment for your service",
            handler: async (response) => {
                // Handle the payment success
                setPaymentStatus("Payment successful: " + response.razorpay_payment_id);
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open()
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js", () => { });
    }, []);


    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async (req, res) => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:8000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("order Response:", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)


    return (
        <div>
            {/* {console.log(data)} */}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table '>
                    <thead className=' fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn bg-danger px-2 p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete
                                </button></td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handlePayment}> Pay now </button>
                </div>
            </div>



        </div>
    )
}