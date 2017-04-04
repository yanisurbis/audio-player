import React, { Component, PropTypes as pt } from 'react'
import { auth, googleAuthProvider } from './firebase'
import './Button.css'

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
                    <button className="warn" onClick={this.logOut}>
                        Log Out
                    </button>
                )
                : (
                    <button className="" onClick={this.loginWithGoogle}>
                        Log In
                    </button>
                )
            }
            </div>
        )
    }
}

export default Login