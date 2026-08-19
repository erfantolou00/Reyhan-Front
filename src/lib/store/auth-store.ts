// کاربران
export const usersStore = new Map<string, { name: string; password: string }>();

// OTPها
export const otpStore = new Map<string, { code: string; expiresAt: number }>();