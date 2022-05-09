import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import Button from '../components/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {
  loginWithGitHub,
  onFirebaseAuthStateChange
} from '../firebase/client'
import {useState, useEffect} from 'react'

export default function Home () {

  const [user, setUser] = useState(undefined)
  
  useEffect(() => {
    onFirebaseAuthStateChange(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Head>
        <title>tuiter</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Layout>
        <section className={styles.section}>
          <img src='/tuiter.png' alt='logo' />
          <h1>tuiter</h1>
          <h2>Talk about development</h2>
          <h2>with developers</h2>
          <div>
            {
              user === undefined &&
                <Button onClick={handleClick}>
                  <FontAwesomeIcon icon={faGithub} />
                  Login with GitHub
                </Button>
            }
            {
              user && user.avatar &&
                <div>
                  <img src={user.avatar} />
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                </div>
            }
          </div>
        </section>
      </Layout>
    </>
  )
}