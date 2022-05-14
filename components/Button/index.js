import styles from '../../styles/Components/Button.module.css'

export default function Button ({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
