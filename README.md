# Blog composed of MicroCMS + Next.js
This repository is open source to create blog.
Example of this repository is [here](https://skill-blog.vercel.app/)
# Getting started

## Set project
### 1. Set secret to github actions
| Required | Variables | Description |
| --- | --- | --- |
| [x] | VERCEL_TOKEN | You create from [here](https://vercel.com/account/tokens) |
| [x] | VERCEL_ORG_ID |  |
| [x] | VERCEL_PROJECT_ID |  |
| [x] | MICRO_CMS_SERVICE_KEY | YOUR_DOMAIN is the XXXX part of XXXX.microcms.io |
| [x] | MICRO_CMS_API_KEY | Your api key |
| [ ] | NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | Google analytics id |




Set secret value and key to github actions in your project according [here](https://docs.github.com/en/actions/security-guides/encrypted-secrets) and you can set variables from https://github.com/$user/$project/settings/secrets

If you want to know about microcms variables, you should see [here](https://github.com/microcmsio/microcms-js-sdk#how-to-use)

### 2. Set your profile
Not writting
### 3. Push repository to remote repository
Not writting
## Develop in local

In root directory with terminal.
```
yarn && yarn dev
```
Completed!!