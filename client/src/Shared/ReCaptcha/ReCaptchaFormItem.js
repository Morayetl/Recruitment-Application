import React from 'react';
import { RECAPTCHA_SITE_KEY } from '../../Utils/constants';
import ReCAPTCHA from "react-google-recaptcha";

class ReCaptchaFormItem extends React.Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(changedValue) {
    this.props.onChange(changedValue);
  }

  render() {
    return (
      <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={this.onChange}
      />  
    );
  }
}

export default ReCaptchaFormItem;
