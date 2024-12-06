import { createSlice } from '@reduxjs/toolkit'


const getInitialLoginState = () => {
    const isLogin = sessionStorage.getItem('isLogin');
    if(isLogin === "true"){
        return true;
    }
    else{
        return false;
    }
};
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: getInitialLoginState(),
    },
    reducers: {
        isLogin: (state) => {
            console.log(state,"state")
            state.value = true;
        },
        isLogOut: (state) => {
            state.value = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { isLogin, isLogOut } = loginSlice.actions

export default loginSlice.reducer