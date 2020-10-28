import { Job } from "../../interfaces/Job";
import { SingleProduct, Package } from "../../interfaces/Package";
import { Item, UserPackageTransaction, PurchasedItemDocument, PurchasedItem} from "interfaces/PurchasedItemSchema";
import { CODESET_PRODUCT_NAMES, VAT_PERCENTAGE } from "utils/Constants";

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
    style: 'decimal'
});

/**
 * For converting locale to float
 * @param stringNumber 
 */
const parseLocaleNumber = (stringNumber) => {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
    );
}

/**
 * calculate single product price and returns it in array
 * @param job job that will posted
 * @param prices current price of single post
 */
export const calculateSinglePrice = (data: { job:Job, showInFrontPage: boolean} , prices: SingleProduct) => {
    let total = 0;
    let items: Array<Item | any> = [];
    let totalVat = 0;
    let transaction: {items: Array<Item>, total: number, totalVat: number} = {total, items,totalVat};


    total += prices.price;
    items.push({itemId: CODESET_PRODUCT_NAMES.jobPost, price: prices.price});

    if(data.showInFrontPage){
        items.push({itemId: CODESET_PRODUCT_NAMES.frontPageAdvertisement, price: prices.frontPagePrice});
        total += prices.frontPagePrice;
    }

    if(data.job && data.job.showFeatured){
        items.push({itemId: CODESET_PRODUCT_NAMES.featuredAdvertisement, price: prices.featurePrice});
        total += prices.featurePrice;
    }
    
    transaction.totalVat = parseLocaleNumber(formatter.format(total * VAT_PERCENTAGE));
    transaction.total = parseLocaleNumber(formatter.format(total *(VAT_PERCENTAGE + 1)));
    transaction.items = items;

    return transaction;
}

/**
 * 
 * @param job job that will be posted
 * @param packageId the id of the package, that user has bought
 * @param prices current price of single post, which is used if user wants to add more features on top of the package
 */
export const calculatePackageBasedPrice = (data: { job:Job, showInFrontPage: boolean} , userPackage: PurchasedItem, prices: SingleProduct) => {
    let total = 0;
    let items: Array<Item | any> = [];
    let totalVat = 0;
    let transaction: {items: Array<Item>, total: number, totalVat: number} = {total, items, totalVat};
    
    if(userPackage && userPackage.remaining > 0 ){
        items.push({itemId: CODESET_PRODUCT_NAMES.jobPost, price: 0});
    }else{
        total += prices.price;
        items.push({itemId: CODESET_PRODUCT_NAMES.jobPost, price: prices.price});
    }

    if(data.showInFrontPage){
        items.push({itemId: CODESET_PRODUCT_NAMES.frontPageAdvertisement, price: prices.frontPagePrice});
        total += prices.frontPagePrice;
    }

    if(data.job && data.job.showFeatured){
        items.push({itemId: CODESET_PRODUCT_NAMES.featuredAdvertisement, price: prices.featurePrice});
        total += prices.featurePrice;
    }

    transaction.totalVat = parseLocaleNumber(formatter.format(total * VAT_PERCENTAGE));
    transaction.total = parseLocaleNumber(formatter.format(total *(VAT_PERCENTAGE + 1)));
    transaction.items = items;
    return transaction;
}