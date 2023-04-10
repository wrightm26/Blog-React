import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ loggedIn, logUserOut }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 p-3" to="/">OurBlog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link fs-4 me-4" to="/">Home</Link>
                        {loggedIn ? (
                            <>
                            <Link className="nav-link fs-4  me-4" to="/create">Create A Post </Link>
                           
                            <Link className="nav-link fs-4 me-4" to="/" onClick={() => logUserOut()}>Log Out</Link>
                            </>
                        ) : (
                            <>
                            <Link className="nav-link fs-4 me-4" to="/register">Sign Up</Link>
                            <Link className="nav-link fs-4 me-4" to="/login">Log In</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
  )
}
