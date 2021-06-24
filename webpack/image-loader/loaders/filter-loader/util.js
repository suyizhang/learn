const jpeg = require('jpeg-js');

function handleEdge(i, x, w) {
  var m = x + i;
  if (m < 0) {
    m = -m;
  } else if (m >= w) {
    m = w + i - x;
  }
  return m;
}

module.exports.isJpg = (buffer) => {
  if (!buffer || buffer.length < 3) {
    return false;
  }
  return buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255;
};

module.exports.isPng = (buffer) => {
  if (!buffer || buffer.length < 8) {
    return false;
  }
  const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return pngMagic.every((v, index) => v === buffer[index]);
};

module.exports.getRGBA8Array = function ({ data, width, height }) {
  const rgbArr = new Uint8Array(width * height * 4);
  for (let i = 0; i < width * height * 4; i += 4) {
    rgbArr[1 + 0] = data[i + 0];
    rgbArr[1 + 1] = data[i + 1];
    rgbArr[1 + 2] = data[i + 2];
    rgbArr[1 + 3] = data[i + 3];
  }
  return {
    data: rgbArr,
    width,
    height,
  };
};

module.exports.RGBAToBuffer = function ({ data, width, height }) {
  const frameData = Buffer.alloc(width * height * 4);
  var i = 0;
  while (i < frameData.length) {
    frameData[i] = data[i];
    frameData[i + 1] = data[i + 1];
    frameData[i + 2] = data[i + 2];
    frameData[i + 3] = data[i + 3];
    i += 4;
  }
  var rawImageData = {
    data: frameData,
    width: width,
    height: height,
  };
  var jpegImageData = jpeg.encode(rawImageData, 50);
  return jpegImageData.data;
};

const methods = {
  // 漫画
  cartoon: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      var r = data[i],
        g = data[i + 1],
        b = data[i + 2];
      var newR = (Math.abs(g - b + g + r) * r) / 256;
      var newG = (Math.abs(b - g + b + r) * r) / 256;
      var newB = (Math.abs(b - g + b + r) * g) / 256;
      [data[i], data[i + 1], data[i + 2]] = [newR, newG, newB];
    }
    return imgData;
  },
  // 灰度
  grayscale: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      const grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = Math.round(grey);
    }
    return imgData;
  },

  // 黑白
  blackAndWhite: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg >= 100 ? 255 : 0;
    }
    return imgData;
  },

  // 反向
  reverse: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return imgData;
  },

  // 去色滤镜
  decolor: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      const avg = Math.floor((Math.min(data[i], data[i + 1], data[i + 2]) + Math.max(data[i], data[i + 1], data[i + 2])) / 2);
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    return imgData;
  },

  // 单色滤镜
  monochrome: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      const data = imgData.data;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
    return imgData;
  },

  // 高斯滤镜
  gaussian: function (imgData, radius, sigma) {
    var pixes = imgData.data,
      height = imgData.height,
      width = imgData.width,
      radius = radius || 5;
    sigma = sigma || radius / 3;

    var gaussEdge = radius * 2 + 1;

    var gaussMatrix = [],
      gaussSum = 0,
      a = 1 / (2 * sigma * sigma * Math.PI),
      b = -a * Math.PI;

    for (var i = -radius; i <= radius; i++) {
      for (var j = -radius; j <= radius; j++) {
        var gxy = a * Math.exp((i * i + j * j) * b);
        gaussMatrix.push(gxy);
        gaussSum += gxy;
      }
    }
    var gaussNum = (radius + 1) * (radius + 1);
    for (var i = 0; i < gaussNum; i++) {
      gaussMatrix[i] /= gaussSum;
    }

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var r = (g = b = 0);
        for (var i = -radius; i <= radius; i++) {
          var m = handleEdge(i, x, width);
          for (var j = -radius; j <= radius; j++) {
            var mm = handleEdge(j, y, height);
            var currentPixId = (mm * width + m) * 4;
            var jj = j + radius;
            var ii = i + radius;
            r += pixes[currentPixId] * gaussMatrix[jj * gaussEdge + ii];
            g += pixes[currentPixId + 1] * gaussMatrix[jj * gaussEdge + ii];
            b += pixes[currentPixId + 2] * gaussMatrix[jj * gaussEdge + ii];
          }
        }
        var pixId = (y * width + x) * 4;

        pixes[pixId] = ~~r;
        pixes[pixId + 1] = ~~g;
        pixes[pixId + 2] = ~~b;
      }
    }
    imgData.data = pixes;
    return imgData;
  },
  // 怀旧滤镜
  nostalgia: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width; i++) {
      var r = imgData.data[i * 4],
        g = imgData.data[i * 4 + 1],
        b = imgData.data[i * 4 + 2];

      var newR = 0.393 * r + 0.769 * g + 0.189 * b;
      var newG = 0.349 * r + 0.686 * g + 0.168 * b;
      var newB = 0.272 * r + 0.534 * g + 0.131 * b;
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [imgData.data[i * 4], imgData.data[i * 4 + 1], imgData.data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  // 熔铸滤镜
  casting: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      var r = imgData.data[i],
        g = imgData.data[i + 1],
        b = imgData.data[i + 2];

      var newR = (r * 128) / (g + b + 1);
      var newG = (g * 128) / (r + b + 1);
      var newB = (b * 128) / (g + r + 1);
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]] = rgbArr;
    }
    return imgData;
  },

  // 冰冻滤镜
  frozen: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      var r = imgData.data[i],
        g = imgData.data[i + 1],
        b = imgData.data[i + 2];

      var newR = ((r - g - b) * 3) / 2;
      var newG = ((g - r - b) * 3) / 2;
      var newB = ((b - g - r) * 3) / 2;
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]] = rgbArr;
    }
    return imgData;
  },

  // 褐色滤镜
  brown: function (imgData) {
    for (var i = 0; i < imgData.height * imgData.width * 4; i += 4) {
      var r = imgData.data[i],
        g = imgData.data[i + 1],
        b = imgData.data[i + 2];
      var newR = r * 0.393 + g * 0.769 + b * 0.189;
      var newG = r * 0.349 + g * 0.686 + b * 0.168;
      var newB = r * 0.272 + g * 0.534 + b * 0.131;
      var rgbArr = [newR, newG, newB];
      [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]] = rgbArr;
    }
    return imgData;
  },

  // 扩散特效， 毛玻璃 效果
  groundGlass: function (imgData) {
    const { data, height, width } = imgData;
    const copyUint8Array = new Uint8Array(width * height * 4);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const m = (i * width + j) * 4;
        let ir = [i - 1, i, i + 1];
        if (i === 0) {
          ir = [i, i + 1];
        }
        if (i === width) {
          ir = [i - 1, i];
        }
        let jr = [j - 1, j, j + 1];
        if (j === 0) {
          jr = [j, j + 1];
        }
        if (j === height) {
          jr = [j - 1, j];
        }
        const randomi = Math.floor(Math.random() * ir.length);
        const randomj = Math.floor(Math.random() * jr.length);
        const rm = (ir[randomi] * width + jr[randomj]) * 4;
        [copyUint8Array[m], copyUint8Array[m + 1], copyUint8Array[m + 2], copyUint8Array[m + 3]] = [data[rm], data[rm + 1], data[rm + 2], data[rm + 3]];
      }
    }
    imgData.data = copyUint8Array;
    return imgData;
  },

  median: function (imgData) {
    const { data, height, width } = imgData;
    let r = [];
    let g = [];
    let b = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const c = (i * width + j) * 4;
      }
    }
  },

  default: function (imgData) {
    return imgData;
  },
};

module.exports.methods = methods;
