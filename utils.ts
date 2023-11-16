export const generateInitials = (fullName: string): string => {
  const initials = fullName
    .match(/\b\w/g) // Match word boundaries followed by a single character
    ?.join("") // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials || "";
};
