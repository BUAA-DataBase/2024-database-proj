import type { AppConfigState } from '@/store/types'
import { DeviceType, ThemeMode } from '@/store/types'
  
export const projectName = '航课评'

export default {
    theme: ThemeMode.LIGHT,
    themeColor: '#409eff',
    sideWidth: 210,
    deviceType: DeviceType.PC,
    isFixedNavBar: true,
    isCollapse: false,
    actionBar: {
      isShowAdd: true,
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
} as AppConfigState
