import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { connect } from 'react-redux';
import Main from './Main';
import { alreadyLogin, notLoginYet } from '../actions';

class AppInit extends Component {
    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyC7lWrGGBcWJaiap-590z1xATnGUYKV_Mc",
            authDomain: "instagrin-c25c5.firebaseapp.com",
            databaseURL: "https://instagrin-c25c5.firebaseio.com",
            projectId: "instagrin-c25c5",
            storageBucket: "instagrin-c25c5.appspot.com",
            messagingSenderId: "974257372915",
            appId: "1:974257372915:web:6bacb3e657269775"
        };
        // Initialize Firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.alreadyLogin({ user });
            } else {
                this.props.notLoginYet();
            }
        });
    }

    render() {
        return (
            <Main />
        )
    }
}

export default connect(null, { alreadyLogin, notLoginYet })(AppInit);