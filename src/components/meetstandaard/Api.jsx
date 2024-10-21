
import { useState, useEffect } from 'react'

const Api = () => {
    const [database, setDatabase] = useState([])

    useEffect(() => {
        fetch('https://us-central1-meetstandaard-api.cloudfunctions.net/database')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json(); // Return the result of res.json()
        })
        .then(data => {
            setDatabase(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [])

    return (
        database
    )
}

export default Api