import styles from '../../styles/Timeline.module.css'
import Link from 'next/link'

export default function Timeline () {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                this is the timeline
            </h1>
            <nav className={styles.navbar}>
                <Link href='/'>
                    <a className={styles.link}>
                        home
                    </a>
                </Link>
            </nav>
        </main>
    )
}