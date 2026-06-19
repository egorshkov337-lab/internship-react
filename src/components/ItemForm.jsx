import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, updateItem, setEditItem } from '../store/todoSlice'

function ItemForm({ initialData, onCancel }) {
  const dispatch = useDispatch()
  const isEditing = !!initialData

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isConfirmed: false
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ title: '', description: '', date: '', isConfirmed: false })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.date) {
      alert('Заполни title и date')
      return
    }

    if (isEditing) {
      dispatch(updateItem(formData))
    } else {
      dispatch(addItem(formData))
      setFormData({ title: '', description: '', date: '', isConfirmed: false })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input 
        name="title" 
        placeholder="Title" 
        value={formData.title} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="description" 
        placeholder="Description" 
        value={formData.description} 
        onChange={handleChange} 
      />
      <input 
        type="date" 
        name="date" 
        value={formData.date} 
        onChange={handleChange} 
        required 
      />
      
      <div className="checkbox-wrapper">
        <input 
          type="checkbox" 
          name="isConfirmed" 
          id="isConfirmed"
          checked={formData.isConfirmed} 
          onChange={handleChange} 
        />
        <label htmlFor="isConfirmed" className="checkbox-label">
          Выполнено
        </label>
      </div>
      
      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {isEditing ? 'Сохранить' : 'Добавить'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}

export default ItemForm