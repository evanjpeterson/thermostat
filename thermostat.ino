#include <stddef.h>
#include <stdint.h>
#include <EEPROM.h>
#include <WiFi.h>
#include "wifi_credentials.h"

const size_t EEPROM_SIZE = 1;
const uint8_t EEPROM_LED = 0;
const uint8_t LED_PIN = 2;
const uint16_t timeoutTime = 2000; // ms

// Set the webserver port
WiFiServer server(80);

uint8_t getStoredLedState() {
  uint8_t ledState = EEPROM.read(EEPROM_LED);
  return ledState == HIGH ? HIGH : LOW;
}

void sendResponse(WiFiClient &client) {
  uint8_t ledState = getStoredLedState();

  // Send the HTTP response header, followed by a newline.
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println();

  // Send the response body (the webpage).
  client.println(R"(
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="data:," />
      <title>Thermostat Control</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <script type="text/javascript">
        var thermostatGlobals = {
  )");

  // Inject any data that JS needs.
  client.print("'ledEnabled': ");
  client.print(ledState == HIGH ? "true" : "false");
  client.print(",\n");

  client.println(R"(
        };
      </script>
      <script src="https://cdn.jsdelivr.net/gh/evanjpeterson/thermostat@0.1.0/frontend/dist/thermostat-control.0.1.0.bundle.js"></script>
    </body>
    </html>
  )");
  // End the HTTP response with another blank line.
  client.println();
}

void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, getStoredLedState());

  // Connect to Wi-Fi network with SSID and password
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  // Wait for a client to connect.
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  unsigned long currentTime = millis();
  unsigned long previousTime = currentTime;
  String request = "";
  uint16_t charsSinceNewline = 0;
  uint8_t ledState;
  uint8_t storedLedState;

  while (client.connected() && currentTime - previousTime <= timeoutTime) {
    currentTime = millis();
    if (!client.available()) {
      continue;
    }

    // Client has a byte available to read.
    char c = client.read();
    Serial.write(c);
    request += c;

    // HTTP Requests should end with CRLF (\r\n), but it's recommended to just check for LF (\n).
    if (c == '\r') {
      continue;
    }

    if (c != '\n') {
      charsSinceNewline += 1;
      continue;
    }

    // Got a LF (\n).
    if (charsSinceNewline > 0) {                    
      // Since this line had data, the request isn't done yet. We'll get the next line.
      charsSinceNewline = 0;
      continue;
    }

    // Got a lone LF (\n), so the client HTTP request is complete.
    // First, handle the client request.
    storedLedState = getStoredLedState();
    ledState = storedLedState;
    if (request.indexOf("GET /led/on") >= 0) {
      ledState = HIGH;
    } else if (request.indexOf("GET /led/off") >= 0) {
      ledState = LOW;
    }
    if (ledState != storedLedState) {
      digitalWrite(LED_PIN, ledState);
      EEPROM.write(EEPROM_LED, ledState);
      EEPROM.commit();
    }

    // Next, send a response back to the client.
    sendResponse(client);
    // Done responding to the client, no need to wait for the timeout to complete.
    break;
  }

  // Close the connection.
  client.stop();
}
