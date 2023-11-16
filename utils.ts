export const generateInitials = (fullName: string): string => {
  const initials = fullName
    .match(/\b\w/g) // Match word boundaries followed by a single character
    ?.join("") // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials || "";
};

type ObjectWithName = {
  customer: string;
  // Other keys in the object
};

export function moveObjectToZeroIndex<T extends ObjectWithName>(
  objects: T[],
  name: string
): T[] {
  const index = objects.findIndex((obj) => obj.customer === name);

  if (index !== -1) {
    const [selectedObject] = objects.splice(index, 1);
    objects.unshift(selectedObject);
  }

  return objects;
}
