import styles from '../../styles/Avatar.module.css'

export default function Avatar ({ alt, src, text }) {
  return (
    <div className={styles.container}>
        <img className={styles.avatar} alt={alt} src={src} />
        { text && <strong>{text}</strong> }
    </div>
  )
}
