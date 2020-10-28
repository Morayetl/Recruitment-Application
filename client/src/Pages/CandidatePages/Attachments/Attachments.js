import React from 'react';
import './Attachments.css';
import { notification, Upload, Button } from 'antd';
import i18next from 'i18next';
import axios from '../../../Utils/axios';
import { UploadOutlined } from '@ant-design/icons';
import pdf from '../../../images/pdf.png';
import { MAX_LENGTH, MAX_FILE_SIZE_LIMITS } from '../../../Utils/constants';

const fileDownload = require('js-file-download');

class Attachments extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      errorMessage: '',
      maxFileSize: (MAX_FILE_SIZE_LIMITS.Documents / 1000000).toFixed()
    }
  
    this.getDocuments = this.getDocuments.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  componentDidMount(){
    this.getDocuments();
  }

  getDocuments(){
    axios.get('/user/employee/attachments')
      .then( res => {
        return res.data.map(value => {
          const imageUrl = value.type.includes('image') ? value.url : window.location.origin + '/' +pdf;
          return {
            ...value,
            thumbUrl: imageUrl,
            linkProps: '{"download": "image"}', // additional html props of file link
            status: 'done'
          }
        })
      })
      .then( data => {
        this.setState({data: data});
      });
  }

  deleteDocument(attachment){

    axios.delete('/user/employee/attachments/'+attachment.id).then( res => {
      this.getDocuments();
      notification['success']({
        message: i18next.t('attachments-upload-success-deleted-message'),
        duration: 5,
        description:
          ''
      });
    });
  }

  async uploadDocument({file}){
    const errors = [];
    const formData = new FormData();
    formData.append('document', file);

    if(file.size > MAX_FILE_SIZE_LIMITS.Documents){
      errors.push('error-message-file-size-big');
    }

    if(file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "application/pdf"){
      // no errors
    }else{
      errors.push('error-message-file-type-not-supported');
    }

    this.setState({errorMessage: errors});  

    if(errors.length > 0){
      return;
    }


    axios.post('/user/employee/attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      //this.openNotification('Profile picture has been successfully updated!');
      this.getDocuments();
      notification['success']({
        message: i18next.t('attachments-upload-success-message'),
        duration: 5,
        description:
          ''
      });
    });
  }

  async onDownload(attachment){
    const res = await axios.get(attachment.url, {responseType: 'blob'});
    fileDownload(res.data, attachment.name);
  }
  
  render() {
    return (
      <div className="attachments-page">
        <div>
          {i18next.t('attachments-upload-file-limit-message', {size: this.state.maxFileSize})}
        </div>
        <Upload 
          listType="picture" 
          fileList={this.state.data} 
          onRemove={this.deleteDocument} 
          customRequest={this.uploadDocument} 
          onPreview={this.onDownload} 
          withCredentials={true}>
          { this.state.data.length < MAX_LENGTH.employee.attachments ? <Button>
            <UploadOutlined /> {i18next.t('upload')} 
          </Button> : null}
          { this.state.errorMessage.length > 0 ? 
              this.state.errorMessage.map( value => {
                return(
                  <div style={{color: 'red'}}>
                    { i18next.t(value)}
                  </div>
                )
              })
            : null
          }
        </Upload>

      </div>
    );
  }
}

export default Attachments;
