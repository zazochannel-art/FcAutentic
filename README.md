# FC Autentic Command Center

Aplicatie web React + TypeScript + Tailwind pentru administrarea unei academii sau echipe de fotbal.

## Include

- Dashboard premium cu carduri responsive 3 pe desktop si 2 pe mobil.
- Management pentru jucatori, antrenori, echipe, calendar, meciuri, sarcini, documente, notificari si roluri.
- PWA cu manifest si service worker.
- Client Supabase pregatit pentru `VITE_SUPABASE_URL` si `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Schema PostgreSQL cu RLS in `supabase/schema.sql`.
- Structura multi-language: romana, rusa, engleza.

## Pornire locala

```bash
npm install
npm run dev
```

## Supabase

1. Creeaza un proiect Supabase.
2. Copiaza `.env.example` in `.env` si completeaza URL-ul si cheia publishable.
3. Ruleaza SQL-ul din `supabase/schema.sql` in SQL Editor sau transforma-l intr-o migrare.
4. Pastreaza cheia `service_role` doar pe server, niciodata in frontend.

## OneSignal

Adauga `VITE_ONESIGNAL_APP_ID` cand ai aplicatia OneSignal creata. Controlul de permisiune pentru browser notifications este deja prezent in UI.
