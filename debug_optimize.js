#!/usr/bin/env node

/**
 * Debug script to test the optimize endpoint
 */

const API_BASE = "http://localhost:8000";

async function debugOptimize() {
  console.log("🔍 Debugging optimize endpoint...\n");

  // Test data that matches exactly what frontend is sending
  const testData = [
    {
      key: "TheMadGreekformerlyS",
      location: {
        lat: 33.8752945,
        lng: -117.566444,
      },
    },
    {
      key: "ChevrongaspumpJimRut",
      location: {
        lat: 33.8808327,
        lng: -117.5133522,
      },
    },
    {
      key: "McDonaldsFoothillBou",
      location: {
        lat: 34.1338751,
        lng: -117.9056046,
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
