import React from 'react';
import { Button, Modal, Tooltip, Icon} from 'antd';
import WrappedEducationEditForm from '../EducationForm';
import i18next from 'i18next';


class EducationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false 
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Tooltip placement="top" title={i18next.t('edit')}>
          <Button onClick={this.showModal} type="link">
            <Icon type="edit" />
          </Button>          
        </Tooltip>      
        <Modal
        title={i18next.t('my-resume-edit-education-title')}
        visible={this.state.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.setState({visible:false})}
        footer={null}
        >
          <WrappedEducationEditForm closeModal={this.closeModal} data={this.props.data}/>  
        </Modal>
      </div>
    );
  }
}

export default EducationEdit;
