# Krikya Gaming Platform

## Admin panel and MongoDB backend

The unified admin panel is available at `/admin`. It supports these roles:

- `master_admin`
- `affiliate_manager`
- `affiliate_agent`
- `user`

Sidebar items and API access are both controlled by the same permission matrix in
`src/server/permissions/roles.ts`. Authentication uses an HTTP-only, same-site JWT
cookie and passwords are stored as bcrypt hashes.

### Environment

Copy `.env.example` to `.env.local` for local development, or add these variables
to the Railway service:

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=krikya
JWT_SECRET=a-random-secret-with-at-least-32-characters
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=use-a-strong-password
```

If the existing deployment uses the legacy `MONGODB_URl` spelling, it remains
supported, but `MONGODB_URI` is preferred.

### Create the first master admin

```bash
npm run seed
```

Then run `npm run dev` and sign in at `http://localhost:3000/admin`.

### API

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/dashboard`
- `GET|POST /api/v1/users`

Run `npm run lint` for TypeScript validation and `npm run build` for a production
build check.
