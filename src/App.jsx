import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isConfirmed: false
  })

  const [items, setItems] = useState([])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.date) {
      alert('Заполни обязательно title и date')
      return
    }

    setItems(prev => [...prev, { ...formData, id: Date.now() }])
    setFormData({ title: '', description: '', date: '', isConfirmed: false })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', lineHeight: '1.5' }}>
      <h1 style={{ lineHeight: '1.2', marginBottom: '20px' }}>Форма создания объектов</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: '8px', fontSize: '14px' }}
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px' }}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ padding: '8px', fontSize: '14px' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
          <input
            type="checkbox"
            name="isConfirmed"
            checked={formData.isConfirmed}
            onChange={handleChange}
          />
          isConfirmed
        </label>
        <button type="submit" style={{ padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          Добавить
        </button>
      </form>

      <h2 style={{ lineHeight: '1.2' }}>Список объектов</h2>
      {items.length === 0 && <p>Пока ничего не добавлено.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '8px', borderRadius: '6px' }}>
            <strong>{item.title}</strong> — {item.date}
            <br />
            <span>{item.isConfirmed ? 'Подтверждено' : 'Не подтверждено'}</span>
            <br />
            <small>{item.description}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App