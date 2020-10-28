import React from 'react';
import { SignUpContext } from './SignUpContext';

/**
 * SignUpContextProvider provides SignUp modal around the application
 */
export class SignUpContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinToday: false,
      visible: false,
      toggle: this.toggle,
      toggleJoinToday: this.toggleJoinToday
    };
  }

  toggle = () => {
    this.setState({
      visible:!this.state.visible,
      joinToday: false
    });
  };

  toggleJoinToday = () => {
    this.setState({
      visible:!this.state.visible,
      joinToday: true
    });
  };

  render() {
    // The entire state is passed to the provider
    return (
      <SignUpContext.Provider value={this.state}>
        {this.props.children}
      </SignUpContext.Provider>
    );
  }
}