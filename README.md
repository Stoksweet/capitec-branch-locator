# Capitec Branch Locator Component

An interactive, responsive branch and ATM locator application built for Capitec Bank using **Angular** and **Ionic Framework**. This application features a two-panel layout displaying branch metadata and an interactive vector map using **MapLibre GL JS** (`@maplibre/ngx-maplibre-gl`).

## 🚀 Key Features

* **Interactive Map Visualization**: GPU-accelerated vector mapping styled with de-emphasized light-grey street layers (Carto Positron basemap) and custom Capitec blue map pins.

* **Smart Branch Search**: Instant text filtering by branch name, address, or store code.

* **Geolocation Integration**: "Use my location" feature that requests browser geolocation, calculates real-time distances to all branches using the Haversine formula, and automatically centers on and selects the nearest branch.

* **Interactive Branch Overlay**: Popup card overlay displaying store opening hours, real-time operating status (Open/Closed), distance in kilometers, available amenities (e.g., Cash-On-Site), and direct Google Maps navigation links.

* **Capitec Design System**: Custom branded styling (`#2f70ef`), custom iconography, and typography using Flama and Nunito Sans fonts.

## 📦 Data Sourcing & Asset Extraction

Branch data, typography, and brand assets were directly sourced and extracted from the official Capitec web application using browser developer tools and command-line utilities.

### Asset Extraction Process

1. **DevTools Inspection**: The official Capitec web application network tab was inspected using browser Developer Tools (F12) to identify endpoints for font webfiles (`.woff2`), brand assets (SVG & PNG favicons/logos), and the primary stores JSON payload.
2. **Curl Retrieval**: Assets and data were extracted directly via `curl` commands:
   * **Typography & Brand Logos**: Web fonts (Flama, Nunito Sans) and brand SVGs/PNGs were downloaded and placed in `src/assets/`.
   * **Store Dataset**: The full store network payload was fetched and saved locally to `src/assets/data/capitec-stores.json`.

### Data Pipeline & Schema

1. **HTTP Retrieval**: The application fetches the JSON file at runtime using Angular's `HttpClient`.

2. **Coordinate Parsing**: The raw JSON payload contains string-based latitude and longitude fields. The application parses these strings into floating-point numbers and formats them into `[longitude, latitude]` numeric arrays required by MapLibre GL.

3. **Data Structure**:

   ```json
   {
     "stores": [
       {
         "name": "Capitec Bank Branch",
         "address": "123 Main Road...",
         "latitude": "-26.123456",
         "longitude": "27.123456",
         "operating_hours": {
           "operating_time_string": "08:00 - 17:00"
         },
         "trading_status": "Open",
         "attributes": [{ "value": "ATM" }]
       }
     ],
     "distanceUnit": "km"
   }
   ```

## 🐳 Running with Docker

The application is fully containerized using Node.js and can be executed using Docker.

### 1. Build the Docker Image

From the project root directory, run:

```bash
docker build -t capitec-branch-locator .
```

### 2. Run the Container

Start the container exposing the default Ionic port (`8100`):

```bash
docker run -d -p 8100:8100 --name branch-locator-app capitec-branch-locator
```

### 3. Access the Application

Open your browser and navigate to:

```
http://localhost:8100
```

## 🤖 AI Workflow & Architecture Credits

This application was architected and designed using a specialized AI-assisted workflow:

* **Superdesign**: Used for UI/UX component design, responsive two-panel layout architecture, design system variable structuring, and visual aesthetic alignment.

* **Gemini (Google DeepMind)**: Used for functional scope design, TypeScript component logic, coordinate parsing, Haversine distance calculations, MapLibre GL library migration, and Docker containerization setup.

* **Explicit Exclusions**: No Claude Code or Antigravity tooling was used in the development of this project.

## 🛠️ Tech Stack & Dependencies

* **Framework**: Angular 18+ (Standalone Components) / Ionic 7+

* **Mapping Engine**: MapLibre GL JS (`@maplibre/ngx-maplibre-gl`)

* **Styling**: Dart Sass (`color.adjust` modules)

* **Icons**: Ionicons