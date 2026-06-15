import { useState, useEffect } from 'react'
import { useTodo } from '../store/todoStore'

function ItemForm({ initialData, onCancel }) {
  const { addOrUpdate } = useTodo()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isConfirmed: false
  })

  useEffect(() => {
    if (initialData) setFormData(initialData)
    else setFormData({ title: '', description: '', date: '', isConfirmed: false })
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.date) {
      alert('Заполни обязательно title и date')
      return
    }
    addOrUpdate(formData)
    if (!initialData) setFormData({ title: '', description: '', date: '', isConfirmed: false })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h2>{initialData ? 'Редактирование' : 'Новая задача'}</h2>
      <input name="title" placeholder="Заголовок" value={formData.title} onChange={handleChange} required style={{ padding: '8px', fontSize: '14px' }} />
      <input name="description" placeholder="Описание" value={formData.description} onChange={handleChange} style={{ padding: '8px', fontSize: '14px' }} />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ padding: '8px', fontSize: '14px' }} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
        <input type="checkbox" name="isConfirmed" checked={formData.isConfirmed} onChange={handleChange} />
        Выполнено
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', flex: 1 }}>
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} style={{ padding: '10px', background: '#ccc', border: 'none', cursor: 'pointer', fontSize: '14px', flex: 1 }}>
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}

export default ItemForm