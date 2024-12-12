import { defineStore } from 'pinia'
import type { PostState, ReviewState } from '../types'
import type { SelectProps } from 'tdesign-vue-next'
import axios from 'axios';
import { ErrorCode } from '@/constants/error-codes'
import { useUserStore } from './userStore';
import { useCourseStore } from './courseStore';

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as PostState[],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get('/api/posts/get-all');
        const postIds = response.data.posts;
        const allPosts: PostState[] = [];
        if (postIds) {
          for (const id of postIds) {
            try {
              const postResponse = await axios.get(`/api/posts/query?id=${id}`);
              console.log(postResponse.data)
              if (postResponse.data.feedback) {
                let parsedData = JSON.parse(postResponse.data.feedback) as PostState;
                console.log(parsedData)
                parsedData.postId = parseInt(id);
                if (parsedData.postId && parsedData.postId != 0) {
                  console.log(id)
                  console.log(parsedData)
                  allPosts.push(parsedData); 
                }
              }
              /*try {
                  const commentResponse = await axios.get(`/api/posts/get-comments?id=${id}`)
                  console.log(commentResponse.data)
                  let parsedComment = JSON.parse(commentResponse.data.profile) as ReviewState;
                  console.log(parsedComment)
              } catch (e) {
                console.error(`Failed to fetch comment with ID ${id}:`, e);
              }*/
            } catch (error) {
              console.error(`Failed to fetch post with ID ${id}:`, error);
            }
          }
          this.posts = allPosts;
          console.log("fetch posts successfully")
        }
      }catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },

    async addPost(post: PostState, verificationCode: string) {
      this.posts.push(post);
      let course_name = `${post.course}-${post.teacher}`;
      console.log(course_name)
      console.log(verificationCode)
      const jsonString = JSON.stringify(post)
      console.log(jsonString)
      try {
        console.log(post)
        const response = await axios.post(`/api/posts/new?token=${verificationCode}`,{
          course_name: course_name,
          recommendation: post.content.rate,
          feedback: post,
          data: post.content.comment
        }); // 发送GET请求到后端API
        console.log(response.data)
        if (response.data.result == 'ok') {
            console.log("Successfully upload post!");
            post.postId = response.data.id;
            console.log(post);
            const userStore = useUserStore();
            userStore.pushPost(post);
            const courseStore = useCourseStore();
            courseStore.upDateParams(
              post.course,
              post.teacher
            );
        }
      } catch (error : any) {
        let errorMessage = "";
        if (error.response && error.response.data && error.response.data.error) {
          console.log(error.response.data)
          switch (error.response.data.error) {
            case ErrorCode.TOKEN_VERIFY_ERROR:
              errorMessage = 'TOKEN错误';
              break;
            case ErrorCode.JSON_ERROR :
              errorMessage = 'json错误';
              break;
            case ErrorCode.UNKNOWN_ERROR:
            default:
              errorMessage = '未知错误';
              break;
          }
          alert(errorMessage);
        } else {
          // 处理非服务器响应错误（如网络错误）
          errorMessage = '请求失败，请检查您的网络连接';
          alert(errorMessage);
        }
      }
    },

    async addCommentToPost(comment: ReviewState, verificationCode: string) {
        // 遍历 posts 数组，找到匹配 toPostId 的帖子
      this.posts = this.posts.map(post => {
        if (post.postId === comment.toPostId) {
          // 将评论添加到该帖子的 reviews 数组中
          return {
            ...post,
            reviews: [...post.reviews, comment],
          };
        }
        return post;
      });
      try {
        console.log(comment)
        const response = await axios.post(`/api/posts/add-comment?token=${verificationCode}&id=${comment.toPostId}`,{
          data: comment
        }); // 发送GET请求到后端API
        console.log(response.data)
        if (response.data.result == 'ok') {
            console.log("Successfully upload!");
            comment.reviewId = response.data.id;
        }
      } catch (error) {
      console.error('Error fetching user info:', error);
      }
    },

    // 根据课程名获取评论
    getPostsByCourse(courseName: string): PostState[] {
      return this.posts.filter((post) => post.course === courseName);
    },

    // 根据课程名教师名和作者名获取唯一评论
    getPostByCourseTeacherAndAuthorId(course: string, teacher: string, authorId: number): PostState | null {
      return this.posts.find(post => post.course === course && post.teacher === teacher && post.authorId === authorId) || null;
    },

    // 根据作者名获取评论
    getPostsByAuthor(author: string): PostState[] {
      return this.posts.filter(post => post.author === author);
    },

    // 根据教师名获取评论
    getPostsByTeacher(teacher: string): PostState[] {
      return this.posts.filter(post => post.teacher === teacher);
    },

    getPostsByCourseAndTeacher(course:string,teacher:string) : PostState[] {
      return this.posts.filter(post => post.course === course && post.teacher === teacher);
    }, 

    // 获取所有评论
    getAllPosts(): PostState[] {
      return this.posts;
    },

    // 按照时间顺序获取一页评论
    getSortedPostsByMTime(page: number): PostState[] {
      const sortedPosts = [...this.posts].sort((a, b) => {
        const timeA = new Date(a.mtime).getTime();
        const timeB = new Date(b.mtime).getTime();
        return timeB - timeA;
      });
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedPosts.slice(startIndex, endIndex);
    },

    getMTimeSortedPostsByAuthorId(authorId: number, page: number) : PostState[] {
      let filteredPosts = [...this.posts];
      filteredPosts = filteredPosts.filter(post => post.authorId === authorId);
      const sortedPosts = [...filteredPosts].sort((a, b) => {
        const timeA = new Date(a.mtime).getTime();
        const timeB = new Date(b.mtime).getTime();
        return timeB - timeA;
      });
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedPosts.slice(startIndex, endIndex);
    },

    filterAndSortPosts(
      course: string,
      teacher: string,
      value1: string, // options1 的 value
      value2?: string, // options2 的 value，可能是 courseYear
      value3?: string // options3 的 value，表示星数
    ): PostState[] {
      // 创建 posts 数组的副本以避免修改原始数组
      let filteredPosts = [...this.posts];
 
      // 根据 course 和 teacher 过滤
      filteredPosts = filteredPosts.filter(post => post.course === course && post.teacher === teacher);
 
      // 如果提供了 value2（courseYear），则进一步过滤
      if (value2) {
        filteredPosts = filteredPosts.filter(post => post.courseYear === value2);
      }
 
      // 如果提供了 value3（星数），则进一步过滤
      if (value3) {
        const starRating = parseInt(value3, 10);
        filteredPosts = filteredPosts.filter(post => (Math.round(Math.round(post.content.rate * 2 - 0.1)/2) >= starRating && Math.round(Math.round(post.content.rate * 2 - 0.1)/2) < starRating + 1));
      }
 
      // 根据 value1 排序
      const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (value1 === 'new') {
          return new Date(b.mtime).getTime() - new Date(a.mtime).getTime(); // 最新（mtime 从新到旧）
        } else if (value1 === 'hot') {
          return b.likeUsers.length - a.likeUsers.length; // 最热（likeNum 从高到低）
        } else if (value1 === 'good') {
          return b.content.rate - a.content.rate; // 评分高-低（rate 从高到低）
        } else if (value1 === 'bad') {
          return a.content.rate - b.content.rate; // 评分低-高（rate 从低到高）
        } else {
          // 如果没有匹配到有效的排序选项或 value1 为 undefined，则默认按 mtime 从新到旧排序
          return new Date(b.mtime).getTime() - new Date(a.mtime).getTime();
        }
      });
 
      // 返回排序后的数组副本，不修改原始 posts 数组
      return sortedPosts;
    },

    // 获取评论数组的大小
    getPostsSize() {
      return this.posts.length;
    },

    getPostId(author: string, course: string, teacher: string) : number {
      const post = this.posts.find((post) => post.author === author && post.course === course && post.teacher === teacher);
      if (!post) {
        console.error(`Course with ID ${author} not found!`);
        throw new Error(`Course with ID ${author} not found.`);
      }
      return post.postId;
    },

    getPostAuthorId(author: string, course: string, teacher: string) : number {
      const post = this.posts.find((post) => post.author === author && post.course === course && post.teacher === teacher);
      if (!post) {
        console.error(`Course with ID ${author} not found!`);
        throw new Error(`Course with ID ${author} not found.`);
      }
      return post.authorId;
    },

    // 点赞！！！
    updateLikeNum(postId: number, userId: number) {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        // 检查 userId 是否已经存在于 likeUsers 中
        if (!post.likeUsers.includes(userId)) {
          // 如果不存在，则添加
          post.likeUsers.push(userId);
        }
      } else {
        console.warn(`No post found with id ${postId}`);
      }
    },

    updateCommentLikeNum(postId: number,reviewId : number, userId: number) {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        // 检查 userId 是否已经存在于 likeUsers 中
        const review = post.reviews.find(r => r.reviewId === reviewId);
        if (review) {
          if (!review.likeUsers.includes(userId)) {
            // 如果不存在，则添加
            review.likeUsers.push(userId);
            console.log("Successfully add likeUser to review")
          } else {
            console.warn(`Has added with id ${postId}`);
          }
        } else {
          console.warn(`No post found with id ${postId}`);
        }
      } else {
        console.warn(`No post found with id ${postId}`);
      }
    },


    // 获取指定 postId 的帖子中的 reviews 数组长度
    getReviewCount(postId: number): number {
      const post = this.posts.find(p => p.postId === postId);
      return post ? post.reviews.length : 0;
    },

    // 修改帖子元素
    updatePostAttributes(postId: number, attributes: Partial<PostState>) {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        if (attributes.author !== undefined) {
          post.author = attributes.author;
        }
        if (attributes.avatar !== undefined) {
          post.avatar = attributes.avatar;
        }
        if (attributes.mtime !== undefined) {
          post.mtime = attributes.mtime;
        }
        if (attributes.course !== undefined) {
          post.course = attributes.course;
        }
        if (attributes.courseYear !== undefined) {
          post.courseYear = attributes.courseYear;
        }
        if (attributes.teacher !== undefined) {
          post.teacher = attributes.teacher;
        }
        if (attributes.content !== undefined) {
          post.content = attributes.content;
        }
      } else {
        console.error(`No post found with postId: ${postId}`);
      }
    },

    // 找到对应的帖子并返回所需属性
    getPostById(postId: number): PostState | null {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        return post;
      } else {
        return null;
      }
    },

    getReviewById(postId: number, reviewId: number): ReviewState | null {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        const review = post.reviews.find(r => r.reviewId === reviewId);
        if (review) {
          return review;
        }
        return null;
      } else {
        return null;
      }
    },
  },
});
