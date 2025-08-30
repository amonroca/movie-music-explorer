# GitHub Actions Setup Guide

This guide will help you configure GitHub Actions for automated testing and deployment of the Movie & Music Explorer.

## 🔧 Repository Secrets Configuration

You need to configure the following secrets in your GitHub repository:

### Required Secrets

1. **Go to your repository on GitHub**
2. **Navigate to Settings > Secrets and variables > Actions**
3. **Add the following secrets:**

#### API Keys (Required for build)

- `VITE_TMDB_API_KEY`: Your TMDB API key
- `VITE_RAPIDAPI_KEY`: Your RapidAPI key for Deezer

#### Deployment Secrets (Choose one option)

##### Option 1: GitHub Pages (Free)

- No additional secrets needed
- Edit `.github/workflows/ci-cd.yml` and uncomment the GitHub Pages deployment section

##### Option 2: Vercel

- `VERCEL_TOKEN`: Your Vercel token
- `ORG_ID`: Your Vercel organization ID
- `PROJECT_ID`: Your Vercel project ID

##### Option 3: Netlify

- `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
- `NETLIFY_SITE_ID`: Your Netlify site ID

#### Optional Secrets

- `SONAR_TOKEN`: SonarCloud token for code quality analysis

## 🚀 Workflows Overview

### 1. CI/CD Pipeline (`ci-cd.yml`)

**Triggers:** Push to main/develop, Pull requests to main

**Jobs:**

- **Test**: Runs on Node.js 20.x and 22.x

  - Install dependencies
  - Run linter and type check
  - Execute tests
  - Build application
  - Upload build artifacts

- **Security**: Security audit and vulnerability check

- **Deploy**: Deploy to production (main branch only)
  - Build for production
  - Deploy to configured platform

### 2. Pull Request Validation (`pull-request.yml`)

**Triggers:** Pull requests to main/develop

**Jobs:**

- **Validate**: Code formatting, linting, tests, build
- **Code Quality**: SonarCloud analysis
- **Dependency Check**: Outdated packages, security audit, license check

### 3. Release (`release.yml`)

**Triggers:** Git tags starting with 'v' (e.g., v1.0.0)

**Jobs:**

- **Release**:
  - Run tests
  - Build for production
  - Create release archives
  - Generate changelog
  - Create GitHub release
  - Deploy to production

### 4. Dependency Updates (`dependency-updates.yml`)

**Triggers:** Weekly schedule (Mondays) or manual

**Jobs:**

- **Update Dependencies**: Automated dependency updates
- **Security Audit**: Weekly security vulnerability check

## 📋 Branch Protection Rules

Configure branch protection for `main`:

1. **Go to Settings > Branches**
2. **Add rule for `main` branch:**
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Required status checks:
     - `test (18.x)`
     - `test (20.x)`
     - `security`
   - ✅ Require pull request reviews before merging
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require review from code owners
   - ✅ Include administrators

## 🔄 Deployment Options

### GitHub Pages (Recommended for static sites)

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

**Setup:**

1. Go to Settings > Pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. Your site will be available at: `https://amonroca.github.io/movie-music-explorer`

### Vercel

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    vercel-args: "--prod"
```

**Setup:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project
3. Get tokens from Vercel dashboard

### Netlify

```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.0
  with:
    publish-dir: "./dist"
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Setup:**

1. Create site on Netlify
2. Get auth token from User Settings > Applications
3. Get site ID from Site Settings > General

## 🏷️ Creating Releases

To create a new release:

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

This will trigger the release workflow which will:

- Run tests
- Build the application
- Create release archives
- Generate changelog
- Create GitHub release
- Deploy to production

## 🔍 Monitoring and Notifications

### Status Badges

Add to your README.md:

```markdown
![CI/CD](https://github.com/amonroca/movie-music-explorer/workflows/CI/CD%20Pipeline/badge.svg)
![Security](https://github.com/amonroca/movie-music-explorer/workflows/Pull%20Request%20Validation/badge.svg)
```

### Slack Notifications (Optional)

Add to any workflow:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

## 🛠️ Customization

### Adding Tests

When you add tests to your project, update the npm scripts:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

### Adding Linting

Install ESLint:

```bash
npm install -D eslint @eslint/js
```

Update npm scripts:

```json
{
  "scripts": {
    "lint": "eslint src",
    "lint:fix": "eslint src --fix"
  }
}
```

### Adding Type Checking

For TypeScript support:

```bash
npm install -D typescript vue-tsc
```

Update npm scripts:

```json
{
  "scripts": {
    "type-check": "vue-tsc --noEmit"
  }
}
```

## 📊 Environment Variables

The workflows use environment variables for API keys:

- `VITE_TMDB_API_KEY`: Used during build process
- `VITE_RAPIDAPI_KEY`: Used during build process

These are automatically injected from GitHub Secrets during the build process.

## 🚨 Troubleshooting

### Build Failures

- Check that all required secrets are configured
- Verify API keys are valid
- Check Node.js version compatibility

### Deployment Issues

- Ensure deployment platform is properly configured
- Verify authentication tokens
- Check build output directory path

### Security Audit Failures

- Review vulnerability report
- Update dependencies: `npm audit fix`
- Consider upgrading to newer versions

For more help, check the Actions tab in your GitHub repository for detailed logs.
