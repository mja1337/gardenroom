import {useState} from 'react';

export function useHover(){
  const [hovered,setHovered]=useState(false);
  return [hovered,{
    onPointerOver:e=>{e.stopPropagation();setHovered(true);},
    onPointerOut:e=>{e.stopPropagation();setHovered(false);},
  }];
}
