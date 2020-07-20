const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }

        case 'SIGNUP_ERROR':
            console.log('sign up error');
            return {
                ...state,
                authError: action.err.message
            }
        case 'SIGNOUT_SUCCESS':
            console.log('sigout success');
            return state;

        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login Failed'
            }

        default:
            return state;
    }

}
export default authReducer;