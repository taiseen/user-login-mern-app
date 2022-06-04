import { getUserInfo, imageUpload, updateUserInfo } from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './UpdateProfile.scss';


const UpdateProfile = () => {

    const navigate = useNavigate();
    const { data, loading } = getUserInfo();
    const [userInfo, setUserInfo] = useState();
    const [imageFile, setImageFile] = useState('');


    useEffect(() => {
        setUserInfo(data);
    }, [data])

    const userInput = (e) => {
        const { id, value } = e.target;
        setUserInfo(prev => ({ ...prev, [id]: value }));
    }

    const backButton = () => {
        navigate('/');
    }

    const deleteProfile = async (e) => {
        e.preventDefault();
        alert('are you sure want to delete your profile?');

    }


    const profileUpdate = async (e) => {
        e.preventDefault();

        const imgData = new FormData();
        imgData.append("file", imageFile);
        imgData.append("upload_preset", "upload");

        try {
            let userUpdateInfo;

            // update with image data...
            if (imageFile?.name !== undefined) {
                const { data: { url } } = await imageUpload(imgData);
                userUpdateInfo = { ...userInfo, userImage: url }
            } else {
                userUpdateInfo = { ...userInfo }
            }

            // update user info at mongodb
            await updateUserInfo(userUpdateInfo);
            toast.success("Update Successful...");

            // setUserInfo(data.result)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <h1 className="userInfoTitle"> <span>Update</span> Profile</h1>

            <section className='updateProfileContainer'>

                {
                    loading
                        ? 'loading data...'
                        : <form action="" encType='multipart/form-data'>

                            <img src={
                                imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : data.userImage
                                        ? data.userImage
                                        : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                                alt="userPhoto"
                            />

                            <div className="flex">

                                <div className="inputBox">

                                    <span>Name : </span>
                                    <input
                                        required
                                        id='name'
                                        type="text"
                                        className='box'
                                        placeholder='enter your name'
                                        value={userInfo.name}
                                        onChange={userInput}
                                    />

                                    <span>Email : </span>
                                    <input
                                        required
                                        id='email'
                                        type="email"
                                        className='box'
                                        placeholder='enter your email'
                                        value={userInfo.email}
                                        onChange={userInput}
                                    />

                                    <span>Profile Photo : </span>
                                    <input
                                        id='image'
                                        type="file"
                                        className='box'
                                        accept="image/*"
                                        onChange={e => setImageFile(e.target.files[0])}
                                    />
                                </div>

                                <div className="inputBox">
                                    <span>Phone : </span>
                                    <input
                                        id='phone'
                                        type="tel"
                                        className='box'
                                        placeholder='+880 1717 121212'
                                        value={userInfo.phone}
                                        onChange={userInput}
                                    />

                                    <span>New Password : </span>
                                    <input
                                        id='newPassword'
                                        type="password"
                                        className='box'
                                        placeholder='your new password'
                                        value={userInfo.newPassword || 12345678}
                                        onChange={userInput}
                                    />

                                    <span>Confirm Password : </span>
                                    <input
                                        id='confPassword'
                                        type="password"
                                        className='box'
                                        placeholder='confirm new password'
                                        value={userInfo.confPassword || 12345678}
                                        onChange={userInput}
                                    />
                                </div>

                            </div>

                            <div className="flex-btn">
                                <button className='option-btn' onClick={backButton}> Go Back </button>
                                <button className='btn' onClick={profileUpdate}> Update Profile </button>
                                <button className='delete-btn' onClick={deleteProfile}> Delete Profile </button>
                            </div>

                        </form>
                }
            </section>
        </>
    )
}

export default UpdateProfile


{/* <div className='box'>
<FileBase
    type='file'
    multiple={false}
    onChange={e => setImageFile(e.target.files[0])}
    onDone={({ base64 }) => setUserInfo({ ...userInfo, image: base64 })}
/>
</div> */}