import React, { Component, PropTypes as pt } from 'react';

class Message extends Component {
  static propTypes = {
    user: pt.object
  }
  render() {
    const { user } = this.props
    return (
      <div>
        { user
          ? <h1>Glad to see you, {user.displayName}. You are always welcomed here. </h1>
          : <h1>Hello, please login</h1>
        }
      </div>
    );
  }
}

export default Message;

