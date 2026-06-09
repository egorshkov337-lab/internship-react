import { useState } from 'react'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'

function App() {
  const [items, setItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)

  const handleAddOrUpdate = (data) => {
    if (editingItem) {
      setItems(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item))
      setEditingItem(null)
    } else {
      setItems(prev => [...prev, { ...data, id: Date.now() }])
    }
  }

  const handleEdit = (item) => setEditingItem(item)
  const handleDelete = (id) => setItems(prev => prev.filter(item => item.id !== id))
  const handleToggleConfirm = (id) => setItems(prev => prev.map(item => item.id === id ? { ...item, isConfirmed: !item.isConfirmed } : item))
  const handleCancelEdit = () => setEditingItem(null)

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', lineHeight: '1.5' }}>
      <h1 style={{ lineHeight: '1.2', marginBottom: '20px' }}>Управление объектами</h1>
      <ItemForm onSubmit={handleAddOrUpdate} initialData={editingItem} onCancel={handleCancelEdit} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} onToggleConfirm={handleToggleConfirm} />
    </div>
  )
}

export default App