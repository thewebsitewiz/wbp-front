const protocol: { [key: string]: string } = {
  prod: 'http://',
  dev: 'http://',
};
const host: { [key: string]: string } = {
  prod: 'wbp.thewebsitewiz.com',
  dev: 'localhost',
};
const port: { [key: string]: number } = {
  prod: 3000,
  dev: 3000,
};
const apiPath: { [key: string]: string } = {
  prod: 'api',
  dev: 'api',
};

const env = 'dev';

export const environment = {
  production: true,
  protocol: `${protocol[env]}`,
  host: `${host[env]}`,
  port: `${port[env]}`,
  apiPath: `${apiPath[env]}`,
  baseAPIUrl: `${protocol[env]}${host[env]}:${port[env]}/${apiPath[env]}`,
  imageUrl: `${protocol[env]}${host[env]}:${port[env]}`,
};
