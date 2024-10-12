<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, get, update } from 'firebase/database'
import { useAuth } from '@/composables/useAuth'
import AppIconWithCounter from '@/components/AppIconWithCounter.vue'
import IconLike from '@/assets/images/icons/like.svg'
import { useToaster } from '@/composables/useToaster.ts'
import AppToaster from '@/components/AppToaster.vue'

const props = defineProps<{
  commentId: string
  initialLikes: number
  parentPath?: string
}>()

const likes = ref(props.initialLikes || 0)
const userHasLiked = ref(false)
const userId = ref('')

const db = getDatabase()

const { user, isAuthenticated } = useAuth()
const { addToast } = useToaster()

onMounted(() => {
  if (user.value) {
    userId.value = user.value.uid
  }
  fetchLikes()
})

const fetchLikes = async () => {
  const commentRef = dbRef(db, props.parentPath)
  const snapshot = await get(commentRef)

  if (snapshot.exists()) {
    const commentData = snapshot.val()
    likes.value = commentData.likes || 0
    userHasLiked.value =
      commentData.likedBy && commentData.likedBy[userId.value] === true
  }
}

const toggleLike = async () => {
  if (!user.value) {
    addToast('Please login to be able to vote', 'info')
    return
  }

  const commentRef = dbRef(db, props.parentPath)
  const snapshot = await get(commentRef)

  if (snapshot.exists()) {
    if (userHasLiked.value) {
      likes.value--
      userHasLiked.value = false
      await update(commentRef, {
        likes: likes.value,
        [`likedBy/${userId.value}`]: null,
      })
    } else {
      likes.value++
      userHasLiked.value = true
      await update(commentRef, {
        likes: likes.value,
        [`likedBy/${userId.value}`]: true,
      })
    }
  } else {
    addToast('Comment not found', 'error')
  }
}
</script>

<template>
  <app-toaster />
  <app-icon-with-counter :count="likes" @click="toggleLike">
    <icon-like :class="{ liked: isAuthenticated && userHasLiked }" />
  </app-icon-with-counter>
</template>

<style scoped lang="scss">
.liked {
  color: #5400e3 !important;
  transition: color 0.3s ease;
}
</style>
