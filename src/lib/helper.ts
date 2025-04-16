import { Review } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatTimeToNow(date: Date | string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi });
}

type ReviewSorted<T extends Review> = {
    children: ReviewSorted<T>[];
    maxCreatedAt: Date;
} & T;

export function buildSortedComments<T extends Review>(comments: T[]): T[] {
    // Bước 1: Chuyển sang dạng ReviewSorted
    const commentMap = new Map<string, ReviewSorted<T>>();
    const roots: ReviewSorted<T>[] = [];

    const commentList: ReviewSorted<T>[] = comments.map((comment) => {
        const createdAt = new Date(comment.createdAt);
        const newComment: ReviewSorted<T> = {
            ...comment,
            createdAt,
            children: [],
            maxCreatedAt: createdAt
        };
        commentMap.set(comment.id, newComment);
        return newComment;
    });

    // Bước 2: Tạo cây cha-con
    commentList.forEach((comment) => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.children.push(comment);
            }
        } else {
            roots.push(comment);
        }
    });

    // Bước 3: Tính maxCreatedAt của từng nhánh
    const computeMaxCreatedAt = (comment: ReviewSorted<T>): Date => {
        let max = comment.maxCreatedAt;
        for (const child of comment.children) {
            const childMax = computeMaxCreatedAt(child);
            if (childMax > max) max = childMax;
        }
        comment.maxCreatedAt = max;
        return max;
    };

    roots.forEach(computeMaxCreatedAt);

    // Bước 4: Duyệt DFS theo nhánh mới nhất trước
    const sorted: T[] = [];

    const dfs = (comment: ReviewSorted<T>) => {
        sorted.push(comment);
        comment.children.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).forEach(dfs);
    };

    roots.sort((a, b) => b.maxCreatedAt.getTime() - a.maxCreatedAt.getTime()).forEach(dfs);

    return sorted;
}
