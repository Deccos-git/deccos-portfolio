const projectEffectUpdate = async (data, firestore) => {

    console.log(data.data)

    try {
        // Create sync document
        await firestore.collection("synchronisations")
        .where('id', '==', data.data.syncId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    projectEffect: data.data.effectId
                })
            })
        })
       
        return 'Success'

    } catch (error) {
        console.log('Error updating sync project effect:', error)
        return 'Error updating sync project effect'
    }


}

module.exports = projectEffectUpdate