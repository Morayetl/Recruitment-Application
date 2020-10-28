import React from 'react';
import './SearchCategory.css';
import { TreeSelect } from 'antd';
import { getCategories } from '../../../Utils/category';
import i18next from 'i18next';
const { SHOW_PARENT } = TreeSelect;

class SearchCategory extends React.Component {

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps || 'defaultValue' in nextProps) {
      return {
        value: nextProps.value || nextProps.defaultValue || null
      };
    }
    return null;
  }

  constructor(props){
    super(props);
    this.state = {
      value: props.category ? props.category : undefined,
      treeData: [],
    };
    
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    getCategories(this.props.selectOnlyLeafs)
    .then((data) => {
      this.setState({treeData: data});
    });
  }

  onChange = value => {
    this.setState({ value });
    this.props.onChange(value);      
  }

  /**
   * Filters categories by category name
   * @param {*} value text inserted to treeselect
   * @param {*} node 
   */
  onFilter(value, node){
    if(!node){
      return;
    }
    return node.props[i18next.languages[0]].includes(value);
  }

  render() {
    const { treeData } = this.state;
    return (
      <TreeSelect 
        treeCheckable={this.props.multiple || false}
        defaultValue={this.props.defaultValue}
        key={this.props.defaultValue}
        value={this.state.value}
        showCheckedStrategy={this.props.showCheckedStrategy || SHOW_PARENT}
        size={this.props.size ? this.props.size : 'default'}
        style={{ maxHeight: 400, width: '100%' }}
        allowClear
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={i18next.t('search-category-placeholder')}
        onChange={this.onChange}
        treeData={treeData}
        filterTreeNode={this.onFilter}
      />               
    );
  }
}

export default SearchCategory;
