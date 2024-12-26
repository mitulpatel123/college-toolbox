export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDescription = (desc?: string): boolean => {
  return !desc || desc.length <= 120;
};