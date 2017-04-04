import React, { Component, PropTypes as pt } from 'react';
import play from './play-button.svg';
import Player from './Player'
import './Audio.css'

export default class Audio extends Component {

  static propTypes = {
    url: pt.string.isRequired,
    played: pt.number.isRequired,
    sendPlayedTime: pt.func.isRequired,
  }

  componentDidMount() {
    const { played } = this.props
    this.audio.currentTime = played
  }

  onTimeUpdate = (proxy) => {
    const {sendPlayedTime} = this.props
    sendPlayedTime(proxy.currentTarget.currentTime)
  }

  render () {
    const { url } = this.props
    return (
      <div>
        <audio
          className=""
          ref={audio => this.audio = audio}
          controls
          preload="false"
          onTimeUpdate={this.onTimeUpdate}
        >
          <source src={url} />
        </audio>

      </div>
      
    )
  }
}