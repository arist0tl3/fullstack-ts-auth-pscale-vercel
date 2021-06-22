export default function stripBearerFromAuthHeader(authHeader?: string): string {
  const bearerLength = 'Bearer '.length;
  if (!authHeader || authHeader.length === bearerLength) return '';
  return authHeader.slice(bearerLength);
}
