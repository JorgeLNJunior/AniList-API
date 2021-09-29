module.exports = {
  apps : [{
    name: 'animes-review-api',
    script: 'dist/src/main.js',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],
};
