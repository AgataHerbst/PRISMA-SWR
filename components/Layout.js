import Navbar from '../components/Navbar.js';

export default function Layout({ children }) {
    return <>
        <Navbar />
        <main>{children}</main>
    </>
};