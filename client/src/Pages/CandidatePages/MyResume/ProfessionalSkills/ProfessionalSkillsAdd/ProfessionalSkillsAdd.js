import React from 'react';
import { Button, Modal, Icon, } from 'antd';
import ProfessionalSkillsForm from '../ProfessionalSkillsForm';
import i18next from 'i18next';


class ProfessionalSkillsAdd extends React.Component {
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
          {i18next.t('my-resume-add-skills-button')}
        </Button>
        <Modal
          title={i18next.t('my-resume-add-skills-button')}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({visible:false})}
          footer={null}
          >
            <ProfessionalSkillsForm closeModal={this.closeModal}/>  
        </Modal>
      </div>  
    );
  }
}

export default ProfessionalSkillsAdd;
