import styles from '../../styles/Components/Tuit.module.css'
import Avatar from '../Avatar'
import useElapsed from '../../hooks/useElapsed'
import Link from 'next/link'

export default function Tuit ({ avatar, username, content, createdAt, id, img }) {
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
          <Link href={`/status/${id}`}>
            <a>
              <time className={styles.date}>{elapsed}</time>
            </a>
          </Link>
        </header>
        <p>{content}</p>
        {img && <img src={img} alt={img} />}
      </section>
    </article>
  )
}
