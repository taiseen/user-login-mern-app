export const fetchUser = () => {

    const user = localStorage.getItem('userInfo') !== 'undefined'
        ? JSON.parse(localStorage.getItem('userInfo'))
        : localStorage.clear()

    return user;
}