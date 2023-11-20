import React from 'react'
import { useState, useEffect } from 'react'
import { useFirestoreGeneral } from '../../firebase/useFirestore'

const ThemeOutputMeta = ({id, setThemeOutputTitle}) => {
    const [title, setTitle] = useState('')

    const outputs = useFirestoreGeneral('outputs', 'id', id)

    // Set the title of the themeOutput
    useEffect(() => {
        outputs && outputs.map(item => (
            setTitle(item.title),
            setThemeOutputTitle(item.title)
        ))
    }, [outputs])

  return (
    <p>{title}</p>
  )
}

export default ThemeOutputMeta