import { getUserInfo } from '../../hook/useFetch'
import { useNavigate } from 'react-router-dom';
import './UserProfile.scss'


const UserProfile = () => {

    const navigate = useNavigate();
    const { data, loading } = getUserInfo();


    // user logout button press...
    const userLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    // user update profile button press...
    const userProfileUpdate = () => {
        navigate('/updateProfile');
    }


    return (
        <>
            <h1 className="userInfoTitle"> <span>User</span> Profile</h1>

            <section className='userProfileContainer'>
                {
                    loading
                        ? 'Loading...'
                        : <div className="userProfile">

                            <img src={
                                data.userImage
                                    ? data.userImage
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                                alt="user"
                            />

                            <p className='userName'>{data.name}</p>

                            <button
                                className="btn"
                                onClick={userProfileUpdate}
                            >
                                update profile
                            </button>


                            <button
                                className="delete-btn"
                                onClick={userLogout}
                            >
                                logout
                            </button>
                        </div>
                }
            </section>
        </>
    )
}

export default UserProfile