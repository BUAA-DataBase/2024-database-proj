import { defineStore } from 'pinia'
import type { CommentState } from '../types'

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [] as CommentState[], // 定义 comments 类型为 Comment 数组
  }),
  actions: {
    // 新增评论
    addComment(comment: CommentState) {
      this.comments.push(comment);
    },

    // 根据课程名获取评论
    getCommentsByCourse(courseName: string): CommentState[] {
      return this.comments.filter((comment) => comment.course === courseName);
    },

    // 获取所有评论
    getAllComments(): CommentState[] {
      return this.comments;
    },
  },
});
