import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <nav>
                <ul>
                    <li><Link to='/'>Advanced Canvas Manipulate</Link></li>
                    <li><Link to='/basic'>Basic Canvas Manipulate</Link></li>
                    <li><Link to='/lojban'>Lojban Character</Link></li>
                    <li><Link to='/celltile'>Cell Pagination</Link></li>
                    <li><Link to='/videoframe'>Video Frame</Link></li>
                    <li><Link to='/videoframe2'>Video Frame2</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Header;

