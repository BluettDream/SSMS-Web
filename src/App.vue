<template>
  <router-view />
</template>

<script setup>
import useSettingsStore from '@/store/modules/settings'
import * as echarts from 'echarts'
import { handleThemeStyle } from '@/utils/theme'

provide('echarts', echarts)

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
