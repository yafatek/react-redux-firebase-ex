import React, {Component} from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import {connect} from "react-redux";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from "redux";
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
        // fetch the Data from the Apis.
        // the nDispatch them to the Store.
    }

    render() {

        const {projects, auth, notifications} = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        {/*    For the Projects*/}
                        <ProjectList projects={projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        {/*    For the Notifications*/}
                        <Notifications notifications={notifications}/>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        // project is the property name in the combinedReducers in RootReducer Function Decleration.
        // grab them from the Firestore.
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        // attach notifications to props
        notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']},
        {collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard);