import styles from '../../../styles/Pages/ComposeTuit.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useUser from '../../../hooks/useUser'
import Layout from '../../../components/Layout'
import Button from '../../../components/Button'
import { addTuit, getImgURL, uploadImage } from '../../../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTuit () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('on complete')
        getImgURL(task, setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

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

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const dynamicStyle = {
    border: drag === DRAG_IMAGE_STATES.DRAG_OVER
      ? '3px dashed #09f'
      : '3px dashed transparent'
  }

  return (
    <>
      <Head>
        <title>create a tuit / tuiter</title>
        <link rel="icon" href="/new.ico" />
      </Head>
      <Layout>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            placeholder="What's going on?"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={dynamicStyle}
          ></textarea>
          {imgURL &&
            <section className={styles.section} >
              <button className={styles.button} onClick={() => setImgURL(null)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <img src={imgURL} alt={imgURL} />
            </section>
          }
          <div>
            <Button disabled={isButtonDisabled}>tuit</Button>
          </div>
        </form>
      </Layout>
    </>
  )
}
