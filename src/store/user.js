import React, {Component} from 'react';
import Api from './api'

class Member extends Api {

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
}

export default Member;
