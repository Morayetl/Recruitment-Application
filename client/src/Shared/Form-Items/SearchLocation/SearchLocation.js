import React from 'react';
import './SearchLocation.css';
import { AutoComplete, Input } from 'antd';
import axios from '../../../Utils/axios';
import { getLocationById } from '../../../Utils/location';
import i18next from 'i18next';
import PropTypes from 'prop-types';

const { Option, OptGroup } = AutoComplete;
let timer = null;

class SearchLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      defaultValue: ''
    };
    this.onSelect = this.onSelect.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.value !== prevState.value ){
      const value = this.state.value;
      getLocationById(value).then(location => {
        this.setState({ defaultValue: location});
      });
    }
  }

  componentDidMount(){
    if(this.state.value){
      const value = this.state.value.key || this.state.value;
      getLocationById(value).then(location => {
        this.setState({ defaultValue: location})
      });
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps || 'default' in nextProps) {
      return {
        value: nextProps.value || nextProps.default || null
      };
    }
    return null;
  }

  handleSearch = value => {
    if(timer) {
      clearTimeout(timer); 
    }

    timer = setTimeout(() => { // return the timeoutID
      if (!value) {
        this.setState({ result: [] });
      } else {
        axios.get('/country',{params: {query: value, option: this.props.option}})
        .then((res) => {
          this.setState({ result: res.data });
          timer = null;
        });      
      }    
    }, 300);    
  };

  renderTitle(title, key) {
    return (
      <span>
        {i18next.t(title)}
      </span>
    );
  }

  onSelect(selectedValue, option) {
    for(let i = 0; i < this.state.result.length; i++){
      for(let j = 0; j < this.state.result[i].group.length; j++){
        const group = this.state.result[i].group[j];
        if(group.value === selectedValue){
            const value = option.key;
            this.props.onChange(value);
            this.setState({value: value.key})
          return;
        }
      }
    }
  }

  triggerChange(changedValue) {
    if(!changedValue) {
      this.props.onChange(null);
    }
  }

  render() {
    //const children = this.state.result.map(email => <Option key={email}>{email}</Option>);

    const children = this.state.result.map((group, index) => (
      <OptGroup key={index} label={this.renderTitle(group.key, index)}>
        {
          group.group.map((opt, index) => (
          <Option key={ opt.type + '/' + opt.id} value={opt.value}>
            {opt.value}
          </Option>
        ))}
      </OptGroup>
    ));

    return (
      <AutoComplete 
        allowClear
        className="certain-category-search"
        defaultValue={this.state.defaultValue}
        key={this.state.defaultValue}
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dataSource={children} 
        onSearch={this.handleSearch}
        onSelect={this.onSelect} 
        onChange={this.triggerChange}
        size={this.props.size ? this.props.size : "default"}
        placeholder= {this.props.children ? '' : i18next.t('search-location-placeholder')}
        style={{
          width: '100%',
          height: '100%',
          ...this.props.style
        }}
        >
          { this.props.children || <Input/> }
      </AutoComplete>          
    );
  }
}

SearchLocation.propTypes = {
  option: PropTypes.oneOf(['state', 'country', 'city'])
};

export default SearchLocation;
