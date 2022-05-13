import styles from '../../styles/Pages/Home.module.css'
import { useState, useEffect } from 'react'
import Avatar from '../../components/Avatar'
import Layout from '../../components/Layout'

export default function Home () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
      .catch(err => console.log(err))
  }, [])

  return (
        <Layout>
            <header className={styles.header}>
                <h2>Home</h2>
            </header>
            <section className={styles.section}>
              {timeline.length && timeline.map(tuit => {
                return (
                  <article key={tuit.id}>
                    <Avatar src={tuit.avatar} alt={tuit.username} />
                  </article>
                )
              })}
            </section>
            <nav className={styles.nav}>

            </nav>
        </Layout>
  )
}
