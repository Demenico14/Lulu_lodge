export { default } from "next-auth/middleware";

// Restricting the middleware to user-related routes
export const config = {
  matcher: [
    '/users/:path*'  // Applies to all routes under /users
  ],
};
