import { Params } from "next/dist/server/router";
import Link from "next/link";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

export function Pagination({ pageSize, total, pageNumber }: Params) {

    const totalPage = Math.ceil(total / pageSize)

    const previousInner = <a className={`flex flex-row space-x-4 hover:text-blue-500 ${pageNumber < 2 ? 'pointer-events-none opacity-20' : ''}`}>
        <div className='mt-1'><BsArrowLeftSquare /></div>
        <div className='flex flex-col text-right'>
            <span>上一页</span>
            <span className='text-xs opacity-50'>Previous</span>
        </div>
    </a>

    const nextInner = <a className={`flex flex-row space-x-4 hover:text-blue-500 ${pageNumber >= totalPage ? 'pointer-events-none opacity-20' : ''}`}>
        <div className='flex flex-col text-left'>
            <span>下一页</span>
            <span className='text-xs opacity-50'>Next</span>
        </div>
        <div className='mt-1'><BsArrowRightSquare /></div>
    </a>

    const previous = pageNumber > 1 ? <Link href={{ pathname: `/posts/page/${+pageNumber - 1}` }}>{previousInner}</Link> : previousInner
    const next = pageNumber < totalPage ? <Link href={{ pathname: `/posts/page/${+pageNumber + 1}` }}>{nextInner}</Link> : nextInner

    return <nav className=" border-t dark:border-gray-700 mb-20 py-8 flex flex-row justify-between space-x-8 items-center">
        {previous}
        <div className='flex flex-col items-center space-y-2'>
            <div className='flex flex-row space-x-1 items-end border-b px-6 pb-1'>
                <span className='text-2xl leading-none'>{`${pageNumber}`}</span>
                <span className='text-xs'>/ {Math.ceil(total / pageSize)}</span>
            </div>
            <div className='text-xs opacity-50'>每页 {pageSize} 条，共 {total} 条</div>
        </div>
        {next}
    </nav>
}