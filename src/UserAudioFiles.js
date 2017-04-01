import React, { Component, PropTypes as pt } from 'react';
import { database } from './firebase'
import R from 'ramda'
import ReactPlayer from 'react-player'

class UserAudioFiles extends Component {
  static propTypes = {
    uis: pt.String
  }

  state = {
    songs: null
  }

  constructor(props) {
    super(props)

    this.userAudioFilesRef = database.ref('/users').child(props.uid).child('user-audios')
  }

  componentDidMount() {
    this.userAudioFilesRef.on('value', snapshot => {
      const songs = []
      
      const snapshotVal = snapshot.val()
      const keys = Object.keys(snapshotVal)
      keys.forEach(key => songs.push(snapshotVal[key]))

      this.setState({ songs })
    })
  }

  renderSong = song => {
    const { name, url, uid } = song
    const playlist = [
      { url,
        displayText: name
      }
    ]
    return (
      <div key={uid}>
        <p>{name}</p>
        <ReactPlayer url={url} controls height={20} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.songs && R.map(this.renderSong, this.state.songs)}
        </ul>
      </div>
    );
  }
}

export default UserAudioFiles;