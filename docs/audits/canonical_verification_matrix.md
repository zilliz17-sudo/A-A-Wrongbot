# Canonical Verification Matrix

Last updated: 2026-04-22

This matrix maps critical risks to mitigations and test evidence required by the launch gates.

| Risk ID | Risk | Mitigation(s) | Required Verification | Status |
|---|---|---|---|---|
| DATA-001 | Cross-user data exposure | `userId NOT NULL`, SQL user scoping, pagination defaults | Contract tests for cross-user access; endpoint SQL review | ☐ |
| AUTH-001 | Session hijack / weak session controls | Boot-time `SESSION_SECRET`, `sameSite`/`secure` cookies, CSRF | Auth integration tests + manual cookie inspection | ☐ |
| VALID-001 | Malformed/oversized payloads | Zod validation on PATCH; request size limits | Negative tests for invalid schemas and large payloads | ☐ |
| MIG-001 | Unsafe schema changes | Versioned migrations + rollback script | Migration apply + rollback test in staging | ☐ |
| BACKUP-001 | Data loss / no recovery path | Scheduled backups + restore runbook | Restore drill evidence logged with timestamp | ☐ |
| VERIFY-001 | Regressions undetected before release | Smoke and contract harness in CI/CD | Green CI run IDs linked in change log | ☐ |
| WEAR-001 | Wearables recovery blocked | Attempt file recovery from Replit export by deadline | Recovery checklist completed | ☐ |
| WEAR-003 | Wearables rebuild not activated when recovery fails | Switch to MVP rebuild plan and track in backlog | Decision logged in change log + implementation tests | ☐ |
| BILL-001 | Duplicate billing events | Stripe webhook idempotency checks | Webhook replay tests | ☐ |
| OBS-001 | Poor incident diagnosis | Structured logs + request IDs + error tracking | Traceability check from request to error | ☐ |
| COST-001 | Unbounded AI cost growth | Production/staging cost controls | Cost guardrail tests + spend alerts validation | ☐ |

## Evidence pointers

Record links to evidence in `docs/ops/change_log.md` with:
- Date (UTC)
- Commit SHA
- Ticket ID
- Test/log artifact links
