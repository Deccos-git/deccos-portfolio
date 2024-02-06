const metaPortfolio = async (data, firestore) => {

    let portfolioData = ''

    try {
        // Create sync document
        await firestore.collection("compagnies")
        .where('id', '==', data.data)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               portfolioData = doc.data()
            });
        })
    

    return portfolioData

    } catch (error) {
        console.log('Error getting portfolio data:', error)
        return 'Error getting portfolio data'
    }

}

module.exports = metaPortfolio