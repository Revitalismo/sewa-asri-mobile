import { useEffect, useState } from 'react';

interface ReviewsDetail {
    id: string;
    user: {
        name: string;
        photo: string;
    };

    date: string;
    rating: number;
    comment: string;
}

interface Reviews {
    rating: {
        average: number;
        totalReviews: number;
        total_rating_1: number;
        total_rating_2: number;
        total_rating_3: number;
        total_rating_4: number;
        total_rating_5: number;
    },

    reviews: [ReviewsDetail];
}

function useReviews(villaId: string) {
    const [data, setData] = useState<Reviews | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(true);

    const url = `https:sewa-asri/api/v1/reviews/${villaId}`;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }    
        }

        fetchData();
    }, []);
    
    return { data, loading, error };
}