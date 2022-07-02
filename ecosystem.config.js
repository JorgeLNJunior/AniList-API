module.exports = {
  apps: [
    {
      name: 'anilist-api',
      script: 'dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
