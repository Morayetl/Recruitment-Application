import { Response, Request } from "express";
import connection from "../config/mysql";
import _ from 'lodash';
import mysql from 'mysql';
import { resolve } from "url";

/**
 * Add additional properties on nodes
 * @param node 
 * @param selectOnlyLeafs is used for treeselect to disable selection if its not a leaf
 */
function addPropsOnCategoryThree(node: any, selectOnlyLeafs: boolean = false){
    if (node.children) {
        node.isLeaf = false;
        node.selectable = selectOnlyLeafs ? false : true;
        for (const child in node.children) {
            addPropsOnCategoryThree(node.children[child], selectOnlyLeafs);
        }
    } else {
        node.isLeaf = true;
    }
}
export async function getAllJobCategories(req: Request, res: Response) {
    const language = req.query.language;
    const selectOnlyLeafs = req.query.selectOnlyLeafs;

    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query("SELECT fi, en , categoryId as value FROM A.categories",
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    const arrayToTree = require('array-to-tree');
                    const resultsWithParent = results.map((val:any, index: number) =>{
                        let parent = null;
                        let splittedCategory: Array<any> = val.value.split('/');
                        let title = val[language];
                        title = title[0].toUpperCase()  + title.slice(1);
                        if(splittedCategory.length > 1){
                            splittedCategory.pop();
                            parent = splittedCategory.join('/');
                        }
                        return {
                            ...val,
                            key: val.value.replace('/','-'),
                            parent: parent,
                            title: title
                        }
                    });

                    let data = arrayToTree(resultsWithParent,{
                        parentProperty: 'parent',
                        customID: 'value'
                    })

                    data.map((value:any) => addPropsOnCategoryThree(value, selectOnlyLeafs));
                    
                    res.set({ 'Content-type': 'application/json; charset=utf-8' });
                    res.send(data);
                    resolve();
                }else{
                    reject(new Error('couldnt find categories'));
                }
            });
        })
    }catch(e){
        req['log'].error([e, 'CATEGORIES_MODEL_GET_ALL_CATEGORIES']);
        res.sendStatus(500);
    }

}

export async function getJobSubCategoryById(req: Request, res: Response) {
    const categoryId = req.body.id;
    const query = mysql.escape('^' + categoryId + '\/[1-9][0-9]*$');


    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query("SELECT fi, en , category.categoryId as id, (SELECT CASE WHEN COUNT(*) > 0 THEN false ELSE true END FROM A.categories where categoryId like concat(category.categoryId,'/%')) as isLeaf from A.categories as category where categoryId regexp " + query,
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    res.send(results);
                }
                resolve();
            });
        })
    }catch(e){
        req['log'].error([e, 'CATEGORIES_MODEL_GET_JOB_SUB_CATEGORY_BY_ID']);
        res.sendStatus(500);
    }
}

export async function getLeafJobCategorys(req: Request, res: Response) {
    const categoryId = req.body.id;
    const query = mysql.escape('^' + categoryId + '\/[1-9][0-9]*$');

    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query("SELECT  id, isLeaf from (SELECT category.categoryId as id, (SELECT CASE WHEN COUNT(*) > 0 THEN false ELSE true END FROM A.categories where categoryId like concat(category.categoryId,'/%')) as isLeaf from A.categories as category) leafCategoryId where isLeaf=1",
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    res.send(results);
                }
                resolve();
            });
        })
    }catch(e){
        req['log'].error([e, 'CATEGORIES_MODEL_GET_LEAF_JOB_CATEGORYS']);
        res.sendStatus(500);
    }

}

/**
 * Get a single categories name by (categoryId) code
 * @param req 
 * @param res 
 */
export async function getJobCategoryById(req: Request, res: Response) {
    const categoryId = req.query.id;

    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query("SELECT  * FROM A.categories where categoryId=?",
            [categoryId],
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);

                if (results && results[0]) {
                    res.send({
                        ...results[0],
                        en: results[0].en ? results[0].en[0].toUpperCase()  + results[0].en.slice(1) : '',
                        fi: results[0].fi ? results[0].fi[0].toUpperCase()  + results[0].fi.slice(1) : ''
                    });
                }else{
                    res.send({});
                }
                resolve();
            });
        });

    }catch(e){
        req['log'].error([e, 'CATEGORIES_MODEL_GET_JOB_CATEGORY_BY_ID']);
        res.sendStatus(500);
    }

}