
import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {

    const [timeLeft, setTimeLeft] = useState('');


    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000))
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);


    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders')
    });

    if (timeLeft < 0) {
        return <div>Order Expired</div>
    }

    return <div>


        {timeLeft} seconds until order expires
        <StripeCheckout token={({ id }) => { doRequest({ token: id }) }}
            stripeKey="pk_test_51JL3rXG177tRgcU2tPpZAKiu7JQbRHVbxyVKGhVEZWwifffW1hrhCZt1ksTPi0lJzfEGfTNSxWJA8IEh4JGVkCJ800jNQFcinl"
            amount={order.ticket.price * 100}
            currency="AED"
            email={currentUser.email}
        />
        {errors}
        {/* <h2>{ticket.title}</h2>
        <h4>{ticket.price}</h4>
       
        <button onClick={doRequest} className="btn btn-primary">Purchase</button> */}
    </div>
}

OrderShow.getInitialProps = async (context, client) => {

    const { orderId } = context.query;

    const { data } = await client.get(`/api/orders/${orderId}`)
        .catch((err) => {
            console.log("error while fetching", err);
            return { data: {} };
        });
    return { order: data };

}

export default OrderShow;