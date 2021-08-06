import Link from 'next/link'

const Header = ({ currentUser }) => {

    const links = [

        !currentUser && { label: 'Sign up', href: '/auth/signup' },
        !currentUser && { label: 'Sign in', href: '/auth/signin' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' },
        currentUser && { label: 'Sign out', href: '/auth/signout' },

    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return <li key={href} className="nav-item">
                <Link href={href}>
                    <a >{label}</a>
                </Link>
            </li>
        });

    return <nav className="navbar navbar-light bg-light">
        <Link href="#">
            <a className="navbar-brand">Little Bench</a>
        </Link>
        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>
    //currentUser ? <h1>You are signed in.</h1> : <h1>You are not signed in.</h1>
}

export default Header;