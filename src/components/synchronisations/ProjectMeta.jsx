import { useEffect, useState } from "react";
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import spinner from "../../assets/spinner-ripple.svg";

const ProjectMeta = ({projectId}) => {
    // State
    const [projectName, setProjectName] = useState('')
    const [loading, setLoading] = useState(true)

    // Get project name from API 
    useEffect(() => {
        const getProjectName = async () => {
  
          const projectMeta = httpsCallable(functionsDeccos, 'projectMeta');
  
          projectMeta({ data: projectId })
          .then((result) => {
            setProjectName(result.data.CommunityName)
            setLoading(false)
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
            alert(`Er is iets mis gegaan, neem contact op met Deccos`)
          });
        }
  
        getProjectName()
    }, [projectId])

  return (
    <>{loading ? <img src={spinner} alt="" /> : projectName}</>
  )
}

export default ProjectMeta