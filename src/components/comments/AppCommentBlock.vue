<script setup lang="ts">
import { defineProps, computed } from "vue";
import AppCommentBubble from "@/components/comments/AppCommentBubble.vue";
import AppAvatar from "@/components/AppAvatar.vue";
import { IComment } from "@/types/components";

interface IProps {
 comment: IComment;
}

const props = defineProps<IProps>();

const countTotalComments = (replies: Record<string, IComment> | undefined): number => {
 if (!replies) return 0;
 return Object.values(replies).reduce((acc, reply) => {
  return acc + 1 + countTotalComments(reply.replies);
 }, 0);
};

const countTotalLikes = (comment: IComment): number => {
 const repliesLikes = comment.replies
   ? Object.values(comment.replies).reduce((acc, reply) => acc + countTotalLikes(reply), 0)
   : 0;
 return comment.likes + repliesLikes;
};

const totalComments = computed(() => countTotalComments(props.comment.replies));

const totalLikes = computed(() => countTotalLikes(props.comment));
</script>

<template>
 <div class="block">
  <app-avatar :name="comment.userName" />
  <app-comment-bubble
    :text="comment.text"
    :name="comment.userName"
    :date="comment.createdAt"
    :likes="totalLikes"
    :comments-count="totalComments"
  />
 </div>

 <div v-if="comment.replies" class="replies">
  <app-comment-block
    v-for="reply in Object.values(comment.replies)"
    :key="reply.id"
    :comment="reply"
  />
 </div>
</template>

<style scoped lang="scss">
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

.block, .replies {
 margin-bottom: 40px;
}
</style>
