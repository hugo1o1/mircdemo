const __env__ = process.env.NODE_ENV

const config = {
  development: {
    apiHost: 'https://easy-mock.com',
    logoutUrl: `logoutUrl`,
    loginUrl: `loginUrl`
  },
  test: {
    apiHost: 'https://easy-mock.com',
    logoutUrl: `logoutUrl`,
    loginUrl: `loginUrl`
  },
  production: {
    apiHost: 'https://easy-mock.com',
    logoutUrl: `logoutUrl`,
    loginUrl: `loginUrl`
  }
}

export default key => {
  if (config[__env__][key] !== undefined) {
    return config[__env__][key]
  }
  
  return config[key]
}
  
