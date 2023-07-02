import Link from "next/link";

export default function Index() {
    return <nav>
        <ul>
            <Link href="/old" className="link"><button>Перейти к таблице</button></Link>
            <Link href="/new" className="link"><button>Новая страница</button></Link>
        </ul>
    </nav>
}