<template>
  <div class="face-login">
    <el-form class="face-login-form">
      <h3 class="title">SSMS学生成绩管理系统</h3>
      <el-form-item style="width: 100%">
        <Camera
          ref="cameraRef"
          :width="300"
          :height="250"
          style="margin-left: 6%"
        />
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="startDetect"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>检 测 中...</span>
        </el-button>
        <div style="float: right">
          <router-link class="link-type" :to="'/login'"
            >使用已有账户登录</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-face-login-footer">
      <span>Copyright © 2018-2023 BluettDream All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import Camera from "@/components/Camera/index";
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const router = useRouter();
const { proxy } = getCurrentInstance();
const loading = ref(false);
const redirect = ref(undefined);

let camera = null; // 摄像机对象,挂载组件时获取

function startDetect() {
  camera.captureImg((blob) => {
    loading.value = true;
    camera.stopCamera();
    let formData = new FormData();
    formData.append("faceImg", blob);
    userStore.faceLogin(formData).then((res) => {
      console.log(res);
      router.push({ path: redirect.value || "/" });
    }).catch((err) => {
        console.log(err);
        camera.startCamera();
        loading.value = false;
      }
    )});
}

onMounted(() => {
  camera = proxy.$refs.cameraRef;
  camera.initCamera();
});

onBeforeUnmount(() => {
  camera.destoryCamera();
});
</script>

<style lang="scss" scoped>
.face-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.face-login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}

.el-face-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
