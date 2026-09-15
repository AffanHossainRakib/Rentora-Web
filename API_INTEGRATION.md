# API Integration Map

Maps every backend endpoint to the frontend route/component that consumes it. Backend base URL:
`BACKEND_API_URL` (see `.env.example`), currently `https://api.rentora.itsaffan.com/api/v1`.

All backend endpoints below are live in production (last verified 2026-09-15).

## Auth

| Endpoint | Frontend usage |
|---|---|
| `POST /auth/register` | `app/(authGroup)/_actions/authActions.ts` → `registerAction`, used by `RegisterForm.tsx` |
| `POST /auth/login` | `authActions.ts` → `loginAction` (also called right after a successful register); used by `LoginForm.tsx` |
| `GET /auth/me` | `service/getMe.ts` → `getMe()`, the backend-verified session check used by every layout that needs the current user (navbar, dashboard layouts, property pages) |
| `POST /auth/refresh-token` | `service/refreshToken.ts` → `getNewAccessToken()`, called from `proxy.ts` when the access token has expired |
| `POST /auth/logout` | `service/logout.ts` → `logout()`, called from the navbar and dashboard sidebar |

## Categories

| Endpoint | Frontend usage |
|---|---|
| `GET /categories` | `app/(publicGroup)/_actions/propertyActions.ts` → `getCategories()`, used by the property browse filters, the property create/edit form, and `admin-dashboard/categories` |
| `POST /categories` (ADMIN) | `admin-dashboard/categories/_actions/categoryActions.ts` → `createCategory`, used by `CreateCategoryForm.tsx` |

## Properties (public)

| Endpoint | Frontend usage |
|---|---|
| `GET /properties` | `propertyActions.ts` → `getProperties()`, used by the home page (featured), `/properties` (browse + filters), `/basha-vara/[city]`, and `sitemap.ts` |
| `GET /properties/:id` | `propertyActions.ts` → `getPropertyById()`, used by `/properties/[slug]` and the landlord edit-ownership check |

## Landlord properties

| Endpoint | Frontend usage |
|---|---|
| `GET /landlord/properties` | `landlord-dashboard/_actions/landlordActions.ts` → `getMyProperties()`, used by `landlord-dashboard/properties` (list) and the landlord overview stat card |
| `POST /landlord/properties` | `landlord-dashboard/properties/_actions/propertyFormActions.ts` → `savePropertyAction()` (no `propertyId`), used by `properties/new` |
| `PUT /landlord/properties/:id` | `propertyFormActions.ts` → `savePropertyAction()` (with `propertyId`), used by `properties/[id]/edit` |
| `DELETE /landlord/properties/:id` | `propertyFormActions.ts` → `deleteProperty()`, used by `LandlordPropertyCard.tsx`'s delete confirm dialog |

## Rentals (tenant)

| Endpoint | Frontend usage |
|---|---|
| `POST /rentals` | `properties/[slug]/_actions/rentalActions.ts` → `createRentalRequest()`, used by `RequestRentDialog.tsx` |
| `GET /rentals` | `tenant-dashboard/_actions/tenantActions.ts` → `getMyRentalRequests()`, used by the tenant overview and `tenant-dashboard/requests` |
| `GET /rentals/:id` | `tenantActions.ts` → `getRentalRequestById()`, used by the pay page and `payment/success`'s status poller |

## Landlord requests

| Endpoint | Frontend usage |
|---|---|
| `GET /landlord/requests` | `landlordActions.ts` → `getLandlordRequests()`, used by the landlord overview and `landlord-dashboard/requests` |
| `PATCH /landlord/requests/:id` | `landlord-dashboard/requests/_actions/landlordRequestActions.ts` → `updateRequestStatus()` (APPROVED/REJECTED) and `admin-dashboard/rentals/_actions/rentalActions.ts` → `markRentalCompleted()` (ACTIVE → COMPLETED) |

## Reviews

| Endpoint | Frontend usage |
|---|---|
| `POST /reviews` | `tenant-dashboard/_actions/reviewActions.ts` → `submitReview()`, used by `ReviewDialog.tsx` on COMPLETED requests |
| *(no GET endpoint)* | Reviews are read back embedded on `GET /properties/:id` and rendered by `ReviewList.tsx` |

## Payments

| Endpoint | Frontend usage |
|---|---|
| `POST /payments/create` | `tenant-dashboard/requests/[id]/pay/_actions/paymentActions.ts` → `createCheckoutSession()`, used by `PayButton.tsx`; redirects the browser to the returned Stripe `paymentUrl` |
| `GET /payments` | `tenantActions.ts` → `getMyPayments()`, used by `tenant-dashboard/payments` |
| `GET /payments/:id` | Not used directly — the success page polls rental status via `GET /rentals/:id` instead, since Stripe's redirect only carries the rental request id (see decision in `features.md`) |
| `POST /payments/webhook` | Not used by the frontend — server-to-server callback from Stripe to the backend |

## Admin

| Endpoint | Frontend usage |
|---|---|
| `GET /admin/users` (+ `searchTerm`) | `admin-dashboard/_actions/adminActions.ts` → `getAllUsers()`, used by `admin-dashboard/users` and the admin overview stat card |
| `PATCH /admin/users/:id` | `admin-dashboard/users/_actions/userActions.ts` → `updateUserStatus()`, used by `UsersTable.tsx`'s ban/unban toggle |
| `GET /admin/properties` | `adminActions.ts` → `getAllAdminProperties()`, used by `admin-dashboard/properties` and the admin overview stat card |
| `GET /admin/rentals` | `adminActions.ts` → `getAllAdminRentals()`, used by `admin-dashboard/rentals` and the admin overview's pending-count (counted client-side, since this endpoint has no status filter) |

## Route → endpoint summary

| Route | Endpoints consumed |
|---|---|
| `/` | `GET /properties` |
| `/properties` | `GET /properties`, `GET /categories` |
| `/properties/[slug]` | `GET /properties/:id`, `POST /rentals` |
| `/basha-vara/[city]` | `GET /properties` |
| `/about`, legal pages | none (static) |
| `/login` | `POST /auth/login` |
| `/register` | `POST /auth/register`, `POST /auth/login` |
| `/payment/success` | `GET /rentals/:id` |
| `/payment/cancel` | none |
| `/tenant-dashboard` | `GET /rentals` |
| `/tenant-dashboard/requests` | `GET /rentals`, `POST /reviews` |
| `/tenant-dashboard/requests/[id]/pay` | `GET /rentals/:id`, `POST /payments/create` |
| `/tenant-dashboard/payments` | `GET /payments` |
| `/landlord-dashboard` | `GET /landlord/properties`, `GET /landlord/requests` |
| `/landlord-dashboard/properties` | `GET /landlord/properties`, `DELETE /landlord/properties/:id` |
| `/landlord-dashboard/properties/new` | `GET /categories`, `POST /landlord/properties` |
| `/landlord-dashboard/properties/[id]/edit` | `GET /properties/:id`, `GET /categories`, `PUT /landlord/properties/:id` |
| `/landlord-dashboard/requests` | `GET /landlord/requests`, `PATCH /landlord/requests/:id` |
| `/admin-dashboard` | `GET /admin/users`, `GET /admin/properties`, `GET /admin/rentals` |
| `/admin-dashboard/users` | `GET /admin/users`, `PATCH /admin/users/:id` |
| `/admin-dashboard/properties` | `GET /admin/properties` |
| `/admin-dashboard/rentals` | `GET /admin/rentals`, `PATCH /landlord/requests/:id` |
| `/admin-dashboard/categories` | `GET /categories`, `POST /categories` |

Every documented backend endpoint is consumed except `POST /payments/webhook`, which is
server-to-server and has no frontend caller by design.
