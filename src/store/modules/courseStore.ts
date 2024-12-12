import { defineStore } from 'pinia'
import type { CourseState } from '../types'
import axios from 'axios';

export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: [] as CourseState[], // 定义 courses 类型为 Course 数组
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get('/api/courses/get-all');
        const courseIds = response.data.courses; // 假设这是一个包含所有课程ID的数组
 
        // 如果API支持批量查询，你可以在这里构造一个批量查询的请求
        // 但由于假设API不支持，我们将逐个查询每个课程的详细信息
        const allCourses: CourseState[] = [];
        if (courseIds) {
          for (const id of courseIds) {
            try {
              const courseResponse = await axios.get(`/api/courses/query?id=${id}`);
              console.log(courseResponse.data)
              let jsonString = courseResponse.data.profile;
              jsonString = jsonString.replace(/\\\"/g,'"');
              jsonString = jsonString.replace(/\"\"/g,'');
              console.log(jsonString);
              let parsedData : CourseState = JSON.parse(jsonString) as CourseState;
              console.log(parsedData)
              parsedData.courseId = parseInt(id);
              parsedData.courseName = courseResponse.data.name.split('-')[0];
              parsedData.courseTeacher = courseResponse.data.name.split('-').length > 1 ? 
              courseResponse.data.name.split('-').slice(1).join('-') : '';
              parsedData.courseYear.push("2024秋");
              if (parsedData.courseId) {
                console.log(id)
                console.log(parsedData)
                allCourses.push(parsedData); // 假设后端返回的是单个课程的详细信息，且格式与CourseState兼容
              }
            } catch (error) {
              console.error(`Failed to fetch course with ID ${id}:`, error);
              // 可以选择在这里处理错误，比如记录日志、跳过当前ID等
            }
          }
        }
 
        // 更新store中的courses状态
        this.courses = allCourses;
        console.log("fetch courses successfully")
      }catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },
    
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
