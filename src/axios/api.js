//login Api
import {Get,post} from './index';

export const login = (params) => post('/auth/login',params)  //登录
export const getMessage =(params)=>Get('index/noticeData',params);  //获取通知
