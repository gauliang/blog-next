import { useEffect, useRef, useState } from "react"

export function PostContentToc({ toc }: any) {
    const container = useRef(null)
    const [currentId, setCurrentId] = useState('')

    const viewportHeight = globalThis.innerHeight
    const boundary = 50

    const clickHandler = (evt: any): void => {
        evt.preventDefault()
        const id = evt.target.attributes.href.value
        const target = document.querySelector(id)
        setCurrentId(id)
        if (target) {
            window.scrollTo({ top: target.offsetTop - 110, behavior: 'smooth' })
        }
    }

    const scrollHandler = (headings: any[]) => {
        // 计算 headings 位置
        const list = headings.map(item => {
            const post = item.getBoundingClientRect()
            return {
                id: item.attributes.id.value,
                top: post.top,
                height: post.height
            }
        })

        const elementsInViewport = list.filter(item => {
            return item.top > boundary && item.top < viewportHeight
        })

        if (elementsInViewport.length) {
            setCurrentId(`#${elementsInViewport[0].id}`)
        } else {
            const target = list.filter(item => item.top < boundary).pop()
            target && setCurrentId(`#${target.id}`)
        }
    }

    useEffect(function () {
        let timer: any = null;
        const node = container.current as any;
        const links = node.querySelectorAll('a')
        const headings = Array.from(links).map((link: any) => {
            return document.querySelector(link.attributes.href.value)
        })

        const debouncScrollHandler = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                scrollHandler(headings)
            }, 150);
        }

        debouncScrollHandler()
        window.addEventListener('scroll', debouncScrollHandler)
        
        return () => {            
            window.removeEventListener('scroll', debouncScrollHandler)
        }

    }, [toc])

    return <ul ref={container} className='TableOfContents text-gray-400 mt-5 text-sm'>
        {
            toc.map((item: any) => {
                return <li key={item.id} className='mb-3'>
                    <a href={'#' + item.id} onClick={clickHandler} className={`nav-link ${currentId === '#' + item.id ? 'active' : ''}`}>{item.value}</a>
                </li>
            })
        }
    </ul>
}