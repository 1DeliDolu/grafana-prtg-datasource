# PRTG Grafana Datasource Plugin

![Grafana](https://img.shields.io/badge/Grafana-10%2B-orange) ![PRTG](https://img.shields.io/badge/PRTG-Network%20Monitor-blue) ![License](https://img.shields.io/badge/License-Apache%202.0-green)

## Overview
The **PRTG Grafana Datasource Plugin** allows you to integrate **PRTG Network Monitor** data into **Grafana Dashboards** seamlessly. This plugin enables real-time and historical visualization of PRTG metrics, making it easier to monitor and analyze network performance within Grafana.

### Key Features
- **🔗 Direct API Integration** – Fetch live and historical PRTG data via REST API.
- **📊 Dynamic Query Builder** – Select groups, devices, sensors, and channels interactively.
- **🚀 Real-time Monitoring** – Display sensor data in customizable Grafana panels.
- **📉 Historical Data Analysis** – Retrieve historical sensor readings for trend analysis.
- **✅ Secure Authentication** – Connect securely using username and passhash authentication.

---

## Requirements
Before installing the plugin, ensure you meet the following requirements:

- **Grafana Version:** 10+ (Tested on latest stable version)
- **PRTG Network Monitor:** Active PRTG installation with API access enabled
- **Node.js & npm:** Required for local development and plugin builds
- **Docker (Optional):** For running Grafana in a containerized environment

---

## Installation
There are multiple ways to install the PRTG Grafana Plugin:

### 1️⃣ Install via Grafana CLI (Recommended)
```sh
grafana-cli plugins install grafana-prtg-datasource
systemctl restart grafana-server
```

### 2️⃣ Manual Installation
```sh
git clone https://github.com/1DeliDolu/grafana-prtg-datasource.git
cd grafana-prtg-datasource
npm install && npm run build
cp -r dist /var/lib/grafana/plugins/prtg-grafana-datasource
systemctl restart grafana-server
```

### 3️⃣ Docker Installation (Optional)
```sh
docker run -d --name=grafana -p 3000:3000 -v $(pwd)/plugins:/var/lib/grafana/plugins grafana/grafana
```

---

## Configuration
### 1. Add PRTG Data Source
- Navigate to **Grafana → Configuration → Data Sources**
- Click **Add Data Source**
- Search for **PRTG** and select it

### 2. Enter API Details
- **Hostname**: PRTG server address (e.g., `https://prtg.example.com`)
- **Username**: Your PRTG login username
- **Passhash**: API passhash (found in PRTG user settings)
- **Cache Timeout**: Set caching duration for API queries

### 3. Save & Test
- Click **Save & Test** to validate the connection.
- If successful, you are ready to query PRTG data!

---

## Usage
### Querying Data in Grafana Panels
1. **Open a new dashboard**
2. **Add a new panel**
3. **Select PRTG as the data source**
4. **Choose groups, devices, sensors, and channels**
5. **Apply and visualize your network metrics**

### Supported Query Types
- **Metrics Mode** – Fetches numeric data from PRTG sensors.
- **Raw Mode** – Retrieves unformatted JSON data from PRTG.
- **Text Mode** – Returns status messages or alert logs.

---

## Development & Contribution
Want to improve the plugin? Follow these steps to contribute:

### Development Setup
```sh
git clone https://github.com/1DeliDolu/grafana-prtg-datasource.git
cd grafana-prtg-datasource
npm install
npm run dev
```

### Running Tests
- **Unit Tests:** `npm run test`
- **End-to-End Tests:** `npm run e2e`

### Building the Plugin
```sh
npm run build
```

### Contributing Guidelines
- Follow best practices for **Grafana plugin development**.
- Create a **pull request (PR)** for new features or fixes.
- Report issues in the **GitHub repository**.

---

## Support & Contact
For any issues, feature requests, or contributions, reach out via:
- **GitHub Issues:** [https://github.com/1DeliDolu/grafana-prtg-datasource/issues](https://github.com/1DeliDolu/grafana-prtg-datasource/issues)
- **PRTG Community Forums**
- **Email:** mustafa.ozdemir1408@gmail.com

---

## License
This project is licensed under the **Apache 2.0 License**. See the `LICENSE` file for details.

Happy monitoring! 🎯🚀

