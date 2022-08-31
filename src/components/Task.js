import React from 'react'
import "./Task.scss"

const Task = ({ isCompleted, name, apiDeleteTask, id, apiUpdateTask }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputText, setInputText] = React.useState("")

  function handleSubmit(event) {
    event.preventDefault()
    apiUpdateTask(id, inputText, isCompleted)
    setInputText("")
    setIsEditing(false)
  }

  return (
    <div className='task-wrapper'>
      <div className='left-wrapper'>
        <button className='material-icons' 
          onClick={() => apiUpdateTask(id, name, !isCompleted)}>{isCompleted ? 
          "check_circle_outline" : "radio_button_unchecked"}
        </button>
        {isEditing === false ? <span className='name'>{name}</span> 
          : <input type="text" 
              autoFocus
              value={inputText}
              onChange={({target}) => setInputText(target.value)}
            />
        }
      </div>
      <div className='right-wrapper'>
        {isEditing && 
          <button onClick={(event) => handleSubmit(event)} 
          type='submit' className='material-icons'>done</button>
        }
        <button className='material-icons' 
          onClick={() => {setIsEditing(oldstate => !oldstate); setInputText(name)}}>
          {isEditing === false ? "edit" : "cancel"}</button>
        <button className='material-icons' 
          onClick={() => apiDeleteTask(id)}>delete_outline</button>
      </div>
    </div>
  )
}

export default Task