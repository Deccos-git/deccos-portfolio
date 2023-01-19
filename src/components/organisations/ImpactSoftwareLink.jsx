import React from 'react'
import { useFirestoreGeneral } from '../../firebase/useFirestoreDeccos'

const ImpactSoftwareLink = ({compagny}) => {

    const impactManagers = useFirestoreGeneral('ImpactManagers', 'Name', compagny.ImpactManager ? compagny.ImpactManager : '')

  return (
    <>
        {impactManagers && impactManagers.map(item => (
            <div key={item.ID}>
                <a href={`https://www.${item.Hostname}/${compagny.CompagnyID}/home`} target='_blank'>Bekijk in impact software</a>

            </div>
        ))}
    </>
  )
}

export default ImpactSoftwareLink