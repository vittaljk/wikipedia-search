import DOMPurify from 'dompurify';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export function purify(snippet): string {
  return DOMPurify.sanitize(snippet) as string;
}
