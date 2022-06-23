import { useTheme } from 'next-themes'
import { Popover } from '@headlessui/react'
import { BsClockHistory, BsMoonStars, BsSun } from 'react-icons/bs'
import { useEffect } from 'react'

const cache: any = {
    theme: ''
}
export function ThemeSwitch() {

    const { theme, setTheme } = useTheme()
    console.log(theme);
    
    cache.theme = theme

    const solutions = [
        {
            name: 'Light',
            description: 'Create your own targeted content',
            href: '##',
            icon: BsSun,
        },
        {
            name: 'Dark',
            description: 'Dark',
            href: '##',
            icon: BsMoonStars,
        },
        {
            name: 'System',
            description: 'Keep track of your growth',
            href: '##',
            icon: BsClockHistory,
        }
    ]

    function setThemeHandler(theme: string) {
        cache.theme = theme.toLowerCase()

        if (cache.theme === 'system') {
            changeThemeColorMetaBySystem()
        } else {
            setThemeColorMeta(cache.theme === 'light' ? 'white' : '#1f2937')
        }

        setTheme(cache.theme)
    }

    function changeThemeColorMetaBySystem() {
        let dark = cache.theme === 'system' ? window.matchMedia("(prefers-color-scheme:dark)").matches : cache.theme === 'dark' ? true : false
        setThemeColorMeta(dark ? '#1f2937' : 'white')
    }

    function setThemeColorMeta(value: string) {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]')
        themeColorMeta?.setAttribute('content', value)
    }

    useEffect(function () {
        changeThemeColorMetaBySystem()
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeThemeColorMetaBySystem)
        return function () {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', changeThemeColorMetaBySystem)
        }
    }, [])

    return <Popover className="relative">
        <Popover.Button className=' flex h-10 flex-row items-center py-2 focus:outline-none text-inherit'>
            <span className='dark:hidden'><BsSun className='w-5 h-5' /> </span>
            <span className='hidden dark:inline'><BsMoonStars className='w-5 h-5' /></span>
        </Popover.Button>
        <Popover.Panel className="absolute w-46 -right-3 z-10 mt-2 bg-white text-slate-800 dark:text-slate-300 dark:bg-slate-700 rounded-md dark:rounded-md">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex flex-col space-y-2 py-2">
                    {solutions.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => { setThemeHandler(item.name) }}
                            className=" flex items-center font-medium px-6 py-2 space-x-4 duration-150 ease-in-out dark:hover:bg-slate-600 dark:hover:text-white hover:bg-slate-100 hover:text-blue-600 "
                        >
                            <item.icon aria-hidden="true" />
                            <span className='text-sm pr-3'>{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Popover.Panel>
    </Popover>
}
