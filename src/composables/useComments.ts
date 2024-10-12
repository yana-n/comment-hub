import { db } from '@/firebaseConfig.ts'
import { IComment } from '@/types/components'
import { set, onValue, push, ref, get, update } from 'firebase/database'
import { ref as VRef } from 'vue'
import { getCommentLevelFromPath } from '../utils'
import { MAX_COMMENT_LEVEL } from '../constants.ts'

interface IUserData {
  text: string
  userId: string | null
  userName: string | null
  userEmail: string | null
  currentLevel: number
  replyId?: string | null
}

const comments = VRef<IComment[]>([])

export const useComments = () => {
  const saveComment = async (
    userData: IUserData,
    parentId?: string,
    path?: string,
  ) => {
    try {
      const commentId = push(ref(db, 'comments')).key

      const commentData = {
        id: commentId,
        text: userData.text,
        userId: userData.userId,
        userName: userData.userName ?? userData.userEmail,
        userEmail: userData.userEmail,
        createdAt: new Date().toISOString(),
        parentId,
        likes: 0,
        replies: {},
      }

      if (!parentId) {
        await set(ref(db, `comments/${commentId}`), commentData)
      } else {
        const currentPath = path ? path : `comments/${parentId}`
        const currentLevel = getCommentLevelFromPath(currentPath)

        let adjustedPath = currentPath
        if (currentLevel >= MAX_COMMENT_LEVEL) {
          const pathSegments = currentPath.split('/')

          adjustedPath = pathSegments
            .slice(
              0,
              pathSegments.indexOf('replies') +
                MAX_COMMENT_LEVEL * 2 -
                (MAX_COMMENT_LEVEL + 1),
            )
            .join('/')
        }

        const parentCommentRef = ref(db, adjustedPath)
        const snapshot = await get(parentCommentRef)

        if (snapshot.exists()) {
          const parentCommentData = snapshot.val()

          if (commentId) {
            parentCommentData.replies = parentCommentData.replies || {}
            parentCommentData.replies[commentId] = commentData
          } else {
            console.error('commentId is null');
          }

          await update(parentCommentRef, parentCommentData)
        } else {
          console.error('Parent comment does not exist')
        }
      }
    } catch (error) {
      console.error('Error saving comment:', error)
    }
  }

  const getComments = () => {
    const commentsRef = ref(db, 'comments')

    return new Promise((resolve, reject) => {
      onValue(
        commentsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const commentsData = snapshot.val()
            const commentsArray = parseComments(commentsData)
            resolve(commentsArray)
          } else {
            console.log('No comments available')
            resolve([])
          }
        },
        reject,
      )
    })
  }

  const toggleLike = async (path: string, userId: string) => {
    const commentRef = ref(db, path)
    const snapshot = await get(commentRef)

    if (!snapshot.exists()) {
      console.error('Comment not found')
      return
    }

    const commentData = snapshot.val()
    const likedByUser = commentData.likedBy?.[userId]

    if (likedByUser) {
      commentData.likes = (commentData.likes || 0) - 1
      delete commentData.likedBy[userId]
    } else {
      commentData.likes = (commentData.likes || 0) + 1
      commentData.likedBy = commentData.likedBy || {}
      commentData.likedBy[userId] = true
    }

    await update(commentRef, commentData)
  }

  const loadComments = async () => {
    try {
      comments.value = await getComments()
    } catch (error) {
      console.error('Error loading comments:', error)
    }
  }

  const parseComments = (data: Record<string, IComment>): IComment[] => {
    return Object.entries(data)
      .map(([key, value]: [string, IComment]) => ({
        id: key,
        ...value,
        replies: value.replies ? parseComments(value.replies) : [],
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
  }

  return {
    comments,
    getComments,
    loadComments,
    saveComment,
    toggleLike,
  }
}
