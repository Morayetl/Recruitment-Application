import { userLogout } from "../redux/reducers";
import { COOKIES } from "./constants";
import { message } from 'antd';
import i18next from "i18next";


const logout = (history,cookie,dispatch) => {
    cookie.remove(COOKIES.authorization, { path: '/' });
    cookie.remove(COOKIES.role, { path: '/' });
    dispatch(userLogout());
    history.push('/');    
    message.info(i18next.t('auth-logout'));
}



export default {logout};