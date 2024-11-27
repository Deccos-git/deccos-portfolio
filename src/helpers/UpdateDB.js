useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the 'admins' collection
        const col = collection(db, '');
        const querySnapshot = await getDocs(col);

        // Iterate through each document
        const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const compagnyID = data.compagnyId; // Extract existing 'compagnyID'
          
          if (compagnyID) {
            const docRef = doc(db, '', docSnapshot.id); // Get the document reference
            await updateDoc(docRef, { companyId: compagnyID }); // Update with 'companyId'
          }
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);
        console.log('All documents updated successfully');
      } catch (err) {
        console.error('Error updating documents:', err.message);

      } finally {
        console.log('End of script');
      }
    };

    fetchData(); // Call the function
  }, []); // Add dependencies for re-rendering