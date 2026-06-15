import { useTodo } from '../store/todoStore'
import Item from './Item'

function ItemList() {
  const { items } = useTodo()
  
  if (items.length === 0) return <p>Задачи не найдены.</p>
  
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default ItemList