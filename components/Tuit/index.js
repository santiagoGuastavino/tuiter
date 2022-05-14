import styles from '../../styles/Components/Tuit.module.css'
import Avatar from '../Avatar'

export default function Tuit ({ avatar, username, message, id }) {
  return (
    <article className={styles.article}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section className={styles.section}>
        <strong>{username}</strong>
        <p>{message}</p>
      </section>
    </article>
  )
}
