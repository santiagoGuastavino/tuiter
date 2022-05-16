import styles from '../../styles/Pages/Home.module.css'
import { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import Layout from '../../components/Layout'
import Tuit from '../../components/Tuit'
import { fetchLatestTuits } from '../../firebase/client'

export default function Home () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
    fetchLatestTuits()
      .then(setTimeline)
      .catch(err => console.log(err))
  }, [user])

  return (
    <Layout>
      <header className={styles.header}>
        <h2>Home</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ createdAt, id, username, avatar, content, userId }) => (
            <Tuit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              key={id}
              content={content}
              username={username}
              userId={userId}
            />
          )
        )}
      </section>
      <nav className={styles.nav}>

      </nav>
    </Layout>
  )
}
