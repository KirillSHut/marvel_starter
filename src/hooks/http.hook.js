import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = "GET", body = null, headers = { 'Content-type': 'application/json' }) => {

        setProcess('loading')
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Coudn't fetch url: ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            return data;

        } catch (e) {
            setProcess('error')
            throw e;
        }
    })

    const clearError = () => {
        setProcess('waiting')
    }

    return { process, setProcess, request, clearError };
}