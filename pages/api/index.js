import axios from 'axios'

const instance = axios.create({
    baseURL:'https://api.github.com'
})

instance.interceptors.request.use(
    function(config){
        return config
    },
    function(error){
        console.log('request error')
        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        if(error.response){
            switch(error.response.status){
                case 404:
                    console.log('頁面不存在')
                    alert('查無此使用者，請重新輸入～')
                    window.location.reload()
                    break
                case 500:
                    console.log('程式發生問題')
                    break
                default:
                    console.log('other error')
            }
        }
        return Promise.reject(error);
    }
)

export const getUserRepos = (id, data) => instance.get(`/users/${id}/repos?per_page=10?page=10`, data)
export const getUserDetail = (id, data) => instance.get(`/users/${id}`, data)