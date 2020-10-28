import React from 'react';
import './RegisterRecruiter.css';
//import { Affix, Button, Menu, Icon } from 'antd';
import { Row, Icon } from 'antd';


const style = {
  icons: {
    marginRight: '10px'
  },
  bulletPointLines: {
    margin: '5px 0px 5px 0px'
  }
}
class RegisterRecruiterText extends React.Component {
  render() {
    return (
      <div className="register-recruiter-page-text">
        <Row>
          <h1 style={{fontWeight:'bold'}}>Join Us!</h1>
        </Row>
        <Row>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus tristique urna id consequat. Nam bibendum lorem eros, eu sodales velit condimentum et. Donec dictum quis mi quis tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat libero sed tincidunt dictum. Curabitur condimentum.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus tristique urna id consequat. Nam bibendum lorem eros, eu sodales velit condimentum et. Donec dictum quis mi quis tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat libero sed tincidunt dictum. Curabitur condimentum.
          </p>
        </Row>  
        <Row style={style.bulletPointLines}>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit:
          </span>
        </Row>
        <Row style={style.bulletPointLines}>
          <div>
            <Icon type="right" style={style.icons}/>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>
        </Row>
        <Row style={style.bulletPointLines}>
          <div>
            <Icon type="right" style={style.icons}/>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>
        </Row>
        <Row style={style.bulletPointLines}>
          <div>
            <Icon type="right" style={style.icons}/>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>
        </Row>
        <Row style={style.bulletPointLines}>
          <div>
            <Icon type="right" style={style.icons}/>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>
        </Row>
      </div>
    );
  }
}

export default RegisterRecruiterText;
