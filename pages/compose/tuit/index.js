import styles from '../../../styles/Pages/ComposeTuit.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useUser from '../../../hooks/useUser'
import Layout from '../../../components/Layout'
import Button from '../../../components/Button'
import { addTuit } from '../../../firebase/client'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTuit () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTuit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          placeholder="What's going on?"
          value={message}
          onChange={handleChange}
        ></textarea>
        <div>
          <Button disabled={isButtonDisabled}>tuit</Button>
        </div>
      </form>
    </Layout>
  )
}
