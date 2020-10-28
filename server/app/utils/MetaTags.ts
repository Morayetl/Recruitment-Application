import {COMPANY_NAME} from './Constants';
const striptags = require('striptags');

export function generateMetaTags(title, url, fullUrl, description){
    const seoTitle = title ? `${COMPANY_NAME} - ${title}` : COMPANY_NAME;
    const length = 90;
    let trimmedDescription = description && description.length > length ? description.substring(0, length - 3) + "..." : description;
    trimmedDescription = description ? striptags(trimmedDescription) : 'Find a new job today.';
    return `
        <html>
            <head>
                <meta charset="utf-8">
                <title>${title || COMPANY_NAME}</title>
                <meta name="title" content="${title || COMPANY_NAME}">
                <meta name="description" content="${trimmedDescription}">

                <meta property="og:type" content="website">
                <meta property="og:title" content="${seoTitle}"/>
                <meta property="og:image" itemprop="image" content="http://${url + '/logo/logo.png'}"/>
                <meta property="og:image:secure" itemprop="image" content="https://${url + '/logo/logo.png'}"/>
                <meta property="og:description" content="${trimmedDescription}"/>
                <meta property="og:url" content="${fullUrl}" />
      
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:site" content="${fullUrl}" />
                <meta name="twitter:title" content="${seoTitle}"/>
                <meta name="twitter:description" content="${trimmedDescription}"/>
                <meta name="twitter:image" content="http://${url + '/logo/logo.png'}" /> 
            </head>
            <body>
            </body>
        </html>
    `
}