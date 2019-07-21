import Api from './api'

class User extends Api {

    /**
     * 查询会员信息
     * @param number
     * @return {Promise<any>}
     */
    fetch(number) {
        return new Promise((resolve, reject) => {
            this.get("user", {number: number}).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }

    dredgeSvip(mumbers) {
        return new Promise((resolve, reject) => {
            this.get("user/openSvip", {mumbers: mumbers}).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            this.post("admin/login", {user_name: username, password}).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }

}

export default User;
