# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2026-07-04
### Fixed
- Fixed 404 breakdown on Angular data fetch by updating the feed pointer to point directly to the native `blog.angular.dev` XML distribution channel.

## [1.1.0] - 2026-07-03
### Added
- Integrated Angular, Python, and SQL (PostgreSQL) RSS feeds into the `aggregator.js` script.
- Expanded `package.json` keywords and description to improve SEO for the newly added technologies.
### Changed
- Updated the automated GitHub Actions commit message to reflect the broader scope of full-stack and database articles.

## [1.0.0] - 2026-07-02
### Added
- Initial release of the Tech Stack RSS Aggregator.
- GitHub Actions workflow for daily automated commits.
- Husky pre-commit and pre-push hooks.
- Professional repository folder structure and templates.