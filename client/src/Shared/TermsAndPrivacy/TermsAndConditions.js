import React from 'react';
import { SUPPORT_EMAIL, APP_WEBSITE, APP_NAME, AGE_LIMIT } from '../../Utils/constants';

class TermsAndConditions extends React.Component {


  render() {
    return (
      <div>
        <h1>Terms and Conditions for {APP_NAME}</h1>
        <h2>Effective May 13, 2020</h2>

        <h2>Introduction</h2> 
          
        <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, {APP_WEBSITE} accessible at {APP_WEBSITE}.</p>

        <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>

        <p>Minors or people below {AGE_LIMIT} years old are not allowed to use this Website.</p>
      </div>
    );
  }
}

export default TermsAndConditions;
