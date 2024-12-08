import { defineStore } from 'pinia'
import type { CourseState } from '../types'

export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: [
      {
        courseId: 1,
        courseName: "计算机网络",
        courseTeacher: "李建华",
        courseYear: ["2024春", "2024秋"],
        courseRate: 4.6,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://scse.buaa.edu.cn/__local/4/19/16/256EA87700037E4DEE08B6C726A_FB09112F_1E27C.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 2,
        courseName: "操作系统",
        courseTeacher: "李建华",
        courseYear: ["2023春", "2023秋"],
        courseRate: 4.4,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://scse.buaa.edu.cn/__local/4/19/16/256EA87700037E4DEE08B6C726A_FB09112F_1E27C.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 3,
        courseName: "数学建模",
        courseTeacher: "王老师",
        courseYear: ["2024春"],
        courseRate: 4.5,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 4,
        courseName: "计算机网络",
        courseTeacher: "杜老师",
        courseYear: ["2023秋", "2024春"],
        courseRate: 4.7,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 5,
        courseName: "c语言",
        courseTeacher: "李建华",
        courseYear: ["2024春"],
        courseRate: 4.2,
        roundRate:4.0,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://scse.buaa.edu.cn/__local/4/19/16/256EA87700037E4DEE08B6C726A_FB09112F_1E27C.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 6,
        courseName: "计算机网络",
        courseTeacher: "王老师",
        courseYear: ["2022秋", "2023春", "2023秋"],
        courseRate: 3.3,
        roundRate:3.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 7,
        courseName: "计算机网络",
        courseTeacher: "彭老师",
        courseYear: ["2024春", "2024秋"],
        courseRate: 4.8,
        roundRate:5.0,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 8,
        courseName: "计算机网络",
        courseTeacher: "石老师",
        courseYear: ["2023春", "2023秋", "2024春"],
        courseRate: 4.6,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
      {
        courseId: 9,
        courseName: "体育养生",
        courseTeacher: "周老师",
        courseYear: ["2022春"],
        courseRate: 4.7,
        roundRate:4.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },  
      {
        courseId: 10,
        courseName: "算法设计",
        courseTeacher: "汪老师",
        courseYear: ["2023春", "2023秋", "2024春"],
        courseRate: 3.5,
        roundRate:3.5,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },      
      {
        courseId: 11,
        courseName: "面向对象程序设计",
        courseTeacher: "高老师",
        courseYear: ["2023春", "2023秋", "2024春"],
        courseRate: 4.9,
        roundRate:5.0,
        courseDifficulty: 3,
        courseWorkload: 4,
        courseGrading: 3,
        courseGain: 4,
        teacherImage: "https://example.com/zhangteacher.jpg",
        courseType: "必修",
        courseDepartment: "数学系",
        courseCredit: 3,
        courseHours: 48,
        courseFollower: 200,
        courseRecommend: 180,
        courseNotRecommend: 20,
        courseRateNum: 180,
      },
        {
          courseId: 12,
          courseName: "计算机组成",
          courseTeacher: "李老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.2,
          roundRate:4.0,
          courseDifficulty: 4,
          courseWorkload: 3,
          courseGrading: 3,
          courseGain: 4,
          teacherImage: "https://example.com/liteacher.jpg",
          courseType: "选修",
          courseDepartment: "计算机系",
          courseCredit: 2,
          courseHours: 32,
          courseFollower: 100,
          courseRecommend: 90,
          courseNotRecommend: 10,
          courseRateNum: 90,
        },
        {
          courseId: 13,
          courseName: "计算机组成",
          courseTeacher: "王老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.0,
          roundRate:4.0,
          courseDifficulty: 3,
          courseWorkload: 4,
          courseGrading: 4,
          courseGain: 3,
          teacherImage: "https://example.com/wangteacher.jpg",
          courseType: "必修",
          courseDepartment: "计算机系",
          courseCredit: 3,
          courseHours: 48,
          courseFollower: 150,
          courseRecommend: 140,
          courseNotRecommend: 10,
          courseRateNum: 140,
        },
        {
          courseId: 14,
          courseName: "数据结构",
          courseTeacher: "张老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.8,
          roundRate:5.0,
          courseDifficulty: 4,
          courseWorkload: 5,
          courseGrading: 4,
          courseGain: 5,
          teacherImage: "https://example.com/zhangteacher.jpg",
          courseType: "必修",
          courseDepartment: "计算机系",
          courseCredit: 3,
          courseHours: 64,
          courseFollower: 300,
          courseRecommend: 280,
          courseNotRecommend: 20,
          courseRateNum: 200,
        },
        {
          courseId: 15,
          courseName: "算法分析",
          courseTeacher: "张老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.7,
          roundRate:4.5,
          courseDifficulty: 5,
          courseWorkload: 4,
          courseGrading: 4,
          courseGain: 5,
          teacherImage: "https://example.com/zhangteacher.jpg",
          courseType: "选修",
          courseDepartment: "计算机系",
          courseCredit: 2,
          courseHours: 40,
          courseFollower: 250,
          courseRecommend: 230,
          courseNotRecommend: 20,
          courseRateNum: 220,
        },
        {
          courseId: 16,
          courseName: "离散数学",
          courseTeacher: "李老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.5,
          roundRate:4.5,
          courseDifficulty: 3,
          courseWorkload: 4,
          courseGrading: 4,
          courseGain: 3,
          teacherImage: "https://example.com/liteacher.jpg",
          courseType: "必修",
          courseDepartment: "数学系",
          courseCredit: 3,
          courseHours: 48,
          courseFollower: 180,
          courseRecommend: 170,
          courseNotRecommend: 10,
          courseRateNum: 180,
        },
        {
          courseId: 17,
          courseName: "线性代数",
          courseTeacher: "李老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.3,
          roundRate:4.5,
          courseDifficulty: 3,
          courseWorkload: 3,
          courseGrading: 4,
          courseGain: 3,
          teacherImage: "https://example.com/liteacher.jpg",
          courseType: "选修",
          courseDepartment: "数学系",
          courseCredit: 3,
          courseHours: 48,
          courseFollower: 120,
          courseRecommend: 110,
          courseNotRecommend: 10,
          courseRateNum: 110,
        },
        {
          courseId: 18,
          courseName: "概率统计",
          courseTeacher: "王老师",
          courseYear: ["2023春", "2023秋", "2024春"],
          courseRate: 4.6,
          roundRate:4.5,
          courseDifficulty: 4,
          courseWorkload: 3,
          courseGrading: 5,
          courseGain: 4,
          teacherImage: "https://example.com/wangteacher.jpg",
          courseType: "选修",
          courseDepartment: "数学系",
          courseCredit: 2,
          courseHours: 32,
          courseFollower: 80,
          courseRecommend: 70,
          courseNotRecommend: 10,
          courseRateNum: 70,
        }
    ] as CourseState[], // 定义 courses 类型为 Course 数组
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
