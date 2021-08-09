//import buildClient from "../api/build-client";

import Link from "next/link";

const Index = ({ currentUser, tickets }) => {
    // console.log(tickets);
    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link href="tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <h2>Tickets</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    );


    //return currentUser ? <h3>You are signed in.</h3> : <h3>You are not signed in.</h3>
}

Index.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/tickets')
        .catch((err) => {
            console.log("error while fetching", err);
            return { data: {} };
        });
    return { tickets: data };

}

export default Index;