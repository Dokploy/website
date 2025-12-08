'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useState } from 'react';

export default function CustomSearchDialog(props: SharedProps) {
  const [tag, setTag] = useState<string | undefined>('all');
  // When tag is "all", don't filter by tag (pass undefined)
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag: tag === 'all' ? undefined : tag,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter>
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem value="all">All</TagsListItem>
            <TagsListItem value="core">Core</TagsListItem>
            <TagsListItem value="cli">CLI</TagsListItem>
            <TagsListItem value="api">API</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
