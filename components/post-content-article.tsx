
import { useEffect, useRef } from 'react'

export function PostContentArticle({ contentHtml }: any) {

    const container = useRef(null)

    const responsive = function (containers: any[], inner: string): () => void {

        if (containers.length == 0) return () => { }

        let _box: any, _boxWidth, _boxWidthMax, _boxLeftMax, _inner, _innerWidth, _timer: any, _timer2: any;

        const padding = 60
        const mouseoverHandler = (evt: any) => {
            _box = evt.currentTarget
            if (_timer) {
                clearTimeout(_timer);
                clearTimeout(_timer2);
                _timer = _timer2 = null
            }

            _timer = setTimeout(function () {
                _inner = _box.querySelector(inner);
                _boxWidth = _box.offsetWidth;
                _boxWidthMax = Math.floor((document as any).querySelector('.container').offsetWidth)
                _boxLeftMax = Math.floor(padding - _box.offsetLeft)
                _innerWidth = _inner.offsetWidth

                if (_box.offsetWidth >= _innerWidth + 60) {
                    return null;
                }

                const width = _innerWidth + padding > _boxWidthMax ? _boxWidthMax : _innerWidth + padding
                const left = Math.floor((_boxWidth - width) / 2)

                _box.style.width = width + 'px'
                _box.style.transform = 'translateX(' + left + 'px)'

                _timer2 = setTimeout(function () {
                    _box.style.overflowX = 'hidden'
                }, 300)
            }, 300)
        }

        const mouseleaveHandler = (evt: any) => {
            evt.currentTarget.style.transform = '';
            evt.currentTarget.style.width = '100%';
            evt.currentTarget.overflowX = 'hidden';

            clearTimeout(_timer);
            clearTimeout(_timer2);
            _timer = _timer2 = null
        }

        containers.forEach(element => {
            element.addEventListener('mouseenter', mouseoverHandler)
            element.addEventListener('mouseleave', mouseleaveHandler)
        });

        return function () {
            containers.forEach(element => {
                element.removeEventListener('mouseenter', mouseoverHandler)
                element.removeEventListener('mouseleave', mouseleaveHandler)
            });
        }
    }

    useEffect(function () {
        const article: any = container.current
        const tables = article.querySelectorAll('.table-responsive')
        const codes = article.querySelectorAll('.remark-highlight')

        const tableDistory = responsive(tables, 'table');
        const codeDistory = responsive(codes, 'code');

        return () => {
            tableDistory()
            codeDistory()
        }

    }, [contentHtml])

    return <article ref={container} className={'post-content'} dangerouslySetInnerHTML={{ __html: contentHtml }}></article>
}