
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    });


    return <div>
        <h2>{ticket.title}</h2>
        <h4>{ticket.price}</h4>
        {errors}
        <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
    </div>
}

TicketShow.getInitialProps = async (context, client) => {

    const { ticketId } = context.query;

    const { data } = await client.get(`/api/tickets/${ticketId}`)
        .catch((err) => {
            console.log("error while fetching", err);
            return { data: {} };
        });
    return { ticket: data };

}

export default TicketShow;