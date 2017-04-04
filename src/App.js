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
      <div className="app">
        <Message user={user} />
        <Login user={user} />
        { user && <UploadFile uid={user.uid} />}
        { user && <UserAudioFiles uid={user.uid}/>}
      </div>
    );
  }
}

// TODO: hidden progress bar if we are not uploading

export default App;
