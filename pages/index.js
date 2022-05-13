import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/pages/Index.module.css'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { onFirebaseAuthStateChange, loginWithGitHub } from '../firebase/client'

export default function Home () {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onFirebaseAuthStateChange(setUser)
  }, [user])

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Head>
        <title>tuiter</title>
        <link rel="icon" href="/new.ico" />
      </Head>

      <Layout>
        <header className={styles.header}>
          <img src='/tuiter.png' alt='logo' />
          <h1>tuiter</h1>
          <h2>Talk about development</h2>
          <h2>with developers</h2>
        </header>
        <div className={styles.user}>
          {
            user === undefined &&
              <Button onClick={handleClick}>
                <FontAwesomeIcon icon={faGithub} />
                Login with GitHub
              </Button>
          }
          {
            user && user.avatar &&
              <Avatar
                alt={user.username}
                src={user.avatar}
                text={user.username}
              />
          }
        </div>
      </Layout>
    </>
  )
}
