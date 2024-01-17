// User verification
const userVerification = () => {
    const data = {
        user: null,
        isAuthenticated: false,
        isAdmin: false
    }
    data.user = JSON.parse(localStorage.getItem("user")) || null;
    data.isAuthenticated = !!data.user;
    data.isAdmin = data.user && data.user.admin;
    return data;
}

export default userVerification;
