# Deployment URLs (Update after deployment)

## Backend (Railway)
- Production URL: https://chatmate-backend-production.up.railway.app
- Update this in frontend/src/helpers/api-communicator.ts

## Frontend (Vercel)  
- Production URL: https://chatmate-asadali.vercel.app
- Update this in backend environment variables (FRONTEND_URL)

## Environment Variables to Update:

### Backend (.env for Railway):
```
FRONTEND_URL=https://chatmate-asadali.vercel.app
NODE_ENV=production
```

### Frontend (api-communicator.ts):
```typescript
axios.defaults.baseURL = import.meta.env.PROD 
  ? "https://chatmate-backend-production.up.railway.app"
  : "http://localhost:5000";
```
