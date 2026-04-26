# Release Gate Checklist

Last updated: 2026-04-22
Last updated: 2026-04-26

Use this checklist as the launch blocker artifact. Every gate must have evidence before production launch.

## Gate status overview

| Gate | Status | Evidence | Owner |
|---|---|---|---|
| No cross-user data exposure | ☐ | Contract tests + SQL review links |  |
| Auth/session hardening | ☐ | Cookie/CSRF/session secret checks |  |
| Backup/restore path in place | ☐ | Runbook + restore drill log |  |
| PATCH validation + size limits | ☐ | Zod schemas + tests |  |
| Verification harness passing | ☐ | Smoke + contract run logs |  |
| Wearables differentiator restored | ☐ | WEAR-001/002 or WEAR-003 evidence |  |
| Versioned DB migrations active | ☐ | Migration history + rollback test |  |

| Verification harness passing | ✅ | `bash scripts/prepr.sh` — commit f55baae |  |
| Wearables differentiator restored | ☐ | WEAR-001/002 or WEAR-003 evidence |  |
| Versioned DB migrations active | ☐ | Migration history + rollback test |  |

## TEST-001 gate evidence

| Gate | Required outcome | Evidence | Status |
| --- | --- | --- | --- |
| TEST-001: Verification harness | Automated contract tests + smoke checks executed and logged | Local prepr verification run (`bash scripts/prepr.sh`) + commit f55baae | GREEN |

## Detailed acceptance criteria

### DATA-001 — No cross-user data exposure
- [ ] `userId` is `NOT NULL` for user-scoped tables.
- [ ] SQL queries scope results by authenticated user.
- [ ] Pagination exists for list endpoints.
- [ ] Contract tests cover cross-user isolation.

### AUTH-001 — Auth/session hardening
- [ ] `SESSION_SECRET` required at boot; startup fails if missing.
- [ ] Session cookie configured with `sameSite` and `secure` in production.
- [ ] CSRF protections applied to state-changing requests.
- [ ] Behavior does not depend on Replit-only assumptions.

### BACKUP-001 — Backup and restore
- [ ] Backup cadence documented (daily/weekly/monthly as applicable).
- [ ] Restore path tested and documented with timestamp.
- [ ] Secrets stored in vault and not in repo.

### VALID-001 — Validation on PATCH
- [ ] PATCH endpoints validate with Zod.
- [ ] Payload size limits enforced.
- [ ] Invalid payload tests exist and pass.

### MIG-001 — Versioned DB migrations
- [ ] Migration tool is enabled and used for every schema change.
- [ ] Rollback path tested.
- [ ] Migration history reviewed in CI/CD logs.

### Verification harness
- [ ] Contract test suite run result linked.
- [ ] Smoke test suite run result linked.
- [ ] Date + commit SHA recorded in `docs/ops/change_log.md`.

### Wearables decision gate
- [ ] WEAR-001 recovery result documented.
- [ ] If recovery failed by deadline, WEAR-003 rebuild selected.
- [ ] WEAR-002 starts only after one of the above is complete.

## Launch sign-off

- Release date target:
- Commit SHA:
- Engineering sign-off:
- Product sign-off:
- Security sign-off:
