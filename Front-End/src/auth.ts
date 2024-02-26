export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("your-login:token");
    return !!token;
};