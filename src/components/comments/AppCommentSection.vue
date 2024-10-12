<script setup lang="ts">
import { useComments } from '@/composables/useComments'
import { useAuth } from '@/composables/useAuth'
import AppCommentForm from '@/components/comments/AppCommentForm.vue'
import AppCommentBlock from '@/components/comments/AppCommentBlock.vue'
import { ref, onMounted } from 'vue'
import {useToaster} from "@/composables/useToaster.ts";

const { comments, loadComments, saveComment } = useComments()
const { user } = useAuth()
const { addToast } = useToaster()

const newComment = ref('')

onMounted(async () => {
  try {
    await loadComments()
  } catch (e) {
    addToast(`Error fetching comments: ${e}`, 'error')
  }
})

const handleSubmit = async (
  commentText: string,
  parentId: string | null = null,
) => {
  if (user.value) {
    const commentData = {
      text: commentText,
      userId: user.value.uid,
      userName: user.value.displayName || user.value.email,
      userEmail: user.value.email,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: {},
    }

    await saveComment(commentData, parentId)
    newComment.value = ''

    await loadComments()
  } else {
    addToast('User is not authenticated')
  }
}
</script>

<template>
  <div class="section">
    <app-comment-form
      class="form"
      v-model="newComment"
      @submit-form="handleSubmit"
    />

    <div v-for="comment in comments" :key="comment.id">
      <app-comment-block
        :comment="comment"
        parent-path="comments"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {
  max-width: 100%;
  width: 660px;
  display: flex;
  flex-direction: column;
}

.form {
  margin-bottom: 40px;
}
</style>
