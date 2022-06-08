import { useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './adminFilterBar.module.css'

export const AdminFilterBar = ({action}) => {

const [value, setValue] = useState("")
const dispatch = useDispatch()

const handleInputChange = ({target}) => {
    const value = target.value
    setValue(value)
    dispatch(action.filterByValue(value))
    
}

  return (
    <div className={styles.admin_filterbar}>
        <div className={styles.searchbar_container}>
            <input type="search"  value={value} onChange={handleInputChange} placeholder='Search...'/>
        </div>
    </div>
  )
}
