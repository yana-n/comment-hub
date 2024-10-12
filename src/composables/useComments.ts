import { db } from '@/firebaseConfig.ts';
import {IComment} from "@/types/components";
import { set, onValue, push, ref } from 'firebase/database';
import {ref as VRef} from 'vue'
import { MAX_COMMENT_LEVEL } from '@/constants.ts'

const comments = VRef<IComment[]>([]);

export const useComments = () => {
    const getComments = () => {
        const commentsRef = ref(db, 'comments');

        return new Promise((resolve, reject) => {
            onValue(
                commentsRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        const commentsData = snapshot.val();
                        const commentsArray = parseComments(commentsData);
                        resolve(commentsArray);
                    } else {
                        console.log('No comments available');
                        resolve([]);
                    }
                },
                reject
            );
        });
    };


    const saveComment = async (text: string, userId: string, userName: string, parentId: string | null = null, currentLevel: number = 1) => {
        try {
            const commentData = {
                id: push(ref(db, 'comments')).key,
                text,
                userId,
                userName,
                createdAt: new Date().toISOString(),
                likes: 0,
                level: currentLevel,
                replies: {}
            };

            if (!parentId) {
                await set(ref(db, `comments/${commentData.id}`), commentData);
            } else {
                const parentRef = ref(db, `comments/${parentId}`);
                const snapshot = await get(parentRef);

                if (snapshot.exists()) {
                    const parentComment = snapshot.val();

                    const nextLevel = currentLevel < MAX_COMMENT_LEVEL ? currentLevel + 1 : MAX_COMMENT_LEVEL;
                    const replyPath = `comments/${parentId}/replies/${commentData.id}`;
                    await set(ref(db, replyPath), { ...commentData, level: nextLevel });
                } else {
                    throw new Error('Parent comment does not exist');
                }
            }
        } catch (error) {
            console.error('Error saving comment:', error);
        }
    };

    const parseComments = (data: any, currentLevel = 1): any[] => {
        return Object.entries(data).map(([key, value]: [string, any]) => {
            const nextLevel = currentLevel < MAX_COMMENT_LEVEL ? currentLevel + 1 : MAX_COMMENT_LEVEL;
            return {
                id: key,
                ...value,
                replies: value.replies ? parseComments(value.replies, nextLevel) : []
            };
        });
    };

    return {
        comments,
        getComments,
        saveComment,
    };
};
