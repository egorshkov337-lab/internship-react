import { useDispatch } from 'react-redux'
import { removeItem, toggleConfirm, setEditItem } from '../store/todoSlice'

function Item({ item }) {
  const dispatch = useDispatch()

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: item.isConfirmed ? '1px solid green' : '1px solid #ddd',
    background: item.isConfirmed ? '#f0fff0' : '#fff',
    padding: '10px',
    marginBottom: '8px'
  }

  return (
    <li style={itemStyle}>
      <div>
        <strong>{item.title}</strong> — {item.date}
        <br />
        <span style={{ color: item.isConfirmed ? 'green' : 'red' }}>
          {item.isConfirmed ? 'Готово' : 'В работе'}
        </span>
      </div>
      <div>
        <button onClick={() => dispatch(toggleConfirm(item.id))}>Готово</button>
        <button onClick={() => dispatch(setEditItem(item))}>Редактировать</button>
        <button onClick={() => dispatch(removeItem(item.id))}>Удалить</button>
      </div>
    </li>
  )
}

export default Item