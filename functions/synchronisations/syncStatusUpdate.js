const syncStatusUpdate = async (data, firestore) => {

    console.log(data.data)

    try {
        // Create sync document
        await firestore.collection("synchronisations")
        .where('id', '==', data.data.syncId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    status: data.data.status
                })
            })
        })
       
        return 'Success'

    } catch (error) {
        console.log('Error updating sync status:', error)
        return 'Error updating sync status'
    }


}

module.exports = syncStatusUpdate