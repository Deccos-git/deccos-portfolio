const effectPortfolio = async (data, firestore) => {

    let portfolioEffect = ''

    try {
        // Create sync document
        await firestore.collection("effects")
        .where('compagny', '==', data.data.portfolioID)
        .where('id', '==', data.data.EffectID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                portfolioEffect = doc.data()
            });
        })
    

    return portfolioEffect

    } catch (error) {
        console.log('Error getting portfolio data:', error)
        return 'Error getting portfolio data'
    }

}

module.exports = effectPortfolio