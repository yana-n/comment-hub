<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import AppCommentBubble from '@/components/comments/AppCommentBubble.vue'
import AppAvatar from '@/components/AppAvatar.vue'
import { IComment } from '@/types/components'
import AppCommentForm from '@/components/comments/AppCommentForm.vue'
import { useComments } from '@/composables/useComments.ts'
import { useAuth } from '@/composables/useAuth.ts'
import { useToaster } from '@/composables/useToaster'

interface IProps {
  comment: IComment
  parentPath?: string
}

const props = defineProps<IProps>()

const { saveComment, loadComments } = useComments()
const { user, isAuthenticated } = useAuth()
const { addToast } = useToaster()

const isReplying = ref(false)
const newReply = ref('')

const countTotalComments = (
  replies: Record<string, IComment> | undefined,
): number => {
  if (!replies) return 0

  return Object.values(replies).reduce((acc, reply) => {
    return acc + 1 + countTotalComments(reply.replies)
  }, 0)
}

const countTotalLikes = (comment: IComment): number => {
  const repliesLikes = comment.replies
    ? Object.values(comment.replies).reduce(
        (acc, reply) => acc + countTotalLikes(reply),
        0,
      )
    : 0
  return comment.likes + repliesLikes
}

const handleReplySubmit = async () => {
  if (!newReply || !user.value) return

  const replyData = {
    text: newReply.value,
    userId: user.value.uid,
    userName: user.value.displayName || user.value.email || 'Anonymous',
    userEmail: user.value.email,
    createdAt: new Date().toISOString(),
    parentId: props.comment.id,
    likes: 0,
    replies: {},
  }

  await saveComment(replyData, props.comment.id, commentPath.value)

  newReply.value = ''
  isReplying.value = false

  await loadComments()
}

const commentPath = computed(() => {
  if (!props.comment.parentId) {
    return `comments/${props.comment.id}`
  } else {
    return `${props.parentPath}/replies/${props.comment.id}`
  }
})

const toggleForm = () => (isReplying.value = !isReplying.value)

const handleCounterClick = () => {
  isAuthenticated.value
    ? toggleForm()
    : addToast('Please login to leave comments', 'info')
}

const totalComments = computed(() => countTotalComments(props.comment.replies))
const totalLikes = computed(() => countTotalLikes(props.comment))
</script>

<template>
  <div class="block">
    <app-avatar :name="comment.userName || comment.userEmail" />
    <div class="wrapper">
      <app-comment-bubble
        :id="comment.id"
        :text="comment.text"
        :name="comment.userName || comment.userEmail"
        :date="comment.createdAt"
        :likes="totalLikes"
        :comments-count="totalComments"
        :parent-path="commentPath"
        @counter-click="handleCounterClick"
      />
      <div v-if="isReplying" class="reply-form">
        <app-comment-form
          v-model="newReply"
          :show-btn="false"
          @submit-form="handleReplySubmit"
        />
      </div>
    </div>
  </div>

  <div v-if="comment.replies" class="replies">
    <app-comment-block
      v-for="reply in Object.values(comment.replies)"
      :key="reply.id"
      :comment="reply"
      :parent-path="commentPath"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}

.block {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}

.avatar {
  flex-shrink: 0;
}

.replies {
  margin-left: 40px;
}

.block,
.replies {
  margin-bottom: 40px;
}

.reply-form {
  margin-top: 20px;
}
</style>
