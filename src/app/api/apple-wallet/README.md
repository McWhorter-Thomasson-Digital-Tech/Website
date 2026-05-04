# Apple Wallet Web Service Architecture

To support APNs (Apple Push Notification service) background updates for Apple Wallet passes, you must implement a set of REST API endpoints that conform to Apple's Wallet Web Service protocol. 

When a pass is installed and the `webServiceURL` and `authenticationToken` are set in the `pass.json`, the user's iOS device will automatically register itself with your server. When you update a pass, you send a push notification to Apple's APNs servers, which then wakes up the user's device. The device will then contact your web service to download the latest pass.

## Required API Endpoints

### 1. Register a Device for Push Notifications
**Endpoint:** `POST /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}/{serialNumber}`
**Description:** Called by iOS when the user adds a pass to their wallet, or when the push token changes.
**Payload:**
```json
{
  "pushToken": "..."
}
```
**Action:** Store the `deviceLibraryIdentifier`, `passTypeIdentifier`, `serialNumber`, and `pushToken` in your database.

### 2. Unregister a Device
**Endpoint:** `DELETE /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}/{serialNumber}`
**Description:** Called by iOS when the user deletes a pass from their wallet.
**Action:** Remove the corresponding registration record from your database so you stop sending push notifications for this device.

### 3. Get Serial Numbers for Passes Associated with a Device
**Endpoint:** `GET /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}?passesUpdatedSince={tag}`
**Description:** Called by iOS after it receives a push notification. It asks your server "which passes of this type have changed since `{tag}`?".
**Response:**
```json
{
  "lastUpdated": "current_timestamp_or_tag",
  "serialNumbers": ["card-employeeId1", "card-employeeId2"]
}
```
**Action:** Return an array of serial numbers for passes that were updated after the `passesUpdatedSince` tag. If `passesUpdatedSince` is omitted, return all serial numbers associated with that device.

### 4. Get the Latest Version of a Pass
**Endpoint:** `GET /v1/passes/{passTypeIdentifier}/{serialNumber}`
**Description:** Called by iOS for each serial number returned in step 3.
**Headers:** `Authorization: ApplePass {authenticationToken}`
**Response:** The raw `.pkpass` file byte stream.
**Action:** Verify the authentication token matches the one generated when the pass was created. If valid, generate the updated `.pkpass` bundle and return it with the `application/vnd.apple.pkpass` Content-Type.

### 5. Log Errors (Optional but Recommended)
**Endpoint:** `POST /v1/log`
**Description:** iOS sends error logs here if something goes wrong during registration or pass updating.
**Payload:**
```json
{
  "logs": ["Error description 1", "Error description 2"]
}
```
**Action:** Save these logs to your server logs or database to help with debugging.

## Triggering an Update

When an employee updates their business card information (e.g., in a CMS or database):
1. Identify all `pushToken`s associated with the `serialNumber` of that pass.
2. Increment the "updated_at" or change the tag for that pass in your database.
3. Send an empty JSON payload push notification to Apple's APNs endpoint using the `pushToken`s.
4. iOS devices will receive the push, ping endpoint #3, then ping endpoint #4 to pull the new pass visually into the user's wallet.
