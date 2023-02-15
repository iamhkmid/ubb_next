module.exports = {
  apps : [{
    name      : 'ubb_next',
    script    : 'yarn',
    args      : 'start',
    interpreter: '/bin/bash',
    env: {
      NODE_ENV: 'production'
    }
  }]
};