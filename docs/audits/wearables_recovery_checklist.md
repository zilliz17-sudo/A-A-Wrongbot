# Wearables Recovery Checklist (WEAR-001)

Last updated: 2026-04-22

Goal: recover the 13 missing wearable files from Replit export. If deadline is missed, trigger WEAR-003 rebuild.

## Recovery inputs
- [ ] Replit export archive obtained.
- [ ] Commit/hash/date of last known-good wearable state identified.
- [ ] File manifest of expected 13 files documented.

## Recovery steps
- [ ] Extract Replit export and search for wearable-related files.
- [ ] Compare recovered files with current repository paths.
- [ ] Restore files in feature branch with clear commit history.
- [ ] Run typecheck/build/tests against recovered code.
- [ ] Record any missing dependencies or API contracts.

## Exit criteria
- [ ] **Recovered**: all required files restored and integrated.
- [ ] **Partially recovered**: gaps documented with exact filenames.
- [ ] **Failed**: insufficient files recovered by deadline.

## Decision gate
- Recovery deadline (UTC): __________________
- Decision owner: __________________
- Decision:
  - [ ] Proceed with WEAR-002 (recovery complete)
  - [ ] Switch to WEAR-003 (rebuild MVP)
- Decision logged in `docs/ops/change_log.md`: [ ]
