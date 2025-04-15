'use client';
import React from 'react';

export type ContextReviewType = {
    review: {
        slug: string;
        id: string;
        content: string;
        rating: number;
        reply?: {
            id: string;
            name: string;
            content: string;
        };
    };
    setReview: React.Dispatch<React.SetStateAction<Review>>;
};

export type Review = ContextReviewType['review'];

export const reviewDefault: Review = {
    id: '',
    slug: '',
    content: '',
    rating: 0,
    reply: undefined
};

export const ReviewContext = React.createContext<ContextReviewType | null>(null);

const ReviewProvider = ({ children, init }: { children: React.ReactNode; init?: Partial<Review | null> }) => {
    const [review, setReview] = React.useState<Review>(() => {
        if (init)
            return {
                ...reviewDefault,
                ...init
            };
        return reviewDefault;
    });
    return <ReviewContext.Provider value={{ review, setReview }}>{children}</ReviewContext.Provider>;
};
export default ReviewProvider;

export const useReviewContext = () => {
    const context = React.useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviewContext must be used within a ReviewProvider');
    }
    return context;
};
