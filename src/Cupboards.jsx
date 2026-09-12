import React from 'react';
import {Html,Line} from '@react-three/drei';
import {dimensions,wallSpan} from './design';
import {useHover} from './useHover';
import {wallTransform} from './Construction';

const B=({p=[0,0,0],s=[1,1,1],c='#fff',rotation,...rest})=><mesh position={p} rotation={rotation} castShadow receiveShadow {...rest}><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={.75}/></mesh>;

function DoorHandle({style,color,side}){return style==='knob'?<mesh position={[side*.08,0,.035]}><sphereGeometry args={[.035,14,10]}/><meshStandardMaterial color={color} metalness={.55} roughness={.25}/></mesh>:style==='recessed'?<group position={[side*.08,0,.033]}><B s={[.075,.22,.012]} c={color}/><B p={[0,0,.01]} s={[.045,.16,.014]} c="#353a36"/></group>:<B p={[side*.08,0,.027]} s={[.035,.32,.025]} c={color}/>}

function SlideDoors({width,height,depth,openDoor,color,handleColor,doorStyle='solid',handleStyle='bar'}){
  const panel=width/2-.018;
  const doors=[
    {id:'left',x:openDoor==='left'?width/4-.018:-width/4,z:depth/2+.018,handle:.08},
    {id:'right',x:openDoor==='right'?-width/4+.018:width/4,z:depth/2-.012,handle:-.08}
  ];
  return <group>
    <B p={[0,height/2-.025,depth/2]} s={[width,.045,.07]} c="#b9b8ae"/>
    <B p={[0,-height/2+.025,depth/2]} s={[width,.045,.07]} c="#b9b8ae"/>
    {doors.map(door=><group key={door.id} position={[door.x,0,door.z]}>
      <B s={[panel,height-.08,.028]} c={color}/>
      {doorStyle==='slatted'&&Array.from({length:12},(_,i)=><B key={i} p={[-panel/2+(i+.5)*panel/12,0,.019]} s={[.018,height-.13,.012]} c="#9a8161"/>)}
      {doorStyle==='framed'&&<>{[-1,1].map(y=><B key={y} p={[0,y*(height/2-.12),.019]} s={[panel-.1,.065,.012]} c="#d5d2c7"/>)}{[-1,1].map(x=><B key={x} p={[x*(panel/2-.07),0,.019]} s={[.065,height-.12,.012]} c="#d5d2c7"/>)}</>}
      <DoorHandle style={handleStyle} color={handleColor} side={Math.sign(door.handle)}/>
    </group>)}
  </group>;
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

function BayContents({purpose,width,height,depth,open}){
  const back=depth/2-.06;
  if(purpose==='desk')return <group><B p={[0,.1,-depth/2+.05]} s={[width-.1,.04,Math.min(.52,depth-.12)]} c="#c7b18c"/>{open&&<><B p={[0,.5,back]} s={[Math.min(width-.12,.55),.34,.025]} c="#202424"/><B p={[0,.28,back]} s={[.1,.08,.08]} c="#aeb2ae"/></>}</group>;
  if(purpose==='media')return <group><B p={[0,.25,back]} s={[Math.max(.25,width-.12),Math.min(.62,height*.48),.035]} c="#171b1c"/><B p={[0,.25,back+.025]} s={[Math.max(.2,width-.19),Math.min(.54,height*.4),.01]} c="#34464d"/><B p={[0,-.18,back]} s={[.12,.035,.08]} c="#777d79"/></group>;
  if(purpose==='audio')return <group>{[-.28,0,.28].map((y,i)=><group key={y} position={[0,y,back]}><B s={[width-.14,.15,.18]} c={i===1?'#343a3d':'#202426'}/>{Array.from({length:5},(_,k)=><B key={k} p={[-width*.25+k*width*.12,0,.1]} s={[.025,.025,.01]} c={k===4?'#8aa765':'#8b9292'}/>)}</group>)}</group>;
  if(purpose==='yoga')return <group>{[-.25,-.08,.09,.26].map((x,i)=><mesh key={x} position={[x*Math.min(1,width*1.5),-.25,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.055,.055,Math.min(.48,depth-.1),12]}/><meshStandardMaterial color={i%2?'#bd7858':'#628b87'}/></mesh>)}{[-.2,0,.2].map((y,i)=><B key={y} p={[0,.35+y,back]} s={[width-.13,.09,.22]} c={i%2?'#c8bfb2':'#d8d0c4'}/>)}</group>;
  if(purpose==='props')return <group>{[-.23,0,.23].map((x,i)=><mesh key={x} position={[x*Math.min(1,width*1.3),-.2,back]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.09,.09,.2,12]}/><meshStandardMaterial color={i%2?'#8f7f72':'#bd7858'}/></mesh>)}{[-.18,.06,.3].map((y,i)=><B key={y} p={[0,y,back]} s={[width-.14,.1,.16]} c={i%2?'#c49a60':'#9f835f'}/>)}</group>;
  if(purpose==='utility')return <group><B p={[-width*.18,-.22,back]} s={[width*.28,.42,.22]} c="#9aa49a"/><B p={[width*.18,-.25,back]} s={[width*.28,.36,.22]} c="#d8d6cd"/><B p={[0,.25,back]} s={[width-.15,.3,.12]} c="#eef0e8"/></group>;
  return <>{[-.3,0,.3].map(y=><B key={y} p={[0,y,0]} s={[width-.08,.02,depth-.08]} c="#d8cfa9"/>)}</>;
}

function StudioContents({c,openDoor}){
  const sections=c.sections?.length?c.sections:[{id:'desk',purpose:'desk'},{id:'yoga',purpose:'yoga'}],bayW=c.width/sections.length;
  return <group>
    {sections.slice(1).map((section,i)=><B key={section.id} p={[-c.width/2+(i+1)*bayW,0,0]} s={[.025,c.height,c.depth-.03]} c={c.interiorColor||'#d0ccc0'}/>)}
    {sections.map((section,i)=>{const x=-c.width/2+(i+.5)*bayW,exposed=openDoor==='left'?x<0:openDoor==='right'?x>=0:false;return <group key={section.id} position={[x,0,0]}><BayContents purpose={section.purpose} width={bayW} height={c.height} depth={c.depth} open={exposed}/></group>})}
  </group>;
}

function CupboardDimensions({width,height,depth}){
  const line='#567247',tick=.08;
  return <group>
    <Line points={[[-width/2,-height/2-.16,depth/2+.12],[width/2,-height/2-.16,depth/2+.12]]} color={line}/>
    {[-width/2,width/2].map(x=><Line key={'w'+x} points={[[x,-height/2-.16-tick,depth/2+.12],[x,-height/2-.16+tick,depth/2+.12]]} color={line}/>)}
    <Html position={[0,-height/2-.16,depth/2+.12]} center><span className="dimension">{Math.round(width*100)} cm</span></Html>
    <Line points={[[width/2+.16,-height/2,depth/2+.12],[width/2+.16,height/2,depth/2+.12]]} color={line}/>
    <Html position={[width/2+.16,0,depth/2+.12]} center><span className="dimension">{Math.round(height*100)} cm</span></Html>
    <Line points={[[width/2+.16,-height/2-.05,-depth/2],[width/2+.16,-height/2-.05,depth/2]]} color={line}/>
    <Html position={[width/2+.16,-height/2-.05,0]} center><span className="dimension">{Math.round(depth*100)} cm</span></Html>
  </group>;
}

export default function Cupboards({v,select}){
  const [hovered,hover]=useHover();
  const d=dimensions(v),cupboard=v.cupboards?.[0];
  if(!cupboard?.enabled)return null;
  const c=cupboard,span=wallSpan(v,c.wall),openDoor=c.openDoor||'none';
  return <group position={[v.x,0,v.setback+v.depth/2]}><group {...wallTransform(v,c.wall,d.wall+c.depth/2)} {...hover} onClick={e=>{e.stopPropagation();select('cupboard',c.id)}}><group position={[c.u+c.width/2-span/2,d.floorY+c.height/2,0]} rotation={[0,Math.PI,0]}>
    <B p={[0,0,-c.depth/2+.01]} s={[c.width,c.height,.02]} c={c.interiorColor||'#e2ded3'}/>
    <B p={[-c.width/2+.01,0,0]} s={[.02,c.height,c.depth]} c={c.interiorColor||'#e2ded3'}/>
    <B p={[c.width/2-.01,0,0]} s={[.02,c.height,c.depth]} c={c.interiorColor||'#e2ded3'}/>
    <B p={[0,c.height/2-.01,0]} s={[c.width,.02,c.depth]} c={c.interiorColor||'#e2ded3'}/>
    <StudioContents c={c} openDoor={openDoor}/>
    <SlideDoors width={c.width} height={c.height} depth={c.depth} openDoor={openDoor} color={c.finish==='oak'?'#b69a73':c.finish==='walnut'?'#70523e':c.color} handleColor={c.handleColor} doorStyle={c.doorStyle} handleStyle={c.handleStyle}/>
    {v.showDimensions&&<CupboardDimensions width={c.width} height={c.height} depth={c.depth}/>}
    {hovered&&<Html position={[0,c.height/2+.15,0]} center><span className="dimension">Storage cupboard · tap to inspect</span></Html>}
  </group></group></group>;
}
