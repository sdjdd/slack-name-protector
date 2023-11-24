# Slack name protector

Protect your display name from the policy that don't make any sense.

## Usage

1. Get your slack cookie and token from browser with dev tools.

2. Set your Slack real name and display name as environment variables, and leave unset any that you do not want to protect.

3. Start with any of the below commands or any other way you want:

```bash
npm start
# or
docker-compose up -d
```

## Parameters

* CHECK_INTERVAL: optional, slack profile checking interval, default to '1min'
* SLACK_API_BASE_URL: required, slack api base url, default to "https://slack.com/api"
* SLACK_COOKIE: required, your slack cookie, default empty
* SLACK_TOKEN: required, your slack token, default empty
* SLACK_DISPLAY_NAME: optional, your slack display name if you want to protect, default empty
* SLACK_REAL_NAME: optional, your slack real name if you want to protect, default empty
