import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=20'

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Ошибка загрузки')
  
  const data = await res.json()
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: `Задача от пользователя #${item.userId}`,
    date: '2026-01-01',
    isConfirmed: item.completed
  }))
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    editItem: null
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    toggleConfirm: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.isConfirmed = !item.isConfirmed
    },
    setEditItem: (state, action) => {
      state.editItem = action.payload
    },
    cancelEdit: (state) => {
      state.editItem = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { 
  addItem, 
  updateItem, 
  removeItem, 
  toggleConfirm, 
  setEditItem, 
  cancelEdit 
} = todoSlice.actions

export default todoSlice.reducer