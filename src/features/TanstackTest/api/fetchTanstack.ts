export async function fetchTanstack(): Promise<any> {
  const response = await fetch('https://api.github.com/repos/TanStack/query');
  if (!response.ok) {
    throw new Error('tanstack fetch error');
  }
  return response.json();
}
