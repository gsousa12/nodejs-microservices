type Config = {
  BASE_URL: string;
  USERS: {
    CREATE: string;
  };
};

export const IDENTITY_PATHS = {
  BASE_URL: "/identity",
  USERS: {
    CREATE: "/users/create",
  },
} as const satisfies Config;
