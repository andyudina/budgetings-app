import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Constants, Camera, Permissions } from 'expo';

export default class UploadReceipt extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync()
        .then(
          (photo) => {
            this.props.uploadReceipt(photo.uri);
          }
        )
        .catch(
          (err) => {
            console.log(err);
          }
        );
    }
  };

  render() {
    console.log(this.state);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
      <View style={{ flex: 1 }}>
        {!this.props.isUploading && <View style={{ flex: 1 }} >
          <Camera 
           style={{ flex: 1 }} 
           type={this.state.type}
           ref={ref => {
            this.camera = ref;
          }}/>
            <Button
              onPress={this.takePicture.bind(this)}
              title='Upload'
            />
        </View>}
        {this.props.isUploading && <Text> Uploading </Text>}
      </View>
      );
    }
  }
}