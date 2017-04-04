import React, { Component, PropTypes as pt } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase'
import uuidV4 from 'uuid/v4'
import './Uploader.css'

class UploadFile extends Component {
  constructor(props) {
    super(props)

    this.storageRef = storage.ref('/user-audios').child(props.uid)
    this.userRef = database.ref('/users').child(props.uid)
  }

  state = {
    progressUploading: 0,
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
                    played: 0,
                    url: downloadURL,
                  })

    })

    uploadTask.on(
      'state_changed',
      snapshot => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({progressUploading: percentage})
      },
      error => {

      },
      () => {
        this.setState({progressUploading: 0})
      }
    )
  }

  render() {
    const { progressUploading } = this.state
    return (
      <div>
        <label htmlFor="file" className="button">Upload File</label>
        <progress value={progressUploading} max="100" id="uploader" />
        <input type="file" name="file" id="file" className="inputfile" onChange={this.handleSubmit}/>
      </div>
    );
  }
}

// <FileInput
//           accept=".mp3"
//           placeholder="Select Audio File"
//           onChange={this.handleSubmit}
//         />

export default UploadFile;