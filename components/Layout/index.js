import styles from '../../styles/Components/Layout.module.css'

export default function Layout ({ children }) {
    return (
        <div className={styles.div}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}