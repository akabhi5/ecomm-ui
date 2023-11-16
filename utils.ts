export const generateInitials = (fullName: string): string => {
  const initials = fullName
    .match(/\b\w/g) // Match word boundaries followed by a single character
    ?.join("") // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials || "";
};

type ObjectWithName = {
  customerId: number;
  // Other keys in the object
};

export function moveObjectToZeroIndex<T extends ObjectWithName>(
  objects: T[],
  userId: number
): T[] {
  const index = objects.findIndex((obj) => obj.customerId === userId);
  if (index !== -1) {
    const [selectedObject] = objects.splice(index, 1);
    objects.unshift(selectedObject);
  }
  return objects;
}
