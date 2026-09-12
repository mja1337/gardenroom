import React from 'react';
import {Html} from '@react-three/drei';
import {dimensions} from './design';
import {useHover} from './useHover';

function Mat({m,s,select,moving}){
  const [hovered,hover]=useHover();
  return <group position={[m.x+m.w/2,0,m.z+m.l/2]} rotation={[0,m.rotation||0,0]} {...hover} onClick={e=>{e.stopPropagation();if(!moving)select('yoga',m.id)}}>
    <mesh receiveShadow>
      <boxGeometry args={[m.w,moving?.022:.015,m.l]}/>
      <meshStandardMaterial color={moving?'#d7a542':m.teacher?s.teacherColour:s.studentColour} emissive={moving?'#62420b':'#000000'} emissiveIntensity={moving?.22:0}/>
    </mesh>
    {s.participants&&<group rotation={[0,m.w>m.l?Math.PI/2:0,0]}><mesh position={[0,.7,0]} castShadow><capsuleGeometry args={[.13,.5,4,8]}/><meshStandardMaterial color={m.teacher?'#b86645':'#5d6976'}/></mesh><mesh position={[0,1.22,0]} castShadow><sphereGeometry args={[.11,12,8]}/><meshStandardMaterial color="#c49c7e"/></mesh>{[-1,1].map(a=><React.Fragment key={a}><mesh position={[a*.095,.25,0]}><capsuleGeometry args={[.055,.4,4,6]}/><meshStandardMaterial color="#535a61"/></mesh><mesh position={[a*.21,.75,0]}><capsuleGeometry args={[.04,.35,4,6]}/><meshStandardMaterial color="#c49c7e"/></mesh></React.Fragment>)}</group>}
    {(hovered||moving)&&<Html position={[0,.04,0]} center><span className="dimension">{moving?'Drag to position':`${m.teacher?'Leader · ':''}${m.name||m.id}`}</span></Html>}
  </group>;
}

export default function Yoga({v,select,movingMat,moveMat,finishMatMove}){
  const s=v.yoga;
  if(!s?.enabled)return null;
  const d=dimensions(v),iw=v.width-2*d.wall,il=v.depth-2*d.wall;
  const place=e=>{e.stopPropagation();moveMat?.(e.point.x-(v.x-v.width/2+d.wall),e.point.z-(v.setback+d.wall))};
  return <group position={[v.x-v.width/2+d.wall,d.floorY+.008+(v.roofView==='exploded'?1.2:0),v.setback+d.wall]}>
    {s.items.map(m=><Mat key={m.id} m={m} s={s} select={select} moving={movingMat===m.id}/>)}
    {movingMat&&<mesh position={[iw/2,d.clear+.1,il/2]} rotation={[-Math.PI/2,0,0]} onPointerDown={place} onPointerMove={e=>{if(e.buttons===1||e.pointerType==='touch')place(e)}} onPointerUp={place} onClick={e=>e.stopPropagation()} onPointerCancel={()=>finishMatMove?.()}>
      <planeGeometry args={[iw,il]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false}/>
    </mesh>}
  </group>;
}
