import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from "../../stores/actions/AuthActions";
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: null,
        password: null
    }

    handleSubmit = (e) => {
        // to stop refreshing the Page when the user Submit.
        e.preventDefault();

        // send the request to the action.
        this.props.signIn(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {authError, auth} = this.props;

        // if already sigin in and trying to open sign in we will redirect you to Dashboard.
        if (auth.uid) return <Redirect to="/"/>

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign in </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>

                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : ''}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (cred) => dispatch(signIn(cred))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);