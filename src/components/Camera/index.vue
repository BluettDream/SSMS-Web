<template>
  <div class="camera">
    <video ref="videoRef" :width="width" :height="height" />
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();

const props = defineProps({
  width: {
    type: [Number],
    default: 300,
  },
  height: {
    type: [Number],
    default: 250,
  },
});

defineExpose({
  captureImg, // 拍摄照片
  initCamera, // 初始化摄像头(使用时需要先调用)
  startCamera, // 开启摄像头
  stopCamera, // 暂停摄像头
  destoryCamera, // 销毁摄像头
});

/**
 * 拍摄照片
 * @param {*} callback 回调函数,接收拍摄的blob对象
 */
function captureImg(callback) {
  // 创建canvas
  const _canvas = document.createElement("canvas");
  const _ctx = _canvas.getContext("2d");
  // 获取真实硬件分辨率
  const ratio = window.devicePixelRatio || 1;
  _ctx.scale(ratio, ratio); // 应用真实分辨率
  // 获取video
  const _video = proxy.$refs.videoRef;
  // 设置canvas的宽高像素和video相同
  _canvas.width = _video.offsetWidth * ratio;
  _canvas.height = _video.offsetHeight * ratio;
  // 绘制图像
  _ctx.drawImage(_video, 0, 0, _canvas.width, _canvas.height);
  _canvas.toBlob((blob) => callback(blob));
}

/**
 * 初始化摄像头
 */
function initCamera() {
  // 老的浏览器可能根本没有实现 mediaDevices,所以我们可以先设置一个空的对象
  if (navigator.mediaDevices === undefined) navigator.mediaDevices = {};
  // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
  // 因为这样可能会覆盖已有的属性。这里我们只会在没有 getUserMedia 属性的时候添加它。
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = (constraints) => {
      // 首先，如果有 getUserMedia 的话,就获得它
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      // 一些浏览器根本没实现它 - 那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
      if (!getUserMedia)
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      // 否则,为老的 navigator.getUserMedia 方法包裹一个 Promise
      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  const _video = proxy.$refs.videoRef;
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // 旧的浏览器可能没有 srcObject, 防止在新的浏览器里使用它，应为它已经不再支持了
      if ("srcObject" in _video) _video.srcObject = stream;
      else _video.src = window.URL.createObjectURL(stream);
      _video.onloadedmetadata = (e) => _video.play();
    })
    .catch((err) => console.log(err.name + ": " + err.message));
}

/**
 * 开启摄像头
 */
function startCamera() {
  const _video = proxy.$refs.videoRef;
  if (_video && _video !== null) _video.play();
}

/**
 * 暂停摄像头
 */
function stopCamera() {
  const _video = proxy.$refs.videoRef;
  if (_video && _video !== null) _video.pause();
}

/**
 * 销毁摄像头
 */
function destoryCamera() {
  const _video = proxy.$refs.videoRef;
  // 获取当前视频流
  const _stream = _video.srcObject;
  // 将视频流中所有媒体全部关闭
  if (_stream && _stream.getTracks) {
    _stream.getTracks().forEach((track) => track.stop());
  }
}
</script>

<style lang="scss" scoped></style>
