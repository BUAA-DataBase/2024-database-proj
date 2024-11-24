import type { Ref, UnwrapRef } from 'vue'
import type { RouteMeta, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

export enum Role {
    Anonymous = 'anonymous',
    Student = 'student',
    Teacher = 'teacher',
    Admin = 'admin'
}

export enum DeviceType {
  PC = 'pc',
  PAD = 'pad',
  MOBILE = 'mobile',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface UserState {
    userName: string
    password: string
    email: string
    role: Role
    major: string
    grade: string
    avatar: string
    college: string
    gender: string
    followedPosts: string[]
    followers: string[]
    following: string[]
    blockedUsers: string[]
    registrationDate: Date
}

export interface AppConfigState {
  projectName: string
  theme: ThemeMode
  themeColor: string
  deviceType: DeviceType
  sideWidth: number
  isFixedNavBar: boolean
  isCollapse: boolean
  actionBar: {
    isShowAdd: boolean
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}

export interface VisitedRouteState {
  visitedRoutes: RouteRecordNormalized[]
  affixRoutes: RouteRecordNormalized[]
}

export interface CachedRouteState {
  cachedRoutes: string[]
}

export interface OriginRoute {
  parentPath?: string
  menuUrl: string
  menuName?: string
  routeName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  isRootPath?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle?: boolean
  localFilePath?: string
  children?: Array<OriginRoute>
}

export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  cacheable?: boolean
  affix?: boolean
}

export interface SplitTab {
  label: string
  iconPrefix?: string | unknown
  icon: string
  fullPath: string
  children?: Array<RouteRecordRaw>
  checked: Ref<UnwrapRef<boolean>>
}
