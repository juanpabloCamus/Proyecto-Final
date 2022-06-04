import styles from './adminFilterBar.module.css'


export const AdminFilterBar = () => {


  return (
    <div>
        <div className={styles.searchbar_container}>
            <input type="text" placeholder='Search...'/>
        </div>
    </div>
  )
}
