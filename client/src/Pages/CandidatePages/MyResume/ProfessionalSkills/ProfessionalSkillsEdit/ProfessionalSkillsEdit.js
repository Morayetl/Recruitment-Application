import React from 'react';
import { Button, Modal, Tooltip, Icon} from 'antd';
import ProfessionalSkillsForm from '../ProfessionalSkillsForm';
import i18next from 'i18next';


class ProfessionalSkillsEdit extends React.Component {
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
        <Tooltip placement="top" title={'Edit'}>
          <Button onClick={this.showModal} type="link">
            <Icon type="edit" />
          </Button>          
        </Tooltip>      
        <Modal
        title={i18next.t('my-resume-edit-professional-skills-title')}
        visible={this.state.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.setState({visible:false})}
        footer={null}
        >
          <ProfessionalSkillsForm closeModal={this.closeModal} data={this.props.data}/>  
        </Modal>
      </div>
    );
  }
}

export default ProfessionalSkillsEdit;
