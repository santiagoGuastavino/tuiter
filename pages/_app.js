import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <div className='div'>
      <main className='main'>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
