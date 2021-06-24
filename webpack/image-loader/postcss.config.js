/* eslint-disable global-require */
/*
 * @Descripttion: Do not edit
 * @Author: 李佳
 * @Date: 2020-11-20 16:01:38
 * @LastEditors: 李佳
 * @LastEditTime: 2021-02-20 15:02:53
 */
module.exports = {
    plugins: [require('autoprefixer')({
        overrideBrowserslist: [
            'last 10 Chrome versions',
            'last 5 Firefox versions',
            'Safari >= 6',
            'ie> 8',
        ],
    })],
};
