import Router from 'next/router';
import { useState } from "react";
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, price
        },
        onSuccess: () => Router.push('/')
    });

    const onBlur = () => {
        const value = parseFloat(price);
        if (isNaN(value))
            return;

        setPrice(value.toFixed(2));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await doRequest();


    };


    return <div>
        <h1>Add New Ticket</h1>
        <form onSubmit={onSubmit}>

            <div className='form-group'>
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    className='form-control'
                ></input>
            </div>
            <div className='form-group'>
                <label>Price</label>
                <input
                    value={price}
                    onBlur={onBlur}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    className='form-control'
                ></input>
            </div>
            {errors}


            <button className='btn btn-primary' type='submit'>
                Add Ticket
            </button>
        </form>
    </div>

}

export default NewTicket;