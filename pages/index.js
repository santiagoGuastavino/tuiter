import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from '../hooks/useUser'
import styles from '../styles/pages/Index.module.css'
import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { loginWithGitHub } from '../firebase/client'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub()
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Head>
        <title>tuiter</title>
        <link rel="icon" href="/new.ico" />
      </Head>

      <header className={styles.header}>
        <img src='/tuiter.png' alt='logo' />
        <h1>tuiter</h1>
        <h2>Talk about development</h2>
        <h2>with developers</h2>
      </header>
      <div className={styles.user}>
        {
          user === USER_STATES.NOT_LOGGED &&
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faGithub} />
              Login with GitHub
            </Button>
        }
        { user === USER_STATES.NOT_KNOWN && <img src={'/spinner.gif'} alt={'spinner'} /> }
      </div>
    </>
  )
}
