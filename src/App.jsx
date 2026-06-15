import { TodoProvider, useTodo } from './store/todoStore'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  )
}

function TodoApp() {
  const { loading, error, editingItem, setEditingItem } = useTodo()

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Загрузка задач...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Ошибка: {error}</h2>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Управление задачами</h1>
      <ItemForm initialData={editingItem} onCancel={() => setEditingItem(null)} />
      <ItemList />
    </div>
  )
}

export default App