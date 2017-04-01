import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, storage } from './firebase'
import Login from './Login'
import Message from './Message'
import UploadFile from './UploadFile'
import UserAudioFiles from './UserAudioFiles'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user })
    })
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Message user={user} />
        <Login 
          user={user}
        />
        { user &&
          <div>
            <UploadFile
              uid={user.uid}
            />
            <UserAudioFiles
              uid={user.uid}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
