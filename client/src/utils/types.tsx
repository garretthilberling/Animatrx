export type parameter = {
  filter: string;
  by: string;
};

export type faveWlData = {
  data: any;
  dateAdded: number;
}

export type newUser = {
  username: string;
  email: string;
  password: string;
};

export type userLogin = {
  email: string;
  password: string;
};

export type userOutput = {
  token: string;
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type usernameQuery = {
  username: string;
};

export type voteQuery = {
  userId: string;
};

export type authService = {
  getProfile(): any;
  loggedIn(): boolean | void;
  isTokenExpired(token: string): boolean;
  getToken(): string | null;
  login(idToken: userOutput): void;
  logout(): void;
};

export type youtubeVideo = {
  get(): void;
};

export type params = {
  part: string;
  maxResults: number;
  key: string | undefined;
};

export type ytSearch = {
  baseUrl: string;
  params: params;
  withCredentials: boolean;
};

export type reviewInput = {
  username: string;
  animeId: string;
  title: string;
  body: string;
  rating: number;
};
