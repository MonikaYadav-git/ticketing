const OrderIndex = ({ orders }) => {

    const orderList = orders.map(order => {
        return (
            <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.status}</td>

            </tr>
        )
    });

    return (
        <div>
            <h3>Orders</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
        </div>
    );
}


OrderIndex.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/orders')
        .catch((err) => {
            console.log("error while fetching", err);
            return { data: {} };
        });
    return { orders: data };

}

export default OrderIndex;