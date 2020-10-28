import React from 'react';

export const SignUpContext = React.createContext({
    visible: false,
    joinToday: false,
    toggle: () => {},
    toggleJoinToday: () => {}
  });