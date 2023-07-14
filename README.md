[![Build and Deploy](https://github.com/mkly/helm-frontend/actions/workflows/main.yml/badge.svg)](https://github.com/mkly/helm-frontend/actions/workflows/main.yml)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/helm-frontend](http://localhost:3000/helm-frontend) with your browser to see the result.

### Environment variables

```bash
NEXT_PUBLIC_HELM_SUITE=v0.2.3 # Change to the current or desired suite
NEXT_PUBLIC_HELM_PROXY=https://example.com # Change to either the proxy or the direct API
