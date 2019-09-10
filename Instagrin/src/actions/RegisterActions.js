import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import { 
    EMAIL_REGISTER_CHANGED,
    USERNAME_REGISTER_CHANGED,
    PASSWORD_REGISTER_CHANGED,
    CON_PASSWORD_REGISTER_CHANGED,
    REGISTER_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from './types';

export const emailRegisterChanged = (text) => {
    return {
        type: EMAIL_REGISTER_CHANGED,
        payload: text
    };
};

export const usernameRegisterChanged = (text) => {
    return {
        type: USERNAME_REGISTER_CHANGED,
        payload: text
    };
};

export const passwordRegisterChanged = (text) => {
    return {
        type: PASSWORD_REGISTER_CHANGED,
        payload: text
    };
};

export const conPasswordRegisterChanged = (text) => {
    return {
        type: CON_PASSWORD_REGISTER_CHANGED,
        payload: text
    };
};

export const registerUser = (email,username,password,conPassword) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_USER });

        if(email !== '' && username !== '' && password !== '' && conPassword !== '') {
            
            if(password === conPassword) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log('Register Success')
                    console.log(user)
                    user.user.updateProfile({
                        displayName: username,
                        photoURL: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg'
                    }).then(() => {
                        firebase.database().ref(`/users/${user.user.uid}`)
                        .push({ 
                            displayName: username, 
                            photoURL: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' 
                        }).then(() => {
                            dispatch({
                                type: REGISTER_USER_SUCCESS
                            })
                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: user
                            });
                        }).catch((err) => {
                            dispatch({ type: REGISTER_USER_FAIL, payload: err.message });
                        })
                        console.log('Update Profile Success')
                        console.log(user)
                    }).catch((err) => {
                        console.log(err)
                        dispatch({ type: REGISTER_USER_FAIL, payload: err.message });
                    })
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({ type: REGISTER_USER_FAIL, payload: err.message });
                });
            } else {
                dispatch({ type: REGISTER_USER_FAIL, payload: 'Confirm Password Different' });
            }
            
        } else {
            dispatch({ type: REGISTER_USER_FAIL, payload: 'All Form Must be Filled!' });
        }
    };
};