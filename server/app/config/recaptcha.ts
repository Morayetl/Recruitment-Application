import { RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY } from "utils/Constants";

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(RECAPTCHA_SITE_KEY,RECAPTCHA_SECRET_KEY);

export default recaptcha;