import './App.css';
import './index.css';
import {useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
    const fetchData=async()=>{
      const data=await fetchTasks()
      setTasks(data)
  }
  fetchData()
},[])
   
//Fetch Tasks

const fetchTasks=async()=>{
  const res=await fetch("http://localhost:5000/tasks")
  const data=await res.json()

  return data
}

//Fetch a task
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data= await res.json()

  return data
}
  const deleteTask=async(id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })

  setTasks(tasks.filter(task=>(task.id!==id)))
  // console.log('Delete'+id)
}
const toggleReminder=async(id)=>{
  const tasktotoggle=await fetchTask(id)
  const updatedtask={...tasktotoggle,reminder:!tasktotoggle.reminder}
  const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updatedtask) 
  })
  
  const data=await res.json()

  setTasks(tasks.map(task=>(task.id===id?{
    ...task,reminder:data.reminder
  }:task)))
}
const addTask=async(task)=>{
  const res=await fetch('http://localhost:5000/tasks',{
    method:"POST",
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })
  const data=await res.json()
  setTasks([...tasks,data])
  // const id=Math.floor(Math.random()*1000)+1;
  // const newTask={id,...task}
  // setTasks([...tasks,newTask])
}
const showAddTaskBox=()=>{
  setShowAddTask(!showAddTask)
}



  return (
    <Router>
      <div className="container">
      <Header title="Task Tracker" onAdd={showAddTaskBox} showAddTask={showAddTask}/>
      <Routes>
      <Route path="/" 
      exact 
      element={
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:'No tasks to show'}
        </>
      }
      />
      <Route exact path="/about" element={<About/>} />
      </Routes>
      
      <Footer/>
       </div>
    </Router>
    
  );
}

export default App;
