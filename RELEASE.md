# Release Playbook

This document outlines the mandatory operational process for cutover deployment and publishing official version releases for the **Tech Stack RSS Aggregator**. Following this pipeline ensures that codebases remain stable, internal versioning states align, and dependency environments remain unbroken.

---

## Pre-Release Validation Checklist

Before initiating any version bump, verify the following gates locally:

- [ ] Run automated tests locally to ensure scripts remain healthy:
  ```bash
  npm test