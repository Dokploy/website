"use client";

import { cn } from "@/lib/utils";
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
				<img src={src} alt={alt} className={cn("object-cover", className)} />
			</PhotoView>
		</PhotoProvider>
	);
}
