import './index.css';

class BnqVerificationCode {
  constructor({ onOk, onCancel }) {
    this.picCode = [];
    this.mobile = undefined;
    this.onOk = onOk;
    this.onCancel = onCancel;
  }
  // 初始化
  init() {
    this.createDOM();
  }

  createDOM = () => {
    const wrap = document.createElement('div');
    wrap.className = 'wrap__code';
    const context = `
      <div class='wrap-box'>
        <img class="warp-box-image" />
        <span class="warp-flags"></span>
        <span class="warp-box-text"></span>
        <div class="warp-box-btns" >
          <span class="warp-btn warp-btn-ok">确定</span>
          <span class="warp-btn warp-btn-cancel">取消</span>
        </div>
      </div>
    `;
    wrap.innerHTML = context;
    document.body.appendChild(wrap);
    const imageDom = document.querySelector('.warp-box-image');
    const btnOk = document.querySelector('.warp-btn-ok');
    const btnCancel = document.querySelector('.warp-btn-cancel');
    imageDom.addEventListener('click', this.clickImage);
    btnOk.addEventListener('click', this.handlerOk);
    btnCancel.addEventListener('click', this.closeWarp);
  };

  clickImage = (e) => {
    if (this.picCode.length > 9) {
      return;
    }
    let clientX = e.clientX;
    let clientY = e.clientY;
    let imageX = e.target.getBoundingClientRect().left;
    let imageY = e.target.getBoundingClientRect().top;
    let x = clientX - imageX;
    let y = clientY - imageY;
    this.addFlag(clientX - imageX + 14, clientY - imageY + 8);
    this.picCode = this.picCode.concat([[x, y]]);
  };

  addFlag = (x, y) => {
    const flag = document.createElement('span');
    flag.className = 'warp-flag';
    flag.style.left = `${x}px`;
    flag.style.top = `${y}px`;
    const txt = document.createTextNode(this.picCode.length + 1);
    flag.appendChild(txt);
    document.querySelector('.warp-flags').appendChild(flag);
  };

  handlerOk = () => {
    const option = {
      mobile: this.mobile,
      clientType: 3,
      height: 110,
      width: 220,
      picCode: encodeURI(base64encode(JSON.stringify(this.picCode))),
    };
    this.requestFunc('https://pt.bthome.com/pcApi/apis/auth/v2/getSmsCode.do', 'GET', option, this.callbackOk);
  };

  callbackOk = (res) => {
    if (res.success) {
      // 登录成功
      this.onOk && this.onOk();
    } else {
      // 失败回调
      this.onCancel && this.onCancel();
    }
    this.closeWarp();
  };

  closeWarp = () => {
    this.picCode = [];
    this.mobile = undefined;
    document.querySelector('.warp-flags').innerHTML = '';
    const wrapBox = document.querySelector('.wrap__code');
    wrapBox.classList.remove('active');
  };

  openWarp = (mobile) => {
    this.mobile = mobile;
    const wrapBox = document.querySelector('.wrap__code');
    wrapBox.classList.add('active');
    this.requestFunc('https://pt.bthome.com/pcApi/apis/auth/v2/getImgCode.jpg', 'GET', { mobile }, this.setImage);
  };

  requestFunc = (src, type = 'GET', parmas = {}, callback) => {
    src += '?';
    Object.keys(parmas).forEach((v) => {
      src += `${v}=${parmas[v]}&`;
    });
    let request = new XMLHttpRequest();
    request.open(type, src);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        callback(JSON.parse(request.response));
      }
    };
  };

  createScript = (src, parmas = {}, callback) => {
    src += '?';
    Object.keys(parmas).forEach((v) => {
      src += `${v}=${parmas[v]}&`;
    });
    src += `callback=${callback}`;
    const orScript = document.createElement('script');
    orScript.src = src;
    document.body.appendChild(orScript);
    document.body.removeChild(orScript);
  };

  setImage = (params) => {
    const { data, code } = params;
    if (code === 0) {
      const wImage = document.querySelector('.warp-box-image');
      const wText = document.querySelector('.warp-box-text');
      wImage.src = data.image;
      wText.innerHTML = data.code;
    }
  };
}

const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += '==';
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xf) << 2);
      out += '=';
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3f);
  }
  return out;
}

function picCode (parmas) {
  const bnqVerificationCode = new BnqVerificationCode(parmas);
  bnqVerificationCode.init();
  return bnqVerificationCode;
}
module.exports = picCode;
