import { useState, useEffect } from 'react';
import api from '../services/axios.ts';
import { Card } from '../components/Card';
import { ThemeToggle } from '../components/ThemeToggle';

export interface SkipData {
    id: string;
    size: number;
    hire_period_days: number;
    transport_cost: number | null;
    per_tonne_cost: number | null;
    price_before_vat: number;
    vat: number;
    postcode: string;
    area: string | null;
    forbidden: boolean;
    created_at: string;
    updated_at: string;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
}

export const Home = () => {
    const [data, setData] = useState<SkipData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get<SkipData[]>('/skips/by-location', {
                    params: {
                        postcode: 'NR32',
                        area: 'Lowestoft'
                    }
                });
                setData(response.data);
            } catch (err) {
                setError('Erro ao buscar dados');
                console.error('Erro na requisição:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center min-h-screen bg-bgContrast text-text">Carregando...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-bgContrast">Erro: {error}</div>;

    return (
        <div className="container w-full flex flex-col justify-center mx-auto px-4 py-8 min-h-screen">
            <ThemeToggle />
            <h1 className="text-2xl font-bold mb-6 text-text">Available Skips</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.map((skip) => (
                    <Card key={skip.id} skip={skip} />
                ))}
            </div>
        </div>
    );
};