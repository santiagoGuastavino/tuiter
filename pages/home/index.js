import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import useUser from '../../hooks/useUser'
import Tuit from '../../components/Tuit'
import { fetchLatestTuits } from '../../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

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
    <>
      <Head>
        <title>home / tuiter</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <header className={styles.header}>
        <h2>Home</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ createdAt, id, img, username, avatar, content, userId }) => (
            <Tuit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              content={content}
              username={username}
              userId={userId}
            />
          )
        )}
      </section>
      <nav className={styles.nav}>
        <div>
          <Link href='/home'>
            <a><FontAwesomeIcon icon={faHouse} /></a>
          </Link>
        </div>
        <div>
          <Link href='/search'>
            <a><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          </Link>
        </div>
        <div>
          <Link href='/compose/tuit'>
            <a><FontAwesomeIcon icon={faPenToSquare} /></a>
          </Link>
        </div>
      </nav>
    </>
  )
}
