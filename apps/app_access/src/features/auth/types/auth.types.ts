export type LoginForm = {
  username: string;
  password: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};
