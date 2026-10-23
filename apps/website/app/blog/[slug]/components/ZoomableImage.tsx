"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface ZoomableImageProps {
	src: string;
	alt: string;
	className?: string;
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
	return (
		<PhotoProvider>
			<PhotoView src={src}>
				<img src={src} alt={alt} className={className} />
			</PhotoView>
		</PhotoProvider>
	);
}
