import { defineStore } from 'pinia'

import defaultSetting from '@/setting'
import { ThemeMode, DeviceType } from '../types'

// import { useChangeMenuWidth } from '@/hooks/useMenuWidth'
// useChangeMenuWidth(defaultSetting.sideWidth)

const useAppConfigStore = defineStore('app-config', {
  state: () => {
    return defaultSetting
  },
  getters: {
    
  },
  actions: {
    changeTheme(theme: ThemeMode) {
      this.theme = theme
    },
    changeDevice(deviceType: DeviceType) {
      this.deviceType = deviceType
    },
    changePrimaryColor(color: string) {
      this.themeColor = color
    },
    changeSideWith(sideWidth: number) {
      this.sideWidth = sideWidth
      const r = document.querySelector(':root') as HTMLElement
      r.style.setProperty('--menu-width', sideWidth + 'px')
    },
    toggleCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse
    },
  },
//   presist: {
//     enable: true,
//     resetToState: true,
//   },
})

export default useAppConfigStore
