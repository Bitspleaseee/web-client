import { Link } from 'preact-router'

const Home = () =>
  <div>
    <h1>Home</h1>
    <ul>
      <li><Link href='/'>Home</Link></li>
      <li><Link href='/login'>Login</Link></li>
      <li><Link href='/signup'>Signup</Link></li>
    </ul>
  </div>

export default Home
