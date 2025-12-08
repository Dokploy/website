import { useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number,
): T {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return ((...args: Parameters<T>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		return new Promise<ReturnType<T>>((resolve) => {
			timeoutRef.current = setTimeout(() => {
				resolve(callback(...args));
			}, delay);
		});
	}) as T;
}
