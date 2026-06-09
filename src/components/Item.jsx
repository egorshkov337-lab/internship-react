function Item({ item, onEdit, onDelete, onToggleConfirm }) {
  const isConfirmed = item.isConfirmed
  const itemStyle = {
    border: `1px solid ${isConfirmed ? '#4ade80' : '#ddd'}`,
    background: isConfirmed ? '#f0fdf4' : '#fff',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '6px'
  }

  return (
    <li style={itemStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <strong>{item.title}</strong> — {item.date}
          <br />
          <span style={{ color: isConfirmed ? '#166534' : '#991b1b' }}>
            {isConfirmed ? 'Подтверждено' : ' Не подтверждено'}
          </span>
          <br />
          <small>{item.description}</small>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          <button onClick={() => onToggleConfirm(item.id)} style={{ padding: '5px 8px', background: isConfirmed ? '#f59e0b' : '#22c55e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
            {isConfirmed ? 'Вернуть' : 'Готово'}
          </button>
          <button onClick={() => onEdit(item)} style={{ padding: '5px 8px', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
            Редактировать
          </button>
          <button onClick={() => onDelete(item.id)} style={{ padding: '5px 8px', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
            Удалить
          </button>
        </div>
      </div>
    </li>
  )
}

export default Item