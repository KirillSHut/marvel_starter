import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = { 'Content-type': 'application/json' }) => {

        setLoading(true);
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Coudn't fetch url: ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            if (data.data.results.length === 0) {
                throw new Error(`There is no result fetching: ${url}`)
            }

            setLoading(false);
            return data;

        } catch (e) {
            setLoading(false);
            setError(true);
            throw e;
        }
    })

    const clearError = () => {
        setError(false);
    }

    return { loading, error, request, clearError };
}