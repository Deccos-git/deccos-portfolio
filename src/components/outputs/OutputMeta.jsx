import React from 'react'
import { useFirestoreId } from '../../firebase/useFirestore'

const OutputMeta = ({output}) => {

  const outputs = useFirestoreId('outputs', output)

  console.log(output)

  return (
    <>
      {outputs && outputs.map(output => (
          <p key={output.id}>{output.title}</p>
      ))}
    </>
  )
}

export default OutputMeta