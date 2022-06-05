import styles from './adminFilterBar.module.css'


export const AdminFilterBar = () => {

const handleInputChange = ({target}) => {
    const value = target.value
    
}

  return (
    <div>
        <div className={styles.searchbar_container}>
            <input type="text"  onChange={handleInputChange} placeholder='Search...'/>
        </div>
    </div>
  )
}
