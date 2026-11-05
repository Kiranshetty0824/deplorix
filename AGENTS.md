# Project rules

- Visitor enquiries are inserted from the browser with a client-generated id into an insert-only table; visitors never read rows back (the proposal page uses sessionStorage), so admin-only SELECT stays safe.
- Admin pages check the `admin` role via `user_roles`; all admin access control lives in RLS with `has_role`, never in client state.
