const projectOutputUpdate = async (data, firestore) => {

    console.log(data.data)

    try {
        // Create sync document
        await firestore.collection("synchronisations")
        .where('id', '==', data.data.syncId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    projectOutput: data.data.outputId
                })
            })
        })
       
        return 'Success'

    } catch (error) {
        console.log('Error updating sync project output:', error)
        return 'Error updating sync project output'
    }


}

module.exports = projectOutputUpdate