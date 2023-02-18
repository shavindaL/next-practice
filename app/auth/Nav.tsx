import Link from "next/link";
import Login from "./Login";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import Logged from "./Logged";
export default async function Nav() {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={'/'}>
                <h1 className="font-bold text-lg">Send It.</h1>
                <ul className="flex items-center gap-6">
                    {!session?.user && <Login />}
                    {session?.user && <h1>{session?.user?.name}</h1>}
                    {session?.user && <h1><Logged image={session.user?.image||"null"}/></h1>}
                </ul> 
            </Link>
        </nav>
    )
}