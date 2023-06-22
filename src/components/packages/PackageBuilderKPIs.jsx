import React from 'react'
import KpiMetaPackage from '../kpis/KpiMetaPackage'

const PackageBuilderKPIs = ({item}) => {
 
  return (
    <>
        {item.kpis && item.kpis.map(kpi => (
            <KpiMetaPackage kpi={kpi} />
        ))}
    </>
  )
}

export default PackageBuilderKPIs