import i18next from "i18next";

export const isInViewport = (element = null, offset = 0) => {
    if (!element) return false;
    const top = element.getBoundingClientRect().top;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
}


/**
 * changes months to years and translates it
 * @param {*} months 
 */
export function calculateYearsAndMonths(months){
    if(!months) return null;

    if(months < 12){
      return i18next.t('month',{month:months});
    }

    if((months % 12) ===0){
      return i18next.t('year',{year:Math.floor(months/12)});
    }

    return i18next.t('year',{year:Math.floor(months/12)}) + ' '+ i18next.t('month',{month:months %12});
}