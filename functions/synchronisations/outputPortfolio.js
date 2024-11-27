const outputPortfolio = async (data, firestore) => {

    console.log(data)

    let portfolioOuput = ''

    try {
        // Create sync document
        await firestore.collection("outputs")
        .where('companyId', '==', data.data.portfolioID)
        .where('id', '==', data.data.outputID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                portfolioOuput = doc.data()
            });
        })
    

    return portfolioOuput

    } catch (error) {
        console.log('Error getting portfolio data:', error)
        return 'Error getting portfolio data'
    }

}

module.exports = outputPortfolio