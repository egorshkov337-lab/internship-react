import { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if (!res.ok) throw new Error('Не удалось загрузить задачи')
      const data = await res.json()
      
      const adapted = data.map(item => ({
        id: item.id,
        title: item.title,
        description: `Пользователь #${item.userId}`,
        date: '2026-01-01',
        isConfirmed: item.completed
      }))
      
      setItems(adapted)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addOrUpdate = (data) => {
    if (editingItem) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...data, id: editingItem.id } : item
      ))
      setEditingItem(null)
    } else {
      const newItem = { ...data, id: Date.now() }
      setItems(prev => [...prev, newItem])
    }
  }

  const remove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const toggleConfirm = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, isConfirmed: !item.isConfirmed } : item
    ))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <TodoContext.Provider value={{
      items,
      loading,
      error,
      editingItem,
      setEditingItem,
      addOrUpdate,
      remove,
      toggleConfirm
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo должен использоваться внутри TodoProvider')
  }
  return context
}