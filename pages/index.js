import Link from "next/link";
import { Button, Toolbar } from "@mui/material";

export default function Index() {
    return <nav>
           <Toolbar>
            <Link href="/old" className="link">
            <Button
            variant="contained"
             >Перейти к таблице</Button></Link></Toolbar>
            <Link href="/new" className="link">
            <Button
             variant="contained"
             >Новая страница</Button></Link>
           </nav>
}