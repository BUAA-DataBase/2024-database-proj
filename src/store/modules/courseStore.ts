import { defineStore } from 'pinia'
import type { CourseState } from '../types'
import axios from 'axios';

export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: [] as CourseState[], // 定义 courses 类型为 Course 数组
  }),
  actions: {
    // 新增课程
    addCourse(course: CourseState) {
      course.roundRate = Math.round(course.courseRate * 2 - 0.1)/2
      this.courses.push(course);
    },

    getCourseById(courseId: number): CourseState {
      const course = this.courses.find((course) => course.courseId === courseId);
      
      if (!course) {
        console.error(`Course with ID ${courseId} not found!`);
        throw new Error(`Course with ID ${courseId} not found.`);
      }
      
      return course;
    },

    getCourseIdByNameAndTeacher(courseName: string, courseTeacher: string): number {
      const course = this.courses.find((course) => course.courseName === courseName && course.courseTeacher === courseTeacher);
      
      if (!course) {
        console.error(`Course with ID ${courseName} not found!`);
        throw new Error(`Course with ID ${courseName} not found.`);
      }
      
      return course.courseId;
    },

    // 根据课程名获取课程
    getCourseByName(courseName: string, courseTeacher: string): CourseState[] {
      return this.courses.filter((course) => course.courseName === courseName && course.courseTeacher !== courseTeacher)
      .sort((a, b) => b.courseRate - a.courseRate);
    },

    // 根据教师名获取课程
    getCourseByTeacher(courseName: string, courseTeacher: string): CourseState[] {
      return this.courses.filter(course => course.courseTeacher === courseTeacher && course.courseName !== courseName)
      .sort((a, b) => b.courseRate - a.courseRate);
    },

    // 获取所有课程
    getAllCourses(): CourseState[] {
      const sortedCourses = [...this.courses].sort((a, b) => {
        return b.courseRate - a.courseRate; // 降序排序
      });
      return sortedCourses;
    },

    getCoursesByIds(courseIds: number[]): CourseState[] {
      let filteredCourses = [...this.courses];
      filteredCourses = filteredCourses.filter(course => courseIds.includes(course.courseId));
      const sortedCourses = [...filteredCourses].sort((a, b) => {
        return b.courseRate - a.courseRate; // 降序排序
      });
      return sortedCourses;
    },

    // 按照评分获取刚好一页课程
    getSortedCoursesByRate(page: number, ascending: boolean): CourseState[] {
      const sortedCourses = [...this.courses].sort((a, b) => {
        if (ascending) {
          return a.courseRate - b.courseRate; // 升序排序
        } else {
          return b.courseRate - a.courseRate; // 降序排序
        }
      });
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedCourses.slice(startIndex, endIndex);
    },

    // 按照评分人数获取刚好一页课程
    getSortedCoursesByRateNum(page: number): CourseState[] {
      const sortedCourses = [...this.courses].sort((a, b) => b.courseRateNum - a.courseRateNum);
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedCourses.slice(startIndex, endIndex);
    },

    // 获取课程数组的大小
    getCoursesSize() {
      return this.courses.length;
    },

    // 返回所有课程名称
    getAllCourseNames(): string[] {
      return [...new Set(this.courses.map(course => course.courseName))];
    },
    
    getTeachersByCourseName(courseName: string): string[] {
      const teachers = this.courses
        .filter(course => course.courseName === courseName)
        .map(course => course.courseTeacher);
      return [...new Set(teachers)]; // 去重并返回
    },

    getCourseByNameAndTeacher(courseName: string, teacherName : string) : Number | null {
      const course = this.courses.find(
        course => course.courseName === courseName && course.courseTeacher === teacherName
      );
      if (course) {
        return course.courseId; 
      }
      else {
        return null;
      }
    },

    getCourseYears(courseName: string, teacherName: string): string[] {
      const course = this.courses.find(
        course => course.courseName === courseName && course.courseTeacher === teacherName
      );

      if (course) {
        return course.courseYear; // 返回课程年份数组
      }

      return []; // 如果未找到匹配的课程，返回空数组
    },

  },
});
