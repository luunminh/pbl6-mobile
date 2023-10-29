const configs = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  // COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
};

const common = {
  CONNECTION_TIMEOUT: 30000,
  MAXIMUM_FILE_SIZE: 1024 * 1024 * 50, // 50 MB
  WAITING_TIME: 5000, // 5 secs
  ANIMATION_TIME: 300,
  MAXIMUM_AVATAR_SIZE: 16 * 1024 * 1024, // 16MB
};

export default {
  ...configs,
  ...common,
};
