import axios from "./axios";
import i18next from "i18next";

/**
 * Get all categories
 * @param selectOnlyLeafs is used for treeselect to disable selection if its not a leaf
 */
export const getCategories = function(selectOnlyLeafs) {
  const query = new URLSearchParams([['language',i18next.languages[0]], ['selectOnlyLeafs', selectOnlyLeafs || '']]);
  return axios.get('/category?'+ query.toString())
  .then((res) => {
    return res.data;
  });
}

/**
 * 
 * @param {*} category
 */
export const getNameCategorybyId = function(category) {
  const query = new URLSearchParams([['id',category]]);
  return axios.get('/category/single?'+ query.toString())
  .then((res) => {
    return res.data[i18next.languages[0]];
  });
}