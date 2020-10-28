import React from 'react';
import { Button, Modal, Tooltip, Icon, notification} from 'antd';
import i18next from 'i18next';
import axios from '../../../../Utils/axios';

const { confirm } = Modal;

class ManageJobsDelete extends React.Component {

  constructor(props){
    super(props);
    this.openNotification = this.openNotification.bind(this);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
  }
  
  showDeleteConfirm(data) {
    confirm({
      title: i18next.t('manage-jobs-delete-confimation-title'),
      content: 'Some descriptions',
      okText: i18next.t('yes'),
      okType: 'danger',
      cancelText: i18next.t('no'),
      onOk: (() =>{
        axios.delete('/jobs/job/'+ data._id).then(res =>{
          this.openNotification(i18next.t('manage-jobs-delete-success'));
          this.props.updateJobList();
        },() =>{
          this.openNotification(i18next.t('manage-jobs-delete-failed'), false);
        });
      }),
      onCancel() {}
    });
  }

  openNotification = (message, success = true) => {
    notification[success ? 'success' : 'error']({
      message: message,
      duration: 5,
      description:
        ''
    });
  };

  render() {
    return (
      <Tooltip placement="top" title={i18next.t('delete')}>
      <Button onClick={() => {this.showDeleteConfirm(this.props.data)}} type="link">
        <Icon type="delete" />
      </Button>          
    </Tooltip>   
    );
  }
}

export default ManageJobsDelete;
