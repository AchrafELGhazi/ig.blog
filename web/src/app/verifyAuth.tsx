// api/auth.ts
export const verifyAuth = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/verification', {
      credentials: 'include', // important for sending cookies
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
};
