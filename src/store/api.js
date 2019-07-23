import axios from 'axios'
// import cookie from 'react-cookies'

// "http://hongbaoapp.cn:8017/";
axios.defaults.baseURL = "http://hongbaoapp.cn:8100/";
axios.defaults.timeout = 1000 * 60 * 3;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
    config => {
        // let token = cookie.load("token");
        let token = localStorage.getItem("token");
        if (token !== null) {
            config.headers.common['Authorization'] = token
        } else {
            config.headers.common['Authorization'] = ""
        }
        return config
    },
    error => {
        return Promise.reject(error.response)
    }
)
// config.headers.common['Authorization'] = token
// axios.defaults.transformRequest = function (data) {
//     data = JSON.stringify(data);
//     return data
// };

// 会员API
class Api {

    get(url, querys) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params: querys}).then(response => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject(new Error("请求数据失败" + url))
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    post (url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default Api
