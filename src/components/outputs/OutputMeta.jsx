import { useFirestoreId } from '../../firebase/useFirestore'

const OutputMeta = ({output}) => {

  const outputs = useFirestoreId('outputs', output ? output : '')

  return (
    <>
      {outputs && outputs.map(output => (
          <p key={output.id}>{output.title}</p>
      ))}
    </>
  )
}

export default OutputMeta