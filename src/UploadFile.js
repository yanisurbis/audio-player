import React, { Component, PropTypes as pt } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase'
import uuidV4 from 'uuid/v4'

class UploadFile extends Component {
  constructor(props) {
    super(props)

    this.storageRef = storage.ref('/user-audios').child(props.uid)
    this.userRef = database.ref('/users').child(props.uid)
  }

  static propTypes = {
    uid: pt.string
  }

  handleSubmit = (event) => {
    const file = event.target.files[0]

    const fileUID = uuidV4()
    const fileName = file.name

    const uploadTask = this.storageRef.child(fileName)
                                      .put(file, { contentType: file.type })

    uploadTask.then(snapshot => {
      const fullPath = snapshot.ref.fullPath
      const downloadURL = snapshot.downloadURL
      this.userRef.child(`user-audios/${fileUID}`)
                  .set({
                    name: fileName,
                    uid: fileUID,
                    path: fullPath,
                    startPlayFrom: 0,
                    url: downloadURL,
                  })
                  
    })
  }

  render() {
    return (
      <div>
        Upload File
        <FileInput
          accept=".mp3"
          placeholder="Select Audio File"
          onChange={this.handleSubmit}
        />
      </div>
    );
  }
}

export default UploadFile;