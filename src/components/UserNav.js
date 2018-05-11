import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = (props) => {
    return (
        <div>
            <div className="dropdown">
                <button className="login-button btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.pubName}
                    <span style={{color: 'green'}} className="ml-1">{"$" + parseFloat(props.balance).toFixed(2)}</span>
                </button>
                <div style={{left: -26}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/upload" ><i style={{color: 'red', width: 20}} className="fas fa-cloud-upload-alt mr-2"/>Upload</Link>
                    <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/wallet"><i style={{color: 'green', width: 20}} className="fas fa-wallet mr-2"/>Wallet</Link>
                    <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/"><i style={{color: 'grey', width: 20}} className="fas fa-home mr-2"/>Home</Link>
                    <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/settings"><i style={{color: 'grey', width: 20}} className="fas fa-cogs mr-2"/>Settings</Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item d-flex align-items-center justify-content-start" onClick={props.logout}><i style={{color: 'grey', width: 20}} className="fas fa-sign-out-alt mr-2"/>Logout</button>
                </div>
            </div>
            {/*<Link to="/user/wallet/" className="btn btn-outline-success btn-bits-bg" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>{this.state.User.isFetching ? "" : "$" + parseFloat(totalbalance).toFixed(2)}</span></Link>*/}
        </div>

)
}

export default UserNav
{/*<button type="button" className="login-button btn btn-outline-dark">{props.pubName}</button>*/}
