import { useState } from 'react'
import './categories.styles.css'
import Category from '../../types/category.types'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  return (
    <div className='categories-container'>
      <div className='categories-content'></div>
    </div>
  )
}

export default Categories
