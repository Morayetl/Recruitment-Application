import React from 'react';
import { LinkedinShareButton, EmailShareButton, TwitterShareButton, WhatsappShareButton, FacebookShareButton, TwitterIcon, WhatsappIcon, LinkedinIcon, EmailIcon, FacebookIcon } from 'react-share';
import { Row } from 'antd';
import i18next from 'i18next';

const iconSize = 40;
class JobResultInfoJob extends React.Component{
  render() {
    return (
      <div className="job-result-info">

        <div type="flex" style={{padding:'10px 20px 10px 20px', display:'block', wordWrap:'break-word'}} dangerouslySetInnerHTML={{__html: this.props.details ? this.props.details.description : null }}/>

        <div type="flex" style={{padding:'0px 20px 0px 20px'}} >
          <Row style={{marginBottom: '5px', fontWeight: 'bold'}}>
            {`${i18next.t('jobs-page-share-with-friens')}:`}
          </Row>
          <Row>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={iconSize}/>
            </FacebookShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={iconSize}/>
            </LinkedinShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={iconSize}/>
            </WhatsappShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={iconSize}/>
            </TwitterShareButton>
            <EmailShareButton url={window.location.href}>
              <EmailIcon size={iconSize}/>
            </EmailShareButton>            
          </Row>

        </div>
      </div>
    );
  }
}

export default JobResultInfoJob;