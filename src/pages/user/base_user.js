import React from 'react';

class BaseUser extends React.Component {

    /**
     * 验证手机号码
     *  true 表示为合格的手机号码
     *  false 验证失败
     * @param phone
     * @return boolean
     */
    verifyPhone = (phone) => {
        return /^1[3456789]\d{9}$/.test(phone);
    };

    render() {
        return ("")
    }
}

export default BaseUser;
