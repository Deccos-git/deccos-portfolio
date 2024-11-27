const indicatorsPortfolio = async (data, firestore) => {

    console.log(data)

    const effectId = data.data

    const indicators = []

    const snapshot = await firestore.collection('indicators')
    .where('effectId', '==', effectId)
    .get()

    snapshot.forEach(doc => {
        indicators.push(doc.data())
    })

    return indicators

}

module.exports = indicatorsPortfolio