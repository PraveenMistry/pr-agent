# 🤖 AI PR Review Agent

An AI-powered Pull Request (PR) review agent that analyzes code changes, detects issues, and posts structured feedback directly on GitHub or Bitbucket PRs.

---

## 🚀 Features

* 🔍 Automated PR analysis using LLM (DeepSeek via OpenRouter)
* 🧠 Detects:

  * Bugs & logical issues
  * Performance problems
  * Code quality improvements
  * Edge cases
* ⚡ Supports **GitHub & Bitbucket**
* 🧩 Handles large PRs via **chunking + parallel processing**
* 🔁 Retry + timeout handling for reliability
* 🛡️ Safe JSON parsing & output sanitization
* 📊 Structured PR comments

---

## 🏗️ Architecture

```
PR (GitHub / Bitbucket)
        ↓
Provider Adapter Layer
        ↓
PR Diff Fetch
        ↓
Chunking Engine
        ↓
LLM (DeepSeek)
        ↓
Result Aggregation
        ↓
PR Comment
```

---

## 📁 Project Structure

```
src/
├── agent/              # Core agent logic
├── providers/          # GitHub / Bitbucket integrations
├── services/           # LLM service
├── utils/              # Helpers (retry, logger, parser, etc.)
├── app.js              # Express server
```

---

## ⚙️ Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/your-username/pr-agent.git
cd pr-agent
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create `.env` file:

```env
# LLM (OpenRouter)
OPENROUTER_API_KEY=your_api_key
LLM_MODEL=deepseek/deepseek-chat
SYSTEM_PROMPT=You are a senior backend engineer...

# GitHub
GITHUB_TOKEN=your_github_token

# Bitbucket
BITBUCKET_USERNAME=your_username
BITBUCKET_APP_PASSWORD=your_app_password

# Server
PORT=3000
```

---

## 🔐 Getting API Keys

### GitHub Token

* Go to: Settings → Developer Settings → Personal Access Token
* Enable: `repo` permissions

### OpenRouter API

* Sign up: https://openrouter.ai
* Generate API key

---

## ▶️ Running the App

```bash
npm run dev
```

Server starts at:

```
http://localhost:3000
```

---

## 🧪 API Usage

### Health Check

```
GET /health
```

---

### Trigger PR Review

```
POST /review
```

#### Request Body

```json
{
  "providerType": "github",
  "owner": "your-username",
  "repo": "your-repo",
  "prNumber": 1
}
```

---

## 🧠 How It Works

1. Fetch PR diff
2. Split into manageable chunks
3. Send chunks to LLM
4. Parse & validate responses
5. Merge results
6. Post structured comment on PR

---

## ⚡ Performance Optimizations

* Controlled concurrency (`p-limit`)
* Chunk-based processing for large PRs
* Timeout + retry with exponential backoff
* Skip chunking for small PRs

---

## 🛡️ Reliability Features

* Input validation
* Safe JSON parsing
* LLM response sanitization
* Graceful error handling
* Partial failure recovery (chunk-level)

---

## ⚠️ Known Limitations

* May produce generic suggestions (improvable)
* LLM latency depends on API response time
* No caching layer (yet)

---

## 🚀 Roadmap

* [ ] Severity classification (Critical / High / Low)
* [ ] Smart MongoDB index detection
* [ ] Code-aware analysis (AST-based)
* [ ] Multi-LLM support (Claude + DeepSeek)
* [ ] PR summary + scoring
* [ ] Slack / Teams integration

---

## 🧠 Tech Stack

* Node.js + Express
* DeepSeek (via OpenRouter)
* Axios
* p-limit (concurrency control)

---

## 👨‍💻 Author

Built by Praveen Suthar

---

## 📄 License

MIT License
