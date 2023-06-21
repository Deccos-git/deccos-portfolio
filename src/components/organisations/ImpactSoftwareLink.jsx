import React from 'react'
import { useFirestoreGeneral } from '../../firebase/useFirestoreDeccos'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

const ImpactSoftwareLink = ({compagny}) => {

    const impactManagers = useFirestoreGeneral('ImpactManagers', 'Name', compagny.ImpactManager ? compagny.ImpactManager : '')

  return (
    <>
        {impactManagers && impactManagers.map(item => (
            <div key={item.ID}>
                <a href={`https://www.${item.Hostname}/${compagny.CompagnyID}/home`} target='_blank'><LinkOutlinedIcon className='table-icon'/></a>
            </div>
        ))}
    </>
  )
}

export default ImpactSoftwareLink