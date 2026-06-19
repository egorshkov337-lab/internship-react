import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, setEditItem } from './store/todoSlice'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { items, status, error, editItem } = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#fff' }}>
        Загрузка данных...
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>
        Ошибка: {error}
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <h1>Todo List на Redux</h1>
        <ItemForm 
          initialData={editItem} 
          onCancel={() => dispatch(setEditItem(null))} 
        />
        <ItemList />
      </div>
    </div>
  )
}

export default App