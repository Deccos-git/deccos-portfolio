import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const OutputMetaProject = ({id}) => {

    const outputs = useFirestoreGeneral('Outputs', 'ID', id)

  return (
    <>
        {outputs && outputs.map(output => (
            <p key={output.ID}>{output.Title}</p>
        ))}
    </>
  )
}

export default OutputMetaProject