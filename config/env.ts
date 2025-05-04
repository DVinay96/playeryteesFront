export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }
  
  if (!env.apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is required')
  }
  