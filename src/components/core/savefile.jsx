import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const saveFile = (e, setState) => {

    console.log(e)

    const file = e

    const storage = getStorage();
    const storageRef = ref(storage, `${file[0].name}`);

    const uploadTask = uploadBytesResumable(storageRef, file[0]);
  
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
                setState(downloadURL)
            
            });
        }
    );
}

export default saveFile