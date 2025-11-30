'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

interface Tag {
	id: string
	name: string
	slug: string
}

interface SearchAndFilterProps {
	tags: Tag[]
	initialSearch: string
	initialTag: string
	searchPlaceholder: string
	allTagsText: string
}

const ALL_TAGS_VALUE = 'all'

export function SearchAndFilter({
	tags,
	initialSearch,
	initialTag,
	searchPlaceholder,
	allTagsText,
}: SearchAndFilterProps) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const handleTagChange = (value: string) => {
		const searchParams = new URLSearchParams(window.location.search)
		if (value && value !== ALL_TAGS_VALUE) {
			searchParams.set('tag', value)
		} else {
			searchParams.delete('tag')
		}
		startTransition(() => {
			router.push(`?${searchParams.toString()}`)
		})
	}

	const debouncedCallback = useDebounce((value: string) => {
		const searchParams = new URLSearchParams(window.location.search)
		if (value) {
			searchParams.set('search', value)
		} else {
			searchParams.delete('search')
		}
		startTransition(() => {
			router.push(`?${searchParams.toString()}`)
		})
	}, 300)

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			debouncedCallback(e.target.value)
		},
		[debouncedCallback],
	)

	return (
		<div className="mb-8 flex flex-col gap-4 md:flex-row">
			<div className="relative flex-1">
				<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
					<Search className="h-5 w-5 text-gray-400" />
				</div>
				<input
					type="text"
					defaultValue={initialSearch}
					onChange={handleSearch}
					placeholder={searchPlaceholder}
					className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-4 ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>
			<div className="w-full md:w-64">
				<Select
					defaultValue={initialTag || ALL_TAGS_VALUE}
					onValueChange={handleTagChange}
				>
					<SelectTrigger>
						<SelectValue placeholder={allTagsText} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={ALL_TAGS_VALUE}>
							{allTagsText}
						</SelectItem>
						{tags.map((tag) => (
							<SelectItem key={tag.id} value={tag.slug}>
								{tag.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
