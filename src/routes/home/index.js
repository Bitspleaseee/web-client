import { Link } from 'preact-router'

const Home = () =>
    <div>
        <h1>Home</h1>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/user">Userpage</Link></li>
            <li><Link href="/content">Content</Link></li>
        </ul>
    </div>

export default Home;
