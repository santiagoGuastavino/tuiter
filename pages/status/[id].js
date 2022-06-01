import Head from 'next/head'
import Tuit from '../../components/Tuit'

// missing prop param
export default function TuitPage () {
  return (
    <>
      <Head>
        <title>dynamic / tuiter</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Tuit
      // {...props}
      />
    </>
  )
}

// export async function getServerSideProps (context) {
//   const { params, res } = context
//   const { id } = params

//   const response = await fetch()
//   try {
//     if (response.ok) {
//       const props = response.json()
//       return { props }
//     }
//     if (res) {
//       res.writeHead(404).end()
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }
