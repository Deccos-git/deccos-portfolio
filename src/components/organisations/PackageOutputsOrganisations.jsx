import React from 'react'
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import PackageOutputsSettings from '../../components/organisations/PackageOutputsSettings'

const PackageOutputsOrganisations = ({item, organisation}) => {

    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'compagnyId', item.ID ? item.ID : '') 

  return (
    <>
        {packageCompagnyPairs && packageCompagnyPairs.map((item) => (
            <PackageOutputsSettings id={item.packageId} organisation={organisation}/>
        ))}
    </>
  )
}

export default PackageOutputsOrganisations