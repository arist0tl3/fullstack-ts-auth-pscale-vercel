export default function stripBearerFromAuthHeader(authHeader?: string) {
  const bearerLength = 'Bearer '.length;
  if (!authHeader || authHeader.length === bearerLength) return null;
  return authHeader.slice(bearerLength);
}
