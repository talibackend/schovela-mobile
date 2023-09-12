import { CommonActions } from '@react-navigation/native-stack';
import React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}