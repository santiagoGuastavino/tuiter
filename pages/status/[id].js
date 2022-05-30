import Head from 'next/head'
import Tuit from '../../components/Tuit'
import { firestore } from '../../firebase/admin'
import { useRouter } from 'next/router'

export default function TuitPage (props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  return (
    <>
      <Head>
        <title>dynamic / tuiter</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Tuit {...props} />
    </>
  )
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps (context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('tuits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      return {
        props: {
          ...data,
          id,
          createdAt: +createdAt.toDate()
        }
      }
    })
    .catch(err => console.log(err))
}
