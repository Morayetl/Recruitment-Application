import enGb from 'antd/lib/locale-provider/en_GB';
import fiFi from 'antd/lib/locale-provider/fi_FI';

export function getLanguageByLocalization(){
    const localization = window.navigator.userLanguage || window.navigator.language;
    const lang = localization ? localization.split('-')[0].toLowerCase() : '';
    return getLanguage(lang);
}


/**
 * Gets language code with 
 * @param {*} language language
 */
export function getLanguage(language = ''){
    let locale = enGb;
    let lang = '';
    switch(language.toLowerCase()){
        case 'en':
          locale = enGb
          lang = language;
          break;
        case 'fi': 
          locale = fiFi;
          lang = language;
          break;
        default:
          locale = enGb;
          lang = 'en';
    }

    return {locale, lang};
}