'use client'; // Error boundaries must be Client Components
export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    );
}
