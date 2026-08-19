```markdown
# API Documentation - Auth

**Base URL:** `http://reyhansmart.ir:5020`

---

### 1. Check User
`POST /check`

**Request:**
```json
{
  "identifier": "09123456789",
  "recaptchaToken": "token"
}
```

**Response:**
```json
{
  "exists": true
}
```

---

### 2. Send OTP
`POST /send-otp`

**Request:**
```json
{
  "identifier": "09123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "کد تایید ارسال شد"
}
```

---

### 3. Register
`POST /register`

**Request:**
```json
{
  "identifier": "09123456789",
  "name": "علی محمدی",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "ثبت‌نام با موفقیت انجام شد",
  "user": {
    "identifier": "09123456789",
    "name": "علی محمدی"
  }
}
```

---

### 4. Verify OTP
`POST /verify-otp`

**Request:**
```json
{
  "identifier": "09123456789",
  "otp": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "کد تایید صحیح است",
  "user": {
    "identifier": "09123456789",
    "name": "علی محمدی"
  }
}
```

---

### 5. Login
`POST /login`

**Request:**
```json
{
  "identifier": "09123456789",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "ورود موفقیت‌آمیز بود",
  "user": {
    "identifier": "09123456789",
    "name": "علی محمدی"
  }
}
```
```