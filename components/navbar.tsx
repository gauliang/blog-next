import Link from "next/link";
import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { BsChevronLeft } from "react-icons/bs";
import { BLOG_LOGO, } from "../lib/config";
import { ThemeSwitch } from "./theme-switch";

const links = [
    {
        title: '博客',
        pathname: '/posts',
        route: '/posts/[...id]'
    },
    {
        title: '标签',
        pathname: '/tags'
    },
    {
        title: '系列',
        pathname: '/series'
    },
    {
        title: '关于',
        pathname: '/about'
    }
]

export default function Navbar(props: ScriptProps) {

    const router = useRouter()
    const isPostDetailRoute = router.pathname == `/posts/[...id]`

    const defaultNav = <nav className={`md:sticky md:top-0 backdrop-blur md:from-transparent md:to-transparent md:bg-white/80 border-gray-200 border-b py-2 md:py-5  md:px-0 dark:bg-gray-800 dark:border-gray-700 z-10`}>
        <div className="md:container md:mx-auto flex flex-wrap flex-col md:flex-row justify-between">
            <div className={`${isPostDetailRoute ? 'hidden md:flex' : 'flex'} px-5 md:px-0 flex-row md:mx-5 justify-between text-[#0069ff] dark:text-white`}>
                <Link href={{ pathname: '/' }}>
                    <div className="flex flex-row cursor-pointer">
                        {BLOG_LOGO}
                        <span className="text-xl h-8 ml-2 my-1.5 font-semibold">Gauliang</span>
                    </div>
                </Link>
                <div className="md:hidden"><ThemeSwitch /></div>
            </div>
            <div className={`${isPostDetailRoute ? 'hidden' : 'md:hidden'} mt-2 border-b -mb-3 divide-gray-400 dark:border-gray-700`}></div>
            <div className={`${isPostDetailRoute ? 'hidden md:flex' : 'flex'}  items-center flex-col md:flex-row mt-5 md:mt-0`}>
                <ul className="flex flex-row justify-between space-x-2 md:space-x-6 ">
                    <li key={'首页'}>
                        <Link href={{ pathname: '/' }}>
                            <a className={`block py-2 pr-4 pl-3  font-semibold ${router.route === '/' ? 'text-blue-500' : ''}`}>首页</a>
                        </Link>
                    </li>
                    {
                        links.map(link => {
                            return <li key={link.title}><Link href={{ pathname: link.pathname }}>
                                <a className={`block py-2 pr-4 pl-3 font-semibold ${router.route.startsWith(link.pathname) ? 'text-blue-500 ' : ''}`}>{link.title}</a>
                            </Link></li>
                        })
                    }
                </ul>
                <ul className="flex-row space-x-6 border-l dark:border-slate-600 ml-6 pl-6 hidden md:flex">
                    <li>
                        <ThemeSwitch />
                    </li>
                    <li>
                        <a href="https://github.com/gauliang" target={'_blank'} rel="noreferrer" className="block py-1 ">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path></svg>
                        </a>
                    </li>
                </ul>
            </div>
            {isPostDetailRoute && <div className="flex px-4 justify-between items-center md:hidden">
                <Link href={{ pathname: '/' }}><BsChevronLeft className="w-5 h-5" /></Link>
                <ThemeSwitch />
            </div>}
        </div>
    </nav>

    return defaultNav
}