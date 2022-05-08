import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home () {

  return (
    <div>
      <Head>
        <title>tuiter</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          tuiter
        </h1>
        <nav className={styles.navbar}>
          <Link href='/timeline' >
            <a className={styles.link}>
              timeline
            </a>
          </Link>
        </nav>
      </main>
    </div>
  )
}