import React from 'react';
import './Header.css'
import {withRouter, Link} from 'react-router-dom'
import PropTypes from 'prop-types';



class Header extends React.Component{

    detailOnClick = () =>{
        if(!this.props.history.location.pathname.includes('detail'))
            this.props.history.goBack();
        else
            this.props.history.replace("/");
    }

    render(){  
        
        let isActive = this.props.history.location.pathname === "/";
        var homeActive = isActive ? 'active' : '';
        
        var detailActive = isActive ? '' : 'active';

        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid ">
                    <div className="navbar-header ">
                        <Link className="navbar-brand col-md-6 col-sm-6 col-xs-6" to="/">BachTuocNuong193</Link>
                        
                    </div>
                    
                    <ul className="nav navbar-nav navbar-right">
                        
                        <li className = {homeActive}>
                            <Link className="btn btn-secondary" to="/">
                            <span className="glyphicon glyphicon-home fa-3x"></span>
                            </Link>
                        </li>
                        <li className= {detailActive}>
                            <a className="btn btn-secondary" onClick={this.detailOnClick}> 
                                <span className="glyphicon glyphicon-th fa-3x"></span>
                            </a>
                        </li>
                        
                    </ul>
                    
                </div>
            </nav>
        );
    }
}

Header.contextTypes = {
    router: PropTypes.object
};

export default withRouter(Header);