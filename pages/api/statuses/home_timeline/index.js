const timeline = [
  {
    id: '0',
    avatar:
        'https://pbs.twimg.com/profile_images/1517492889852461056/bEnqsvVR_400x400.jpg',
    username: 'wongmjane',
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`
  },
  {
    id: '1',
    avatar:
        'https://pbs.twimg.com/profile_images/1513202553403625473/U5Sbr5q0_400x400.jpg',
    username: 'midudev',
    message: 'Wow, tuiter está funcionando y vivo POG',
    name: 'Miguel Ángel Durán'
  },
  {
    id: '2',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar:
        'https://pbs.twimg.com/profile_images/1339300169968459784/oQ7IkYMY_400x400.jpg',
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`
  }
]

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.send(JSON.stringify(timeline))
}
