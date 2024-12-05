import { defineStore } from 'pinia'
import type { CourseState } from '../types'

export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: [] as CourseState[], // 定义 courses 类型为 Course 数组
  }),
  getters: {
    // 定义一个getter来获取符合条件的课程
    getCoursesByTeacherName(state) {
      return (teacherName: string): CourseState[] => {
        return state.courses.filter(course => course.courseTeacher === teacherName);
      };
    },
  },
  actions: {
    // 新增课程
    addCourse(course: CourseState) {
      this.courses.push(course);
    },

    // 根据课程名获取课程
    getCourseByName(courseName: string): CourseState | undefined {
      return this.courses.find((course) => course.courseName === courseName);
    },

    // 获取所有课程
    getAllCourses(): CourseState[] {
      return this.courses;
    },
  },
});
