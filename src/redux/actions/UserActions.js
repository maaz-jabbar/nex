export const saveUserType = (userType) => {
    return {
        type: 'SAVE_USER_TYPE',
        payload: userType
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
}