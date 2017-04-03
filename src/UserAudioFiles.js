import React, { PureComponent, PropTypes as pt } from 'react';
import { database } from './firebase'
import R from 'ramda'
import Audio from './Audio'

class UserAudioFiles extends PureComponent {
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
      
      const songsObject = snapshot.val()
      const keys = Object.keys(songsObject)
      keys.forEach(key => songs.push(songsObject[key]))

      this.setState({ songs })
    })
  }

  sendPlayedTime(uid, played) {
    const wait = this.wait
    if (!wait) {
      // console.log("sending")
      const fileRef = this.userAudioFilesRef.child(uid)
      fileRef.child('played').set(played)
      this.wait = setTimeout(() => this.wait = null, 4000)
    }
  }

  renderSong = song => {
    const { name, url, uid, played } = song
    const playlist = [
      { url,
        displayText: name
      }
    ]
    return (
      <div key={uid}>
        <p>{name}</p>
        <Audio
          url={url}
          played={played}
          sendPlayedTime={played => this.sendPlayedTime(uid, played)}
        />
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