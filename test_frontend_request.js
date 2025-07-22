#!/usr/bin/env node

/**
 * Test to simulate the exact frontend request
 */

const API_BASE = "http://localhost:8000";

async function testFrontendRequest() {
  console.log("🔍 Testing exact frontend request...\n");

  // Exact data from frontend logs
  const frontendData = [
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

  console.log("📤 Simulating frontend request...");
  console.log("URL:", `${API_BASE}/optimize`);
  console.log("Method: POST");
  console.log("Headers: Content-Type: application/json");
  console.log("Body:", JSON.stringify(frontendData, null, 2));

  try {
    const response = await fetch(`${API_BASE}/optimize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(frontendData),
    });

    console.log(`\n📥 Response status: ${response.status}`);
    console.log(
      `📥 Response headers:`,
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log(`📥 Response body: ${responseText}`);

    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log(`✅ Success! Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`❌ Error! Status: ${response.status}`);
      console.log(`❌ Error body: ${responseText}`);
    }
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

testFrontendRequest();
