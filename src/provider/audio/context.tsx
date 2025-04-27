'use client';
// import apiEbook from '@/api/ebook';
// import { useQuery } from '@tanstack/react-query';
import AudioPlayer from '@/components/controll/AudioPlayer';
import { Author, Category, Ebook, Voice } from '@prisma/client';
import React from 'react';

export interface EbookInterface extends Ebook {
    author?: Author | null;
    categories: Category[];
}

export type AudioType = {
    isShowPlayer: boolean;
    ebook?: EbookInterface;
    voice?: Voice;
    playlist: EbookInterface[];
    modePlay: 'repeat' | 'next' | 'none';
    isPlaying: boolean;
    favorite: {
        isFavorite: boolean;
        stateFavorite: boolean;
    };
    like: {
        isLike: boolean;
        stateLiked: boolean;
    };
    follow: {
        isFollow: boolean;
        stateFollowed: boolean;
    };
};

export type AudioContextType = {
    audio: AudioType;
    setAudio: React.Dispatch<React.SetStateAction<AudioType>>;
};

export const AudioContext = React.createContext<AudioContextType | null>(null);

export const defaultAudio: AudioType = {
    playlist: [],
    isShowPlayer: false,
    modePlay: 'none',
    isPlaying: false,
    favorite: {
        isFavorite: false,
        stateFavorite: false
    },
    like: {
        isLike: false,
        stateLiked: false
    },
    follow: {
        isFollow: false,
        stateFollowed: false
    }
};
const AudioProvider = (props: { children: React.ReactNode }) => {
    const [audio, setAudio] = React.useState<AudioType>(defaultAudio);
    // const { data } = useQuery({
    //     queryKey: ['ebook', audio.slugEbook],
    //     queryFn: async () => apiEbook.getEbookPageDetail({ slug: audio.slugEbook! }),
    //     enabled: !!audio.slugEbook
    // });
    // React.useEffect(() => {
    //     if (audio.slugEbook && data) {
    //         setAudio((prev) => ({
    //             ...prev,
    //             ebook: {
    //                 ...data,
    //                 categories: data.categories.map((item) => item.category)
    //             },
    //             favorite: {
    //                 isFavorite: data.isFavorite,
    //                 stateFavorite: data.isFavorite
    //             },
    //             follow: {
    //                 isFollow: data.isFollow,
    //                 stateFollowed: data.isFollow
    //             },
    //             like: {
    //                 isLike: data.isLike,
    //                 stateLiked: data.isLike
    //             },
    //         }));
    //     }
    // }, [audio.slugEbook, data]);
    return (
        <AudioContext.Provider value={{ audio, setAudio }}>
            {props.children}
            {audio.isShowPlayer && <AudioPlayer />}
        </AudioContext.Provider>
    );
};

export default AudioProvider;

export const useAudio = () => {
    const context = React.use(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within a AudioProvider');
    }
    return context;
};
export const useAudioState = () => {
    const context = React.use(AudioContext);
    if (!context) {
        throw new Error('useAudioState must be used within a AudioProvider');
    }
    return context.audio;
};

export const useSetAudio = () => {
    const context = React.use(AudioContext);
    if (!context) {
        throw new Error('useSetAudio must be used within a AudioProvider');
    }
    return context.setAudio;
};
