import styles from '../../styles/Pages/Home.module.css'
import { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import Layout from '../../components/Layout'
import Tuit from '../../components/Tuit'

export default function Home () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch('http://localhost:3000/api/statuses/home_timeline')
        .then(res => res.json())
        .then(setTimeline)
        .catch(err => console.log(err))
  }, [user])

  return (
    <Layout>
      <header className={styles.header}>
        <h2>Home</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(({ id, username, avatar, message }) => (
          <Tuit
            avatar={avatar}
            id={id}
            key={id}
            message={message}
            username={username}
          />
        ))}
      </section>
      <nav className={styles.nav}>

      </nav>
    </Layout>
  )
}
