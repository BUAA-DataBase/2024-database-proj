import { defineStore } from 'pinia';

interface Course {
  courseName: string;
  courseTeacher: string;
  courseYear: string[];
  courseRate: number;
  courseDescription: string;
  teacherImage: string;
  courseType: string;
  courseDepartment: string;
  courseCredit: number;
  courseHours: number;
  courseFollower: number;
  courseRecommend: number;
  courseNotRecommend: number;
  courseRateNum: number;
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    // 默认课程数据，可能从后端或前端传入
    course: {} as Course,
  }),

  actions: {
    setCourseData(course: Course) {
      this.course = course;
    },

    // 计算推荐比例
    getRecommendationRate(): string {
      const total = this.course.courseRecommend + this.course.courseNotRecommend;
      const recommendRate = (this.course.courseRecommend / total) * 100;
      return `${recommendRate.toFixed(2)}%`;
    },

    // 计算课程评分
    getCourseRating(): string {
      return `Rating: ${this.course.courseRate} based on ${this.course.courseRateNum} ratings`;
    },

    // 计算课程信息
    getCourseInfo(): string {
      return `${this.course.courseName} by ${this.course.courseTeacher} in ${this.course.courseYear.join(", ")}`;
    },
  },

  getters: {
    courseInfo(state): string {
      return `${state.course.courseName} - ${state.course.courseTeacher}`;
    },
    courseFollowers(state): string {
      return `${state.course.courseFollower} followers`;
    },
    courseCreditAndHours(state): string {
      return `${state.course.courseCredit} credits | ${state.course.courseHours} hours`;
    },
  },
});
