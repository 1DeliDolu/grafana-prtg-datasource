# Adding Pre-configured Dashboards to Your Grafana Plugin

This guide explains how to include pre-built dashboards in your Grafana data source plugin, making it easier for users to get started quickly. 🚀

## Steps Overview

1. Creating and exporting dashboards
2. Adding the dashboard to your plugin
3. Importing the dashboard through the plugin

## 1. Creating and Exporting Dashboards

First, create and configure a dashboard in Grafana, then export it as JSON:

1. Open your dashboard in Grafana
2. Click the "Share" icon in the top menu
3. Go to the "Export" tab
4. Select "Export for sharing externally"
5. Save as JSON using the "Save to file" button

> Note: This process replaces data source references with placeholders, allowing users to connect their own data source.

## 2. Adding the Dashboard to Your Plugin

1. Create a `dashboards` directory in your `src` folder
2. Move your exported JSON file to this directory

### Folder Structure:
```
myorg-myplugin-datasource/
└── src/
    ├── dashboards/
    │   └── overview.json
    ├── module.ts
    └── plugin.json
```

### Update plugin.json

Add the following code to your `plugin.json`:

```json
{
  "includes": [
    {
      "name": "overview",
      "path": "dashboards/overview.json",
      "type": "dashboard"
    }
  ]
}
```

Key components:
- `name`: Display name of the dashboard
- `path`: Location relative to src folder
- `type`: Must be "dashboard"

### Build and Restart

Run:
```bash
npm run build
```
Then restart Grafana.

## 3. Importing the Dashboard

1. Navigate to your plugin in Grafana
2. Create or edit your data source
3. Click the "Dashboards" tab
4. View included dashboards
5. Click "Import" to use the dashboard! 🎉