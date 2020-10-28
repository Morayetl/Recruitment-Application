import React from 'react';
import { Button, Modal, Tooltip, Icon, Col, Row} from 'antd';
import WrappedEducationEditForm from '../EducationForm';
import i18next from 'i18next';


class EducationAdd extends React.Component {
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
        <Button onClick={this.showModal} type="link">
          <Icon width={40} height={40} type="plus-circle" />
          {i18next.t('my-resume-add-education-button')}
        </Button>
        <Modal
          title={i18next.t('my-resume-add-education-button')}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({visible:false})}
          footer={null}
          >
            <WrappedEducationEditForm closeModal={this.closeModal}/>  
        </Modal>
      </div>  
    );
  }
}

export default EducationAdd;
