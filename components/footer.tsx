import Link from 'next/link';
import { ScriptProps } from 'next/script';
import { BLOG_LOGO } from '../lib/snippets';

export default function Footer(props: ScriptProps) {
    return (
        <footer className='border-t dark:border-gray-700'>
            <div className='container mx-auto py-16 opacity-50 hover:opacity-100 transition duration-500'>
                <div className='flex flex-row justify-center items-center space-x-5'>
                    <Link href={{ pathname: '/' }}>
                        <a className='flex justify-center text-blue-500 w-8 h-8'>
                            {BLOG_LOGO}
                        </a>
                    </Link>
                    <code className=' text-xs font-mono text-gray-500'>$ echo &#34;simple things scale.&#34; </code>
                </div>
            </div>
        </footer>
    )
}