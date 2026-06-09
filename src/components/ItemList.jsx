import Item from './Item'

function ItemList({ items, onEdit, onDelete, onToggleConfirm }) {
  if (items.length === 0) return <p>Пока ничего не добавлено.</p>
  
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleConfirm={onToggleConfirm}
        />
      ))}
    </ul>
  )
}

export default ItemList