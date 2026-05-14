# Backend (Email API)

API phục vụ form trong `profile/src/pages/Contact.jsx`.

## Endpoints

- `GET /v1/health` → `{ ok: true }`
- `POST /v1/messages` body:
  ```json
  { "email": "you@example.com", "content": "Hello..." }
  ```

## Run locally

1) Cài deps:
   - `cd backend`
   - `npm i`

2) Tạo env:
   - copy `backend/.env.example` → `backend/.env`
   - Nếu chưa cấu hình SMTP, để `DRY_RUN=true`

3) Chạy server:
   - `npm run dev`

Server mặc định: `http://localhost:3001`

