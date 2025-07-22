#!/usr/bin/env node

/**
 * Debug script to test the optimize endpoint
 */

const API_BASE = "http://localhost:8000";

async function debugOptimize() {
  console.log("🔍 Debugging optimize endpoint...\n");

  // Test data that should work
  const testData = [
    {
      key: "attraction_0",
      location: {
        lat: 34.0536909,
        lng: -118.242766,
      },
    },
    {
      key: "attraction_1",
      location: {
        lat: 37.7792588,
        lng: -122.4193286,
      },
    },
  ];

  console.log("📤 Sending data:", JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(`${API_BASE}/optimize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`📥 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ Error response: ${errorText}`);
    } else {
      const data = await response.json();
      console.log(`✅ Success response:`, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

debugOptimize();
