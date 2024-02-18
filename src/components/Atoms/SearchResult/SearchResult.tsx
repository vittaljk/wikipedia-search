import React from 'react';
import { purify, formatDate } from '@/utils';

export interface ISearchResult {
  ns?: number;
  title: string;
  pageid?: number;
  size?: number;
  snippet: string;
  wordcount?: number;
  timestamp: string;
}

export interface IResult {
  result: ISearchResult;
}

const SearchResult: React.FC<IResult> = (props) => {
  const {
    result: { title = '', snippet = null, wordcount = 0, size = 0, timestamp },
  } = props;

  let sanitizedSnippet: string = '';
  if (snippet) {
    sanitizedSnippet = purify(snippet);
  }

  const formattedDate = formatDate(timestamp);
  return (
    <div>
      <div className="text-blue-600">{title}</div>
      <p
        className="text-sm mt-2 mb-1 snippet"
        dangerouslySetInnerHTML={{ __html: sanitizedSnippet }}
      />
      <div className="flex text-sm gap-1 text-slate-500">
        {wordcount && <div>({wordcount} words)</div>}
        {formattedDate && <div>{formattedDate}</div>}
      </div>
    </div>
  );
};

export default SearchResult;
