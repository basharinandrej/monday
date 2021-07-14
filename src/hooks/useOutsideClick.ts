import React from "react"


const ClickOutside = (ref: HTMLDivElement, setIsOpenPopup: any) => {
    const handler = (e: MouseEvent) => {

        //@ts-ignore
        if (e.path.includes(ref?.current )) {
            //@ts-ignore
        } else {
            setTimeout(() => {
                setIsOpenPopup(false)
            }, 2000)
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [ref])

}

export default ClickOutside