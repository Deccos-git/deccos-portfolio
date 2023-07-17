import React from 'react'
import { useFirestoreCompagnyID } from '../../firebase/useFirestoreDeccos'

const CompagnyMeta = ({item}) => {

    const compagny = useFirestoreCompagnyID('CompagnyMeta', item.compagnyId)

  return (
    <>
        {compagny && compagny.map(item => (
            <p key={item.ID}>
                {item.CommunityName}
            </p>
        ))}
    </>
  )
}

export default CompagnyMeta