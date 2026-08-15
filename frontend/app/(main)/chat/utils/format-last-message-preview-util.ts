export const formatLastMessagePreview = (content?: string | null): string => {
  if (!content) return "";

  const trimmedContent = content.trim();
  const MAX_LENGTH = 15;

  if (trimmedContent.length > MAX_LENGTH) {
    return `${trimmedContent.slice(0, MAX_LENGTH)}...`;
  }

  return trimmedContent;
};
