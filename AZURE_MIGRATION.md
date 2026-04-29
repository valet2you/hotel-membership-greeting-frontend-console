# Azure Migration — Env Vars

This branch exists to trigger an Azure Static Web Apps preview deployment for migration testing.

## Env vars to add in Azure Portal → SWA → Configuration

| Variable | Value |
|---|---|
| REACT_APP_API_URL / API_BASE_URL | https://alpha-vserve-api.valet2you.in |
| REACT_APP_IMAGE_URL | https://stvserveproduction.blob.core.windows.net/media/ |
| REACT_APP_FEED_IMAGE_URL | https://stvserveproduction.blob.core.windows.net/feeds/ |
| REACT_APP_FEED_API_URL | https://ca-vserve-feed-production.happyforest-d6e21e9e.centralindia.azurecontainerapps.io/api/v1 |

> Note: For CRA/Vite apps, env vars must be available at build time.
> Add them to GitHub Secrets and inject into `.env` in the workflow before `npm run build`.

DO NOT MERGE — test branch only.
