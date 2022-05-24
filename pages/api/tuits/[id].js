import { firestore } from '../../../firebase/admin'

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('tuits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      return res.status(200).json(data)
    })
    .catch(() => {
      res.status(404).end()
    })
}
