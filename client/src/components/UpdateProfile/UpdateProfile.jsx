import { deleteUserInfo, getUserInfo, imageUpload, updateUserInfo } from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import sweetAlert from 'sweetalert2';
import './UpdateProfile.scss';


const UpdateProfile = () => {

    const navigate = useNavigate();
    const { data, loading } = getUserInfo();
    const [userInfo, setUserInfo] = useState();
    const [imageFile, setImageFile] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => setUserInfo(data), [data]);

    const backButton = () => navigate('/');

    const userInput = e => setUserInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));


    const deleteProfile = async (e) => {
        e.preventDefault();

        // if (window.confirm("🔴 Are you sure for - deleting your profile? 🔴")) {

        //     try {

        //         await deleteUserInfo();

        //         // display a notification...
        //         toast.success("Delete Successful... Bye❗", { autoClose: 2000 });

        //         // auto Clear localStorage + Navigate app into root 
        //         localStorage.clear();
        //         setTimeout(() => navigate('/'), 3000);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        try {

            // get confirmation from user for delete or not?
            const { value } = await sweetAlert.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!.",
                allowOutsideClick: false,
                confirmButtonColor: '#cc0000',
                cancelButtonColor: '#009900',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (value) {

                await deleteUserInfo();

                // display a notification...
                toast.success("Delete Successful... Bye❗", { autoClose: 2000 });

                // auto Clear localStorage + Navigate app into root 
                localStorage.clear();
                setTimeout(() => navigate('/'), 3000);

                sweetAlert.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Your profile data has been deleted.`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    // user profile update button click functionality...
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

            setIsUpdating(true);
            // update user info at mongodb
            await updateUserInfo(userUpdateInfo);
            setIsUpdating(false);

            // show notification + close after 2 second
            toast.success("Update Successful...", { autoClose: 2000 });

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
                        ? <PulseLoader color={'#f39c12'} size={60} />
                        : <form action="" encType='multipart/form-data'>

                            {   // when user update and press update button for profile updating...
                                isUpdating &&
                                <div className="updateLoader">
                                    <PulseLoader color={'#f39c12'} size={60} />
                                </div>
                            }

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

export default UpdateProfile;