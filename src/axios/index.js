//此文件是封装axios 统一做失败或成功处理
import axios from 'axios'  //1，引入axios
import {Message} from 'element-ui'; //2，用户提示用户接口错误的内容
import router from '@/router' //3,引入路由，使用router.push跳转其他页面
import Bus from './Bus'
let loadingInstance = null //4，加载全局的loading

const instance = axios.create({   //5,创建axios的示例，并且赋值默认值
    timeout:10000, //设置超时时间为10秒
    // baseURL:process.env.NODE_ENV==="production"?'':'/api'
    
    // baseURL:process.env.NODE_ENV==="production"? 'http://192.168.31.156:8001':"http://192.168.31.151:8001"       //设置默认的请求api
    // baseURL: window.location.protocol + '//' +window.location.host + '/api' ,      //设置默认的请求api
    // baseURL:"http://www.unqutest.obcase.cn/api"       //设置默认的请求api
    baseURL:"http://192.168.31.18:8080"

})

instance.defaults.headers['Content-Type']='application/json'; //设置统一的header

let httpCode={   //设置错误提示
    400:'请求参数错误',
    401:'登录信息已过期，请重新登录',
    403:'服务器拒绝本次访问',
    404:'请求资源未找到',
    501:'服务器不支持该请求中使用的方法',
    502:'网关错误',
    504:'网关超时'
}

// 添加请求拦截器
instance.interceptors.request.use(config=>{
    config.headers['Authorization']=localStorage.getItem('token')||'';   //把浏览器保存的token赋值给header
    
    // loadingInstance = Loading.service({   //发起请求时，加载element-ui全局的loading 请求结束自动关闭
    //    spinner:'fa fa-spinner fa-spin fa-3x fa-fw',
    //    text:'拼命加载中...',
    //    background:'#333'
    // })

    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    if (config.url.includes('pur/contract/export')) {
        config.headers['responseType'] = 'blob'
    }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    if (config.url.includes('pur/contract/upload')) {
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    
    // console.log(config)
    return config   //返回实例
    
},error=>{   //请求错误做些什么内容
    return Promise.reject(error)
})


//添加相应拦截器
instance.interceptors.response.use(response=>{
    // loadingInstance.close()  //关闭 请求中显示的loading
    // console.log(response)   //查看响应体
    if(response.status===200){   //和后台约定好的 请求成功的状态    终于封装成功
        // console.log('是否响应成功')
        return Promise.resolve(response.data)  //返回内容
    }else{
        Message({                             //element-ui中的展示请求错误的信息
            message:response.message,
            type:'error'
        })
        return Promise.reject(response.data.message)   //返回给开发者看的，错误信息
    }
    return response
},error=>{      //响应错误
    //  loadingInstance.close();  //同样的，也需要关闭loadling
    //  console.log(error.response.status)
     let tips = error.response.status in httpCode?httpCode[error.response.status]:err.response.message;  //判断，我上面的httpcode有没有返回的状态码，如果有就获取上面的对应的信息，没有就获取返回的信息
    
     if(error.response.status==401){  //判断登录权限问题，或者未登录，要跳转到登录页面
        // console.log(localStorage.getItem('token'))
        Bus.$emit('MoreLogin',1)   //利用兄弟组件传参，来实现登录页面自动显示
        
        localStorage.removeItem('message')
        localStorage.removeItem('name')
        localStorage.removeItem('token')
     }else if(error.response.status==404||error.response.status==400){
         /* router.push({
            path:'/four'
          })*/
     }
     else{
        Message({
            message:tips,
            type:'error'
        })
        return Promise.reject(new Error('请求超时,请刷新重试'))
     }
})


//开始封装get请求
/* 统一封装get请求 */
export const Get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params,
        ...config
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

//封装post请求
/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        data,
        ...config
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
