import React from 'react';
import './SearchJobType.css';
import { Checkbox } from 'antd';
import axios from '../../../Utils/axios';
import { Select } from 'antd';
import { getJobTypeOptions } from '../../../Utils/codeset';

const { Option } = Select;


class SearchJobType extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      
    };
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount() {
    getJobTypeOptions()
    .then((options) => {
      this.setState({options: options});
    });
  }
  
  onChange(checkedValues) {
    this.props.onChange(checkedValues.map(Number));
  }

  getOptions(){
    return this.state.options.map((value,index) =>{
      return <Option value={value.value} key={value.value}>{value.label}</Option>
    })
  }

  render() {
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={this.props.defaultValue}
        onChange={this.onChange}
      >
        {this.getOptions()}
      </Select>
    );
  }
}

export default SearchJobType;
