module.exports = {
  apps: [
    {
      name: 'anilist-api',
      script: 'dist/src/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
