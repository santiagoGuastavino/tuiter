import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import Button from '../components/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {loginWithGitHub} from '../firebase/client'

export default function Home () {
  
  const handleClick = () => {
    loginWithGitHub()
      .then(user => console.log(user))
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
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faGithub} />
              Login with GitHub
            </Button>
          </div>
        </section>
      </Layout>
    </>
  )
}