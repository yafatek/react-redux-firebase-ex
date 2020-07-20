import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider, useSelector} from 'react-redux';
import {rootReducer} from "./stores/reducers/RootResudcer";
import thunk from "redux-thunk";
import {createFirestoreInstance, getFirestore, reduxFirestore} from 'redux-firestore';
import {getFirebase, isLoaded, ReactReduxFirebaseProvider} from 'react-redux-firebase';
import config from './config/fbConfig';
import firebase from "firebase/app";


// applying thunk as a middle ware between the Action and the Reducer to perform Async functionality.
// connect to Fire base using Store inhancers.
const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase, config),
    )
);
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    attachAuthIsReady: true
}
// 2020 update regarding firestore.
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
    return children
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
