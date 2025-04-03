import { useState, useEffect } from 'react';
import api from '../services/axios';

export interface Skip {
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

interface UseSkipsReturn {
  data: Skip[] | null;
  isLoading: boolean;
  error: Error | null;
}

export const useSkips = (): UseSkipsReturn => {
  const [data, setData] = useState<Skip[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Skip[]>('/skips/by-location', {
          params: {
            postcode: 'NR32',
            area: 'Lowestoft'
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao buscar dados'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}; 