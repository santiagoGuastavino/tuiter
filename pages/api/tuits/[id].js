import { firestore } from '../../../firebase/admin'

export default (req, res) => {
  const { query } = req
  const { id } = query

  return new Promise(resolve => {
    firestore
      .collection('tuits')
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        res.status(200).json({
          ...data,
          id,
          createdAt: +createdAt.toDate()
        })
        resolve()
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end()
        resolve()
      })
  })
}
