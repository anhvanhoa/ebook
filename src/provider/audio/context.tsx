'use client';
import AudioPlayer from '@/components/controll/AudioPlayer';
import { Author, Category, Ebook, Voice } from '@prisma/client';
import React from 'react';

interface EbookInterface extends Ebook {
    author: Author;
    categories: Category[];
}

export type AudioContextType = {
    audio: {
        isShowPlayer: boolean;
        ebook?: EbookInterface;
        voice?: Voice;
        controls: {
            isPlay: boolean;
            currentTime: number;
            duration: number;
            progress: number;
            volume: number;
        };
        playlist: EbookInterface[];
    };
    setAudio: React.Dispatch<React.SetStateAction<AudioType>>;
};

export type AudioType = AudioContextType['audio'];

export const AudioContext = React.createContext<AudioContextType | null>(null);

export const defaultAudio: AudioType = {
    playlist: [],
    isShowPlayer: true,
    controls: {
        currentTime: 0,
        duration: 0,
        isPlay: false,
        progress: 0,
        volume: 100
    },
    ebook: {
        authorId: 'author-id',
        categories: [
            {
                id: 'category-id',
                name: 'Thể loại ma carket hay nhất',
                slug: 'category-slug',
                description: 'Category Description'
            }
        ],
        views: 0,
        id: 'ebook-id',
        createdAt: new Date(),
        description: 'Ebook Description',
        language: 'vn',
        publishedDate: new Date(),
        slug: 'ebook-slug',
        status: 'published',
        coverImage: '/images/ebook.webp',
        title: 'Ebook Title',
        author: {
            id: 'author-id',
            penName: 'Author Name',
            bio: 'Author Bio',
            createdAt: new Date(),
            userId: 'user-id'
        },
        source: 'source',
        summary: 'Ebook Summary'
    },
    voice: {
        createdAt: new Date(),
        ebookId: 'ebook-id',
        id: 'voice-id',
        fileUrl: 'https://sachnoiviet.net/audio/du-duyen.mp3',
        name: 'Voice Name'
    }
};
const AudioProvider = (props: { children: React.ReactNode }) => {
    const [audio, setAudio] = React.useState<AudioType>(defaultAudio);
    return (
        <AudioContext.Provider value={{ audio, setAudio }}>
            {props.children}
            {audio.isShowPlayer && <AudioPlayer />}
        </AudioContext.Provider>
    );
};

export default AudioProvider;

export const useAudio = () => {
    const context = React.useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within a AudioProvider');
    }
    return context;
};
export const useAudioState = () => {
    const context = React.useContext(AudioContext);
    if (!context) {
        throw new Error('useAudioState must be used within a AudioProvider');
    }
    return context.audio;
};

export const useSetAudio = () => {
    const context = React.useContext(AudioContext);
    if (!context) {
        throw new Error('useSetAudio must be used within a AudioProvider');
    }
    return context.setAudio;
};
