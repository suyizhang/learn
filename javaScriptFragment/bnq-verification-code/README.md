### 验证码弹窗

#### 安装方法

​		npm install bnq-verification-code --save

const picCode = bnqVerificationCode({ onCancel, onOk });
#### 参数

​            onOk 成功回调 携带后端返回信息
​            onCancel 失败回调  携带后端返回信息
#### 方法

​	

| function  | 说明                        |
| --------- | --------------------------- |
| openWarp  | 打开弹窗   openWarp(mobile) |
| closeWarp | 关闭弹窗                    |
| init      | 添加弹窗至body下            |




#####  实例

```javascript

import bnqVerificationCode from 'bnq-verification-code';

const picCode = bnqVerificationCode({
    onCancel: () => {}, //失败回调
    onOk： () => {}, // 成功回调
})；

picCode.openWarp(mobile); // 打开弹窗 传入手机号

```

