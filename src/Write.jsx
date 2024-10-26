import { useState } from 'react'
import app from '../src/firebaseConfig'
import {getDatabase,ref,set,push} from "firebase/database"
function Write() {
    let [inputvalue1,setinputvalue1]= useState("");
    let [inputvalue2,setinputvalue2]= useState("");
    const savedata=async()=>{
        const db= getDatabase(app);
        const newdocref=push(ref(db,"data/user"));
        set(newdocref,{
            fruitname:inputvalue1,
            fruitcolor:inputvalue2
        }).then(()=>{
            alert("data saved")
        }).catch((err)=>{
            alert(err)
        })
    }
  return (
    <div>
        <input type="text" value={inputvalue1}
        onChange={(e)=>setinputvalue1(e.target.value)} />
        <input type="text" value={inputvalue2}
        onChange={(e)=>setinputvalue2(e.target.value)}  /><br/>
        <button onClick={savedata}>savedata</button>
    </div>
  )
}

export default Write