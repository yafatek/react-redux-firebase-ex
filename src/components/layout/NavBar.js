import React from "react";
import {Link} from "react-router-dom";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SigndOutLinks";
import {connect} from 'react-redux';

const NavBar = (props) => {
    const {auth, profile} = props;
    console.log(auth);
    const links = auth.uid ? <SignInLinks profile={profile}/> : <SignOutLinks/>;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Mario</Link>
                {links}
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {
    console.log('stt: ', state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(NavBar);