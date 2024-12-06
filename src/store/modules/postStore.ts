import { defineStore } from 'pinia'
import type { PostState, ReviewState } from '../types'

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [
      {
        postId: 1,
        author: "张三",
        avatar: "https://example.com/avatar1.jpg",
        time: "2024-12-05 14:00",
        mtime: "2024-12-05 14:00",
        course: "计算机网络",
        teacher: "李建华",
        courseYear: "2024春",
        content: {
          difficulty: 4,   // 较难
          workload: 3,     // 适中
          grading: 4,      // 较好
          gain: 5,         // 很大
          rate: 4.5,       // 评分为4.5
          comment: `
    # 计算机网络课程评估
    
    这门课程的内容非常实用，老师讲解得非常清晰，但作业量稍大。以下是我的具体评价：
    
    - **课程难度**：较难，但内容有一定的挑战性，学习后能掌握非常有价值的技能。
    - **作业量**：适中，作业量虽然较大，但能够帮助加深理解。
    - **给分情况**：较好，老师评分公正，注重实际能力。
    - **收获**：非常大，课程内容涵盖了网络的各个方面，学习后能大大提升自己对计算机网络的理解。
    
    总体来说，是一门值得推荐的课程！
    `
        },
        likeNum: 0,
        reviews: [],
        showAuthor: true,
        showAvatar: true
      },
      {
        postId: 2,
        author: "李四",
        avatar: "https://example.com/avatar2.jpg",
        time: "2024-12-05 15:30",
        mtime: "2024-12-05 15:30",
        course: "数据库原理",
        courseYear: "2024春",
        teacher: "王五",
        content: {
          difficulty: 3,   // 适中
          workload: 2,     // 较少
          grading: 5,      // 很好
          gain: 4,         // 较大
          rate: 4.2,       // 评分为4.2
          comment: `
    ## 数据库原理课程评估
    
    课程内容有一定难度，但整体讲解得很好，作业量适中，收获较大。以下是我的具体评价：
    
    1. **课程难度**：适中，虽然有些概念难以理解，但讲解得比较详细。
    2. **作业量**：较少，作业量不大，能有效巩固所学知识。
    3. **给分情况**：非常好，老师评分非常公正，且严格按照标准评定。
    4. **收获**：较大，学习到很多数据库设计的理论和实践技巧，受益匪浅。
    
    如果你对数据库设计感兴趣，强烈推荐这门课程！
    `
        },
        likeNum: 0,
        reviews: [],
        showAuthor: false,
        showAvatar: true
      },
      {
        postId: 3,
        author: "赵六",
        avatar: "https://example.com/avatar3.jpg",
        time: "2024-12-06 10:00",
        mtime: "2024-12-06 10:00",
        course: "操作系统",
        courseYear: "2024春",
        teacher: "孙七",
        content: {
          difficulty: 2,   // 较易
          workload: 4,     // 较多
          grading: 3,      // 中等
          gain: 3,         // 中等
          rate: 3.5,       // 评分为3.5
          comment: `
    ### 操作系统课程评估
    
    课程内容不算很难，但作业量稍多，评分也比较公正。以下是我的详细评价：
    
    - **课程难度**：较易，适合计算机专业的基础学习者。
    - **作业量**：较多，作业量虽然偏多，但都能帮助理解理论部分。
    - **给分情况**：中等，给分标准较为公正，但偶尔会有一些小细节需要注意。
    - **收获**：中等，了解了操作系统的基本原理，但课程内容稍显基础。
    
    总体来说，适合想了解操作系统基本知识的同学，但如果希望深入了解操作系统，可能需要额外的学习。
    `
        },
        likeNum: 0,
        reviews: [],
        showAuthor: true,
        showAvatar: false
      },
      {
        postId: 4,
        author: "王八",
        avatar: "https://example.com/avatar4.jpg",
        time: "2024-12-07 08:00",
        mtime: "2024-12-07 08:00",
        course: "人工智能",
        courseYear: "2024春",
        teacher: "周八",
        content: {
          difficulty: 5,   // 困难
          workload: 5,     // 很多
          grading: 2,      // 较差
          gain: 4,         // 较大
          rate: 2.0,       // 评分为2.0
          comment: `
    # 人工智能课程评估
    
    这门课程内容非常具有挑战性，作业量很大，给分也很严格。以下是我的具体评价：
    
    ## 优点：
    - **课程难度**：困难，内容涉及到大量的数学基础，学习上有一定难度。
    - **作业量**：很多，作业量十分庞大，有时候会感觉有点吃力。
    - **给分情况**：较差，给分较为严格，部分同学可能会感觉评分偏低。
    - **收获**：较大，虽然课程很难，但能够学到很多人工智能领域的核心知识。
    
    ## 总结：
    这门课对于想深入学习人工智能的同学非常合适，但如果对数学不够有信心，可能会感到有点吃力。
    `
        },
        likeNum: 0,
        reviews: [],
        showAuthor: true,
        showAvatar: true
      }
    ] as PostState[], // 定义 posts 类型为 post 数组
  }),
  actions: {
    // 新增评论
    addPost(post: PostState) {
      this.posts.push(post);
    },

    // 根据课程名获取评论
    getPostsByCourse(courseName: string): PostState[] {
      return this.posts.filter((post) => post.course === courseName);
    },

    // 根据作者名获取评论
    getPostsByAuthor(author: string): PostState[] {
      return this.posts.filter(post => post.author === author);
    },

    // 根据教师名获取评论
    getPostsByTeacher(teacher: string): PostState[] {
      return this.posts.filter(post => post.teacher === teacher);
    },

    // 获取所有评论
    getAllPosts(): PostState[] {
      return this.posts;
    },

    // 按照时间顺序获取一页评论
    getSortedPosts(page: number): PostState[] {
      const sortedPosts = [...this.posts].sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeB - timeA;
      });
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      return sortedPosts.slice(startIndex, endIndex);
    },
    // 获取评论数组的大小
    getPostsSize() {
      return this.posts.length;
    },

    // 点赞！！！
    updateLikeNum(postId: number) {
      const updatedPosts = this.posts.map(post =>
        post.postId === postId
          ? { ...post, likeNum: post.likeNum + 1 }
          : post
      );
      this.posts = updatedPosts;
    },

    // 添加评论
    addReview(review: ReviewState, postId: number) {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        post.reviews.push(review);
      } else {
        console.error(`No post found with postId: ${postId}`);
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
    getPostById(postId: number): { postId: number; author: string; avatar: string } | null {
      const post = this.posts.find(p => p.postId === postId);
      if (post) {
        return {
          postId: post.postId,
          author: post.author,
          avatar: post.avatar,
        };
      } else {
        return null;
      }
    },
  },
});
