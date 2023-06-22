const testpackage = async (data, firestore) => {
    const token = data.token;


    const getPackage = async (packageId) => {

        const array = [];

        const collectionRef = firestore.collection('package');
        const query = collectionRef.where('packageId', '==', packageId);
        const snapshot = await query.get();

        snapshot.docs.map(doc => {
            console.log(doc.data());
            const object = {
                title: doc.data().title,
            }

            array.push(object);
        })

        return array;

    }

    const compagnyPackage = async () => {
        const collectionRef = firestore.collection('packageCompagnyPairs');
        const query = collectionRef.where('compagnyId', '==', token);
        const snapshot = await query.get();

        const array = [];

        await Promise.all(
            snapshot.docs.map(async doc => {
                console.log(doc.data());
                const object = {
                    package: await getPackage(doc.data().packageId),
                }

                array.push(object);
            })
        );

        return array;
    }

    const package = await compagnyPackage();

    return package;

}

module.exports = testpackage;