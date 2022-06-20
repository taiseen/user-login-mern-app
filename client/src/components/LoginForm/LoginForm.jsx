import { userSignIn, userSignUp } from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import './LoginForm.scss';


const initialState = {
    name: '',
    email: '',
    password: ''
};


const LoginForm = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [conform, setConform] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(initialState);
    const [registration, setRegistration] = useState(false);


    // collect all user input data
    const handleUserInput = e => {
        const { id, value } = e.target;
        setUserInfo(prev => ({ ...prev, [id]: value }));
    }


    // toggle between login & registration + clear input fields
    const registrationToggle = () => {
        setError('');
        setConform('');
        setRegistration(!registration);
        setUserInfo({ ...initialState });
    }


    // user login OR registration process...
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (registration) {

                setError('');
                // user registration  
                setIsLoading(true);
                const { data } = await userSignUp(userInfo);
                setIsLoading(false);
                setConform(data.message);

                // after 3 second auto redirect user into login state...
                // & clear conform info...
                setTimeout(() => {
                    setRegistration(false);
                    setConform('');
                }, 2200);

            } else {

                setError('');
                setIsLoading(true);
                // user login... + header token set...
                const { data } = await userSignIn(userInfo);
                setConform(data.message);
                setIsLoading(false);

                // save user token at localStorage, that send by server
                localStorage.setItem('userInfo', JSON.stringify(data.token));

                // navigate user into user profile page...
                navigate('/');
            }
        } catch (error) {
            console.log("Login/Reg ==> ", error);
            setIsLoading(false);
            setError(error?.response?.data?.error);
        }
    }




    return (
        <section className="formContainer">

            <div className='infoShow'>
                <p className='errorSms'>{error && error}</p>
                <p className='conformSms'>{conform && conform}</p>
                {
                    isLoading &&
                    <PulseLoader color={'#f39c12'} size={30} />
                }
            </div>

            <form action="" onSubmit={handleSubmit} >
                {
                    registration
                        ? <h3>Register Now</h3>
                        : <h3>Login</h3>
                }
                {
                    registration &&
                    <input
                        required
                        id='name'
                        type="text"
                        className='box'
                        placeholder='enter your name'
                        value={userInfo.name}
                        onChange={handleUserInput}
                    />
                }

                <input
                    required
                    id='email'
                    type="email"
                    className='box'
                    placeholder='enter your email'
                    value={userInfo.email}
                    onChange={handleUserInput}
                />
                <input
                    required
                    id='password'
                    type="password"
                    className='box'
                    placeholder='enter your password'
                    value={userInfo.password}
                    onChange={handleUserInput}
                />

                <div onClick={registrationToggle} >
                    {
                        registration
                            ? <p>Already have an account? <span>Login Now</span> </p>
                            : <p>Don't have an account? <span>Create Now</span> </p>
                    }
                </div>

                <button className='btn'>Submit</button>

                {
                    !registration && <p className='passForget'>Forget password? <span>Click here</span></p>
                }

            </form>
        </section>
    )
}

export default LoginForm;