const env = {
  apiUrl: localStorage.getItem("api") ?? "http://localhost:4000/api/v1",
  appUrl: import.meta.env.VITE_BASE_URL,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
};

export default env;
