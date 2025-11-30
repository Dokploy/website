# Dokploy Website

Main Landing Page of Dokploy

## Development

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Environment Variables

### Required for Contact Form
```
RESEND_API_KEY=your_resend_api_key_here
```

### Required for HubSpot Integration (Sales Forms)
```
HUBSPOT_PORTAL_ID=147033433
HUBSPOT_FORM_GUID=0d788925-ef54-4fda-9b76-741fb5877056
```

### Required for Blog Page
```
GHOST_URL=""
GHOST_KEY=""
```