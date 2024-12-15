import { defineStore } from 'pinia'
import type { PostState, ReviewState } from '../types'
import type { SelectProps } from 'tdesign-vue-next'
import axios from 'axios';
import { ErrorCode } from '@/constants/error-codes'
import { useUserStore } from './userStore';
import { useCourseStore } from './courseStore';
import type { post } from 'node_modules/axios/index.cjs';
import { ErrorCodes } from 'vue';
import { useRouter } from 'vue-router';
import type { BlockLike } from 'typescript';

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
              if (postResponse.data.feedback) {
                let parsedData = JSON.parse(postResponse.data.feedback) as PostState;
                parsedData.postId = parseInt(id);
                if (parsedData.postId && parsedData.postId != 0) {
                  try {
                    const commentResponse = await axios.get(`/api/posts/get-comments?id=${id}`)
                    const commentIds = commentResponse.data.comments;
                    if (commentIds) {
                      for (const commentId of commentIds) {
                        try {
                          const queryResponse = await axios.get(`/api/comments/query?id=${commentId}`)
                          if (queryResponse.data.data) {
                            let parsedComment = JSON.parse(queryResponse.data.data) as ReviewState;
                            parsedComment.reviewId = commentId;
                            parsedComment.likeUsers = queryResponse.data.likes
                            parsedData.reviews.push(parsedComment)
                          }
                        }
                        catch (error) {
                          console.error(`Failed to fetch comment with ID ${id}:`, error);
                        }
                      }
                    }
                  } catch (e) {
                    console.error(`Failed to fetch comment with ID ${id}:`, e);
                  }
                  try {
                    const likeResponse = await axios.get(`/api/posts/liked-by?id=${id}`);
                    if (likeResponse.data.liked_by) {
                      const likes = likeResponse.data.liked_by;
                      parsedData.likeUsers = likes.length;
                    }
                    else {
                      parsedData.likeUsers = 0;
                    }
                  }
                  catch (error) {
                    console.error(`Failed to fetch likes with ID ${id}:`, error);
                  }
                  allPosts.push(parsedData); 
                }
              }
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

    async fetchReviewLikes(commentId : number) : Promise<number> {
      try {
        const queryResponse = await axios.get(`/api/comments/query?id=${commentId}`)
        if (queryResponse.data.data) {
          let parsedComment = JSON.parse(queryResponse.data.data) as ReviewState;
          return queryResponse.data.likes;
        }
        return -1;
      }
      catch (error) {
        console.error(`Failed to fetch comment with ID ${commentId}:`, error);
      }
      return -1;
    },

    async addPost(post: PostState, verificationCode: string) : Promise<number> {
      this.posts.push(post);
      let course_name = `${post.course}-${post.teacher}`;
      const jsonString = JSON.stringify(post)
      try {
        const response = await axios.post(`/api/posts/new?token=${verificationCode}`,{
          course_name: course_name,
          recommendation: post.content.rate,
          feedback: post,
          data: post.content.comment
        }); // 发送GET请求到后端API
        if (response.data.result == 'ok') {
            console.log("Successfully upload post!");
            post.postId = response.data.post_id;
            const userStore = useUserStore();
            userStore.pushPost(post);
            const courseStore = useCourseStore();
            courseStore.upDateParams(
              post.course,
              post.teacher
            );
            return post.postId;
        }
        return 0;
      } catch (error : any) {
        let errorMessage = "";
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error == 5) {
            const router = useRouter();
            alert("登录已失效！")
            router.push({ path : "/login" });
          }
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
        return 0;
      }
      return 0;
    },

    async modifyPost(post: PostState, verificationCode: string) : Promise<number> {
      let course_name = `${post.course}-${post.teacher}`;
      const jsonString = JSON.stringify(post)
      try {
        const response = await axios.post(`/api/posts/modify?token=${verificationCode}&post_id=${post.postId}`,{
          course_name: course_name,
          recommendation: post.content.rate,
          feedback: post,
          data: post.content.comment
        }); // 发送GET请求到后端API
        if (response.data.result == 'ok') {
            console.log("Successfully upload post!");
            return post.postId;
        }
        return 0;
      } catch (error : any) {
        let errorMessage = "";
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error == 5) {
            const router = useRouter();
            alert("登录已失效！")
            router.push({ path : "/login" });
          }
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
        return 0;
      }
      return 0;
    },

    async addCommentToPost(comment: ReviewState, verificationCode: string) {
        // 遍历 posts 数组，找到匹配 toPostId 的帖子
      try {
        const datatString = JSON.stringify(comment)
        const response = await axios.post(`/api/posts/add-comment?token=${verificationCode}&id=${comment.toPostId}`,{
          data: datatString
        }); // 发送GET请求到后端API
        if (response.data.result == 'ok') {
          console.log(response.data)
            comment.reviewId = response.data.comment_id;
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
        }
      } catch (error : any) { 
        if (error.response.data.error == 5) {
          const router = useRouter();
          alert("登录已失效！")
          router.push({ path : "/login" });
        }
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
    getPostsByAuthorId(authorId : number): PostState[] {
      return this.posts.filter(post => post.authorId === authorId);
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

    async getMTimeSortedPostsByAuthorId(authorId: number, page: number) : Promise<PostState[]> {
      const userStore = useUserStore();
      const posts = await userStore.getPosts(authorId);
      let filteredPosts = [...this.posts];
      filteredPosts = filteredPosts.filter(post => posts.includes(post.postId));
      const sortedPosts = [...filteredPosts].sort((a, b) => {
        const timeA = new Date(a.mtime).getTime();
        const timeB = new Date(b.mtime).getTime();
        return timeB - timeA;
      });
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedPosts.slice(startIndex, endIndex);
    },

    async getLikes(postId : number) : Promise<number> {
      try {
        const response = await axios.get(`/api/posts/liked-by?id=${postId}`);
        console.log(response.data);
        if (response.data.liked_by) {
          const ids = response.data.liked_by;
          return ids.length;
        }
        else {
          return 0;
        }
      }
      catch (error : any) {
        console.log(error.response.data)
      }
      return 0;
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
          return b.likeUsers - a.likeUsers; // 最热（likeNum 从高到低）
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

    async checkUserLikeOrNotPost(postId : number) : Promise<boolean> {
      try {
        const userStore = useUserStore();
        const response = await axios.get(`/api/posts/liked-by?id=${postId}`);
        console.log(response.data);
        if (response.data.liked_by) {
          const ids = response.data.liked_by;
          return ids.includes(userStore.getNowUser().userId);
        }
        else {
          return false;
        }
      }
      catch (error : any) {
        console.log(error.response.data)
      }
      return false;
    },

    async checkUserLikeOrNotComment(commentId : number) : Promise<boolean> {
      try {
        const userStore = useUserStore();
        const response = await axios.get(`/api/comments/liked-by?id=${commentId}`);
        console.log(response.data);
        if (response.data.liked_by) {
          const ids = response.data.liked_by;
          return ids.includes(userStore.getNowUser().userId);
        }
        else {
          return false;
        }
      }
      catch (error : any) {
        console.log(error.response.data)
      }
      return false;
    },
    
  },
});
