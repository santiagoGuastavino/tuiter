import styles from '../../styles/Components/Tuit.module.css'
import Avatar from '../Avatar'
import useElapsed from '../../hooks/useElapsed'

export default function Tuit ({ avatar, username, content, createdAt, id }) {
  const elapsed = useElapsed(createdAt)

  return (
    <article className={styles.article}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section className={styles.section}>
        <header>
          <strong>{username}</strong>
          <span> · </span>
          <span className={styles.date}>{elapsed}</span>
        </header>
        <p>{content}</p>
      </section>
    </article>
  )
}
