type APIMethod = (baseUrl: string) => {
  get: (path: string, params: Record<string, string>) => Promise<any>;
  post: (path: string, params: Record<string, string>) => Promise<any>;
};

const api: APIMethod = (baseUrl: string) => {
  const options: RequestInit = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "manual",
    referrerPolicy: "no-referrer",
  };

  return {
    get: async (path: string, params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${baseUrl}${path}?${queryString}`, {
        method: "GET",
        ...options,
      });

      return response;
    },
    post: async (path: string, data = {}) => {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
      });

      return response;
    },
  };
};

const danveryApi = () => {
  const BASE_URL = "https://next.danvery.com/api";
  return api(BASE_URL);
};

export { danveryApi };
