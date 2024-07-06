import { useState } from "react";

const NewTodo = ()=>{
  const [item, setItem] = useState("");
  const [lists, setLists] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  const handleAdd =()=>{
    if(!item){
      alert("enter something")
    }else if(item && editIndex !== null){
      const updateLists = lists.map((ele, ind)=>(ind === editIndex ? item : ele))
      setLists(updateLists)
      setEditIndex(null);
      setItem("");
    }else{
      setLists([...lists, item])
      setItem("")
    }
  }
const handleDel =(index)=>{
  const updatedEle = lists.filter((elements, id)=>{
    return index !== id;
  })
  setLists(updatedEle);
}
const deleteAll = ()=>{
  setLists([])
}
const handleEdit = (index)=>{
  setItem(lists[index]);
    setEditIndex(index);
}
return(
  <>
    <h1>Todo <button onClick={deleteAll}>Clear all</button></h1>
    <input type="text" value={item} onChange={(e)=>setItem(e.target.value)}/>
    <button onClick={handleAdd}>{editIndex != null ? "Edit" : "Add"}</button>
   {
     lists.map((ele,index)=>{
       return(
        <div key={index}>
          <div>
            <span>{ele}</span>
            <button onClick={()=>handleEdit(index)}>Edit</button>
            <button onClick={()=>handleDel(index)}>Delete</button>
           </div>
        </div>
       )
     })
   }
  </>
)
}
export default NewTodo;
