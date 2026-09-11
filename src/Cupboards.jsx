import React from 'react';
import {Html} from '@react-three/drei';
import {dimensions,wallSpan} from './design';
import {useHover} from './useHover';
import {wallTransform} from './Construction';

const B=({p=[0,0,0],s=[1,1,1],c='#fff',rotation,...rest})=><mesh position={p} rotation={rotation} castShadow receiveShadow {...rest}><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={.75}/></mesh>;

function SlideDoors({width,height,depth,open,color,handleColor}){
  const half=width/2-.01,travel=(open/100)*half*.92;
  return [[-1,-half/2-travel],[1,half/2+travel]].map(([side,cx],i)=><group key={i} position={[cx,0,depth/2-.005]}><B s={[half,height-.02,.02]} c={color}/><B p={[side*.06,0,.025]} s={[.03,.05,.03]} c={handleColor}/></group>);
}

function DeskSide({halfW,height,depth,open}){
  const y0=-height/2,deskAngle=-Math.min(open,92)*Math.PI/180,deskLen=Math.min(.72,depth-.14);
  return <group position={[-halfW/2,0,0]}>
    {Array.from({length:3},(_,i)=><B key={'s'+i} p={[0,-height/2+(i+1)*height/4,0]} s={[halfW-.1,.02,depth-.08]} c="#d8cfa9"/>)}
    <group position={[0,y0+height*.58,-depth/2+.02]} rotation={[deskAngle,0,0]}>
      <B p={[0,deskLen/2-.02,deskLen/2]} s={[halfW-.12,.04,deskLen]} c="#c7b18c"/>
      <B p={[0,deskLen+.18,deskLen/2-.04]} s={[.02,.35,.02]} c="#8f8f88"/>
      <B p={[0,deskLen+.38,deskLen/2-.04]} s={[Math.min(halfW-.2,.5),.32,.03]} c="#2b2b2b"/>
      <B p={[0,deskLen+.02,deskLen/2-.1]} s={[.12,.05,.12]} c="#c9c9c9"/>
    </group>
    {open<8&&<group position={[0,y0+.35,depth/2-.12]} rotation={[0,0,.35]}><B s={[.3,.04,.3]} c="#6f756f"/><B p={[0,.16,0]} s={[.3,.04,.3]} c="#6f756f"/></group>}
  </group>;
}

function YogaSide({halfW,height,depth}){
  const y0=-height/2,x0=halfW/2;
  return <group position={[x0,0,0]}>
    {Array.from({length:3},(_,i)=><B key={'s'+i} p={[0,-height/2+(i+1)*height/4,0]} s={[halfW-.1,.02,depth-.08]} c="#d8cfa9"/>)}
    <B p={[0,height/2-.02,0]} s={[.008,.008,halfW-.15]} c="#c8bfb2"/>
    {[[-.14,.12,'#b8a882'],[0,.1,'#c4b896'],[.14,.08,'#a69778']].map(([x,y,col],i)=><group key={'chime'+i} position={[x,y0+height*y,depth/2-.06]}><B p={[0,.18,0]} s={[.008,.36,.008]} c={col}/><B p={[0,.38,0]} s={[.045,.012,.012]} c="#8a8070"/></group>)}
    {[[-.22,.55,.09,'#c9a227'],[0,.48,.11,'#b8922a'],[.22,.42,.08,'#d4af37']].map(([x,y,r,col],i)=><mesh key={'bowl'+i} position={[x,y0+height*y,depth/2-.1]} rotation={[-Math.PI/2,0,0]} castShadow><sphereGeometry args={[r,16,10,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color={col} metalness={.65} roughness={.25}/></mesh>)}
    {[[-.18,.28,'#628b87'],[0,.26,'#bd7858'],[.18,.28,'#628b87']].map(([x,z,col],i)=><mesh key={'mat'+i} position={[x,y0+.55,depth/2-z]} rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[.05,.05,Math.min(.38,depth-.14),10]}/><meshStandardMaterial color={col}/></mesh>)}
    {[[-.1,.72,.09,'#bd7858'],[.08,.68,.08,'#8f7f72'],[.2,.62,.1,'#628b87']].map(([x,y,r,col],i)=><mesh key={'bolster'+i} position={[x,y0+height*y,depth/2-.08]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[r,r,.15,10]}/><meshStandardMaterial color={col}/></mesh>)}
    {[[-.15,.88,.16,.04,.22,'#d8d0c4'],[.05,.88,.14,.04,.22,'#c8bfb2'],[.2,.86,.12,.04,.2,'#b9aea1']].map(([x,y,w,h,d,col],i)=><B key={'blanket'+i} p={[x,y0+height*y,depth/2-.12]} s={[w,h,d]} c={col}/>)}
    {[[-.05,.38,.08,.08,.08,'#c49a60'],[.12,.36,.1,.1,.1,'#b8894d']].map(([x,y,sx,sy,sz,col],i)=><B key={'block'+i} p={[x,y0+height*y,depth/2-.2]} s={[sx,sy,sz]} c={col}/>)}
  </group>;
}

function StudioContents({width,height,depth,open}){
  const half=width/2;
  return <group>
    <B p={[0,0,0]} s={[.02,height,.02]} c="#d0ccc0"/>
    <DeskSide halfW={half} height={height} depth={depth} open={open}/>
    <YogaSide halfW={half} height={height} depth={depth}/>
  </group>;
}

export default function Cupboards({v,select,patchCupboard}){
  const [hovered,hover]=useHover();
  const d=dimensions(v),cupboard=v.cupboards?.[0];
  if(!cupboard?.enabled)return null;
  const c=cupboard,span=wallSpan(v,c.wall),open=c.open||0;
  const toggle=()=>patchCupboard?.({open:open>5?0:88});
  return <group position={[v.x,0,v.setback+v.depth/2]}><group {...wallTransform(v,c.wall,d.wall+c.depth/2)} {...hover} onClick={e=>{e.stopPropagation();select('cupboard',c.id);toggle()}}><group position={[c.u+c.width/2-span/2,d.floorY+c.height/2,0]}>
    <B p={[0,0,-c.depth/2+.01]} s={[c.width,c.height,.02]} c="#e2ded3"/>
    <B p={[-c.width/2+.01,0,0]} s={[.02,c.height,c.depth]} c="#e2ded3"/>
    <B p={[c.width/2-.01,0,0]} s={[.02,c.height,c.depth]} c="#e2ded3"/>
    <B p={[0,c.height/2-.01,0]} s={[c.width,.02,c.depth]} c="#e2ded3"/>
    <StudioContents width={c.width} height={c.height} depth={c.depth} open={open}/>
    <SlideDoors width={c.width} height={c.height} depth={c.depth} open={open} color={c.color} handleColor={c.handleColor}/>
    {hovered&&<Html position={[0,c.height/2+.15,0]} center><span className="dimension">Storage cupboard · click to {open>5?'close':'open'}</span></Html>}
  </group></group></group>;
}
