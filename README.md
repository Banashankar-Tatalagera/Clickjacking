# 🛡️ Clickjacking Scanner

A Node.js-based tool to detect clickjacking vulnerabilities in websites by analyzing security headers and testing iframe embedding behavior.

## 📌 Overview

Clickjacking is an attack where users are tricked into clicking something different than what they perceive—often exploiting a lack of protective headers like `X-Frame-Options` or `Content-Security-Policy`.

This tool performs:

- **Header Analysis** – Checks for `X-Frame-Options` and `Content-Security-Policy` headers.
- **Iframe Embedding Test** – Detects if the site can be embedded inside an iframe.
- **Risk Scoring** – Evaluates the security risk level.
- **Report Generation** – Outputs results in human-readable or JSON format.







## 🚀 Installation

```bash
git clone https://github.com/Banashankar-Tatalagera/Clickjacking.git
cd Clickjacking
npm install
```

### commands 
```bash
node scanner.cjs https://example.com -o human
```
```bash
node scanner.cjs https://example.com -o json
```

```bash
node scanner.cjs -b urls.txt
```
