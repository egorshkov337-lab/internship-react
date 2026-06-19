import { useSelector } from 'react-redux'
import Item from './Item'

function ItemList() {
  const items = useSelector(state => state.todos.items)

  if (items.length === 0) return <p>Нет задач.</p>

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default ItemList