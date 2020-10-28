import React from 'react';
import './UploadImage.css';
import { Icon, Upload, Modal } from 'antd';
import i18next from 'i18next';
import { MAX_FILE_SIZE_LIMITS } from '../../../Utils/constants';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
  }

  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.

    if ('value' in nextProps) {
      return {
        fileList: nextProps.value || []
      };
    }
    return null;
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = function ({ fileList , file}){ 
    this.props.onChange(fileList);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{i18next.t('upload')}</div>
      </div>
    );
    return (
      <div style={{lineHeight: 0}}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.maxLength ? null : uploadButton}
        </Upload>
        <div style={{marginTop: '10px'}}>
          {i18next.t('company-profile-file-limit-message', {size: MAX_FILE_SIZE_LIMITS.ProfilePic/1000000 })}
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImage;
