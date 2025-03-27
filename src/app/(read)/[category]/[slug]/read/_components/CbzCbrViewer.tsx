import { useState } from 'react';
import JSZip from 'jszip';

export default function CbzViewer() {
    const [images, setImages] = useState<string[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.name.endsWith('.cbz') || !file.name.endsWith('.zip')) return;
        const zip = await JSZip.loadAsync(file);
        const imageFiles = Object.keys(zip.files)
            .filter((name) => name.match(/\.(jpg|jpeg|png)$/i))
            .sort();

        const imageBlobs = await Promise.all(
            imageFiles.map(async (name) => {
                const blob = await zip.files[name].async('blob');
                return URL.createObjectURL(blob);
            })
        );

        console.log(imageBlobs);

        setImages(imageBlobs);
    };

    return (
        <div className='p-4'>
            <input type='file' accept='.zip' onChange={handleFileChange} />
            <div className='grid grid-cols-2 gap-2 mt-4'>
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Page ${index}`} className='w-full' />
                ))}
            </div>
        </div>
    );
}
