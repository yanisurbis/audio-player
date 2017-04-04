import React, { Component, PropTypes as pt } from 'react';
import './Message.css'

class Message extends Component {
  static propTypes = {
    user: pt.object
  }
  render() {
    const { user } = this.props
    return (
      <div className="message">
        { user
          ? <h1 className="message__text">Glad to see you, <span className="message__username">{user.displayName}</span>.<br/>You are always welcomed here. </h1>
          : <h1 className="message__text">Hello, please login</h1>
        }
      </div>
    );
  }
}

export default Message;

