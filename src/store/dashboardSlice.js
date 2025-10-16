import { createSlice } from '@reduxjs/toolkit'
import initialData from '../data/dashboard.json'

const slice = createSlice({
  name: 'dashboard',
  initialState: initialData,
  reducers: {
    addWidget(state, action) {
      const { categoryId, widget } = action.payload
      const cat = state.categories.find(c=>c.id===categoryId)
      if(cat){
        cat.widgets.push(widget)
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload
      const cat = state.categories.find(c=>c.id===categoryId)
      if(cat){
        cat.widgets = cat.widgets.filter(w=>w.id!==widgetId)
      }
    },
    toggleWidgetInCategory(state, action) {
      // optional: could implement checking/unchecking widget across categories
    }
  }
})

export const { addWidget, removeWidget, toggleWidgetInCategory } = slice.actions
export default slice.reducer
