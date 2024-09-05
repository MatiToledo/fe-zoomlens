export function formatIdentifier(identifier: string, isEdit: boolean) {
  if (!isEdit) return identifier;

  const newIdentifier =
    identifier.slice(15).charAt(0).toLowerCase() + identifier.slice(16);
  return newIdentifier;
}
