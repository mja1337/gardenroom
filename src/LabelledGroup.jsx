import React from 'react';
import {useHover} from './useHover';

export default function LabelledGroup({onClick,label,children}){
  const [hovered,hover]=useHover();
  return <group {...hover} onClick={onClick}>{children}{hovered&&label}</group>;
}
