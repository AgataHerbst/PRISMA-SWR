import Link from "next/link";

export default function Navbar() {
    return <nav className="navbar">
        <ul>
            <Link href="/" className="link">Главная</Link>
            <Link href="/old" className="link">Перейти к таблице</Link>
            <Link href="/new" className="link">Новая страница</Link>
        </ul>
    </nav>
}