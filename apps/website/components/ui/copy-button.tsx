"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<button
			className="absolute right-4 top-4 z-20 h-8 w-8 rounded-md border bg-background/50 p-1.5 backdrop-blur-sm transition-all hover:bg-background/80"
			onClick={copy}
			type="button"
		>
			{isCopied ? (
				<CheckIcon className="h-full w-full text-green-500" />
			) : (
				<CopyIcon className="h-full w-full text-gray-400" />
			)}
		</button>
	);
}
