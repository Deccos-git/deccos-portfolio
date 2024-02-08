import { useState, useEffect } from 'react'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import spinner from "../../assets/spinner-ripple.svg";

const ProjectOutputMeta = ({projectOutputId}) => {
    const [title, setTitle] = useState(spinner)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProjectOutputTitle = async () => {

          const outputMeta = httpsCallable(functionsDeccos, 'outputMeta');

          outputMeta({ data: projectOutputId })
          .then((result) => {
            setTitle(result.data.Title)
            setLoading(false)
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
            alert(`Er is iets mis gegaan, neem contact op met Deccos`)
          });
        }

        getProjectOutputTitle()
    }, [projectOutputId])


  return (
    <>{loading ? <img src={spinner} alt="" /> : title}</>
  )
}

export default ProjectOutputMeta