const http = require('node:http');

/**
 * @type {import('axios').default}
 */
const axios = require('axios');
const parse = require('parse-duration').default;

const {
  SLACK_API_BASE_URL = 'https://slack.com/api',
  SLACK_COOKIE,
  SLACK_TOKEN,
  SLACK_DISPLAY_NAME,
  SLACK_REAL_NAME,
  CHECK_INTERVAL = '1min',
} = process.env;

const client = axios.create({
  baseURL: SLACK_API_BASE_URL,
  headers: {
    cookie: SLACK_COOKIE,
    Authorization: `Bearer ${SLACK_TOKEN}`,
  },
  proxy: false,
});

async function getProfile() {
  const res = await client.post('/users.profile.get');
  if (!res.data.ok) {
    throw new Error(res.data.error);
  }
  return res.data.profile;
}

async function setProfile(profile) {
  const res = await client.post('/users.profile.set', { profile });
  if (!res.data.ok) {
    throw new Error(res.data.error);
  }
}

async function resetDisplayName() {
  const profile = await getProfile();
  const newProfile = {};
  if (!!SLACK_DISPLAY_NAME && profile.display_name !== SLACK_DISPLAY_NAME) {
    newProfile.display_name = SLACK_DISPLAY_NAME;
  }
  if (!!SLACK_REAL_NAME && profile.real_name !== SLACK_REAL_NAME) {
    newProfile.real_name = SLACK_REAL_NAME;
  }
  if (Object.keys(newProfile).length !== 0) {
    await setProfile(newProfile);
    console.log('display_name has been reset');
  } else {
    console.log('display_name not changed');
  }

}

resetDisplayName().catch(console.error);
setInterval(() => {
  resetDisplayName().catch(console.error);
}, parse(CHECK_INTERVAL, 'millisecond'));

http
  .createServer((req, res) => {
    res.write('WQNMLGB!');
    res.end();
  })
  .listen(3000);
