import styles from '../../styles/Tuit.module.css'
import Avatar from '../Avatar'
import useElapsed from '../../hooks/useElapsed'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Tuit ({ avatar, username, content, createdAt, id, img }) {
  const elapsed = useElapsed(createdAt)
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <article onClick={handleClick} className={styles.article}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section className={styles.section}>
        <header>
          <strong>{username}</strong>
          <span> · </span>
          <Link href={`/status/${id}`}>
            <a className={styles.anchor}>
              <time>{elapsed}</time>
            </a>
          </Link>
        </header>
        <p>{content}</p>
        {img && <img src={img} alt={img} />}
      </section>
    </article>
  )
}
