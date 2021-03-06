import { useEffect, useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signout = () => {

    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {
        },
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    })

    return <div></div>
};

export default signout;