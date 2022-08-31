import React from 'react'
import Task from './components/Task'

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [tasks, setTasks] = React.useState([])
  const [inputField, setInputField] = React.useState("")

  const API = "https://anacond-crud.glitch.me/"

  React.useEffect(() => {
    apiGetAllTask()
  }, [])

  async function apiGetAllTask() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(API)
      const data = await res.json()
      if (!res.ok) throw new Error("Something went wrong")
      setTasks(data)
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      setError("There was an error")
    }
  }

  function renderAllTask() {
    return tasks.map((item, index) => {
      return <Task 
        isCompleted={item.isCompleted}
        name={item.name}
        key={index}
        apiDeleteTask={apiDeleteTask}
        apiUpdateTask={apiUpdateTask}
        id={item.id}
      />
    })
  }

  async function apiCreateTask(input) {
    setLoading(true)
    setInputField("")
    setError("")
    try {
      const res = await fetch(API, {
        headers: { 'Content-type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
          name: input,
          isCompleted: false
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error("Something went wrong")
      setTasks(data)
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      setError("There was an error")
    }
  }

  async function apiDeleteTask(index) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(API + index, {
        headers: { 'Content-type': 'application/json' },
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error("Something went wrong")
      setTasks(data)
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      setError("There was an error")
    }
  }

  async function apiUpdateTask(id, name, isCompleted) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(API + id, {
        headers: { 'Content-type': 'application/json' },
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          isCompleted: isCompleted
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error("Something went wrong")
      setTasks(data)
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      setError("There was an error")
    }
  }

  return (
    <div className='app'>
      <h1>TODO</h1>
      <div className='form-wrapper'>
        <form onSubmit={(event) => {
          event.preventDefault()
          inputField && apiCreateTask(inputField)
        }}>
          <button
            className='material-icons'
            type='submit'>
              add_circle_outline
          </button>
          <input value={inputField} 
            placeholder="Create a new todo..."
            type="text" onChange={({target}) => setInputField(target.value)}>
          </input>
        </form>
      </div>
      <div className='all-task-wrapper'>{renderAllTask()}</div>
      <div className='page-state'>
        {error && <p>{error}</p>}
        {loading && <p>Loading</p>}
      </div>
    </div>
  )
}

export default App
