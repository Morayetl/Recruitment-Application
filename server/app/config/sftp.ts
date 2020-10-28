import { pinoLogger } from "utils/pino-logger";
import { SFTP_BASE_PATH, SFTP_URL, SFTP_PASSWORD } from "utils/Constants";

let Client = require('ssh2-sftp-client');
let sftp = new Client();
const logger = pinoLogger;

sftp.connect({
  host: SFTP_URL,
  port: '22',
  username: 'sftpuser',
  password: SFTP_PASSWORD
}).then(async () => {
  const homeFolder = await sftp.exists(SFTP_BASE_PATH);
  if(homeFolder){
    const privateFolder = await sftp.exists(SFTP_BASE_PATH + '/private');
    const publicFolder = await sftp.exists(SFTP_BASE_PATH + '/public');
    const receiptsFolder = await sftp.exists(SFTP_BASE_PATH + '/receipts');
    const mongoBackupFolder = await sftp.exists(SFTP_BASE_PATH + '/mongodb-backups');

    // create private folder if it doesn exist
    if(!privateFolder){
      sftp.mkdir(SFTP_BASE_PATH + '/private');
    }

    // create public folder if it doesn exist
    if(!publicFolder){
      sftp.mkdir(SFTP_BASE_PATH + '/public');
    }

    // create public folder if it doesn exist
    if(!receiptsFolder){
      sftp.mkdir(SFTP_BASE_PATH + '/receipts');
    }
    
    // create public folder if it doesn exist
    if(!mongoBackupFolder){
      sftp.mkdir(SFTP_BASE_PATH + '/mongodb-backups');
    }
  }
}).catch((err:any) => {
  // log sftp error
  logger.error(err);
});

export default sftp;
