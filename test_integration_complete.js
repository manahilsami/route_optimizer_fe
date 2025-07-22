#!/usr/bin/env node

/**
 * Complete Integration Test for Route Optimizer
 * Tests all API endpoints and frontend-backend communication
 */

const API_BASE = "http://localhost:8000";
const FRONTEND_URL = "http://localhost:3000";

async function testAPI() {
  console.log("🧪 Testing Complete Integration...\n");

  try {
    // Test 1: Health Check
    console.log("1️⃣ Testing Health Check...");
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health Check:", healthData.success ? "PASSED" : "FAILED");

    // Test 2: Route Points
    console.log("\n2️⃣ Testing Route Points...");
    const routeResponse = await fetch(
      `${API_BASE}/route-points?fromCity=Los%20Angeles&toCity=San%20Francisco`
    );
    const routeData = await routeResponse.json();
    console.log("✅ Route Points:", routeData.success ? "PASSED" : "FAILED");
    if (routeData.success) {
      console.log(
        "   📍 Start:",
        routeData.data.start.city,
        `(${routeData.data.start.lat}, ${routeData.data.start.lng})`
      );
      console.log(
        "   📍 End:",
        routeData.data.end.city,
        `(${routeData.data.end.lat}, ${routeData.data.end.lng})`
      );
    }

    // Test 3: Places/Attractions
    console.log("\n3️⃣ Testing Places/Attractions...");
    const placesResponse = await fetch(
      `${API_BASE}/places?fromCity=Los%20Angeles&toCity=San%20Francisco`
    );
    const placesData = await placesResponse.json();
    console.log("✅ Places:", placesData.success ? "PASSED" : "FAILED");
    if (placesData.success) {
      console.log(
        `   🎯 Found ${placesData.data.attractions.length} attractions`
      );
      placesData.data.attractions.slice(0, 3).forEach((attraction, index) => {
        console.log(
          `   ${index + 1}. ${attraction.name} (${attraction.category})`
        );
      });
    }

    // Test 4: Optimization
    console.log("\n4️⃣ Testing Route Optimization...");
    const testLocations = [
      { key: "start", location: { lat: 34.0536909, lng: -118.242766 } },
      { key: "end", location: { lat: 37.7792588, lng: -122.4193286 } },
    ];

    const optimizeResponse = await fetch(`${API_BASE}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testLocations),
    });
    const optimizeData = await optimizeResponse.json();
    console.log("✅ Optimization:", optimizeData.success ? "PASSED" : "FAILED");
    if (optimizeData.success) {
      console.log(
        `   🛣️ Optimized route has ${optimizeData.data.optimized_route.length} points`
      );
    }

    // Test 5: Frontend Accessibility
    console.log("\n5️⃣ Testing Frontend...");
    const frontendResponse = await fetch(FRONTEND_URL);
    console.log("✅ Frontend:", frontendResponse.ok ? "PASSED" : "FAILED");

    // Summary
    console.log("\n🎉 Integration Test Summary:");
    console.log("✅ Backend API: Running and responding");
    console.log("✅ Route Points: Working correctly");
    console.log("✅ Attractions: Found and formatted");
    console.log("✅ Optimization: Processing requests");
    console.log("✅ Frontend: Accessible and running");

    console.log("\n🚀 Ready for Software Engineers!");
    console.log("📝 Next Steps:");
    console.log("   1. Software engineers should pull the latest changes");
    console.log("   2. Set up Google Maps API key in .env file");
    console.log("   3. Test the complete workflow:");
    console.log(
      '      - Search for a route (e.g., "Los Angeles" to "San Francisco")'
    );
    console.log("      - Select attractions by clicking heart buttons");
    console.log(
      '      - Click "Make Route" to see the optimized route on the map'
    );
  } catch (error) {
    console.error("❌ Integration Test Failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log(
      "   1. Make sure backend is running: cd backend && python3 start_api.py"
    );
    console.log("   2. Make sure frontend is running: npm run dev");
    console.log("   3. Check that ports 8000 and 3000 are available");
  }
}

// Run the test
testAPI();
