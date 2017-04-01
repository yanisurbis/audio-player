import React, { Component, PropTypes as pt } from 'react'
import { auth, googleAuthProvider } from './firebase'

class Login extends Component {

    static propTypes = {
        user: pt.object
    }

    loginWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
    }

    logOut = () => {
        auth.logOut()
    }

    render() {
        const { user } = this.props
        return (
            <div>
            { user 
                ? (
                    <button onClick={this.logOut}>
                        Log Out
                    </button>
                )
                : (
                    <button onClick={this.loginWithGoogle}>
                        Log In
                    </button>
                )
            }
            </div>
        )
    }
}

export default Login