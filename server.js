const http = require('node:http');

/**
 * @type {import('axios').default}
 */
const axios = require('axios');

const { SLACK_API_BASE_URL, SLACK_COOKIE, SLACK_TOKEN } = process.env;

const client = axios.create({
  baseURL: SLACK_API_BASE_URL,
  headers: {
    cookie: SLACK_COOKIE,
    Authorization: `Bearer ${SLACK_TOKEN}`,
  },
  proxy: false,
});

async function resetDisplayName() {
  const res = await client.post('/users.profile.set', {
    profile: {
      display_name: '',
    },
  });
  if (!res.data.ok) {
    throw new Error(res.data.error);
  }
}

setInterval(() => {
  resetDisplayName()
    .then(() => {
      console.log('display_name updated');
    })
    .catch(console.error);
}, 1000 * 60);

http
  .createServer((req, res) => {
    res.write('WQNMLGB!');
    res.end();
  })
  .listen(3000);
