import { useEffect, useState } from 'react';

interface VillaDetail {
    villaId: string;
    managerId: string;
    image: string;
    name: string;
    price: number;
    bedroomQuantity: number;
    bathroomQuantity: number;
    
    reviews: {
        average: string;
        total: number;
    };
    
    address: {
        city: string;
        detail: string;
    };
}

interface PaymentStatus {
    status: "pending",
    paymentCode: "21314512231",
    time: "10:30 AM",
    date: "2023-11-01",
    paymentMethod: "Credit Card",
    userName: "John Doe"
}

function useVilla() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>("");

    const url = `https:sewa-asri/api/v1/villa`;

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

function useVillaDetail(villaId: string) {
    const [data, setData] = useState<VillaDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>("");

    const url = `https:sewa-asri/api/v1/villa/${villaId}`;

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

function useSearchVilla(
        villaName: string, 
        price: string, 
        location: string, 
        bedroom: number
    ) {

    const [data, setData] = useState<{
        villa: [VillaDetail],
        result: number
    } | null
    >(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>("");

    const sortByPrice = `sortByPrice=${price}`;
    const sortByLocation = `sortByLocation${location}`;
    const sortByBedroom = `sortByLocation${bedroom}`;

    const url = `https://sewa-asri/api/v1/villa?q=${villaName}&${sortByPrice}&${sortByLocation}&${sortByBedroom}`;

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

export { useVillaDetail, useVilla, useSearchVilla };