# How to Bypass Cookie Consent

Find your library or service below and act as instructed

## Google Tag Manager

To bypass cookie consent for Google Tag Manager, set the following cookie:

**Cookie Name:** `CookieConsent`

**Cookie Value:**

```json
{"googleconsentmap":{"ad_storage":"targeting","analytics_storage":"performance","ad_user_data":"targeting","ad_personalization":"targeting","functionality_storage":"functionality","personalization_storage":"functionality","security_storage":"functionality"},"firstpage":"{url}","action":"accept","consenttime":{today},"categories":"[\"functionality\",\"targeting\",\"performance\",\"unclassified\"]"}
```

**Placeholders:**

- `{url}` - Replace with the current page URL
- `{today}` - Replace with current timestamp (e.g., `1699876543210`)

**Example:**

```javascript
document.cookie =
  'CookieConsent={"googleconsentmap":{"ad_storage":"targeting","analytics_storage":"performance","ad_user_data":"targeting","ad_personalization":"targeting","functionality_storage":"functionality","personalization_storage":"functionality","security_storage":"functionality"},"firstpage":"https://example.com","action":"accept","consenttime":1699876543210,"categories":"[\\"functionality\\",\\"targeting\\",\\"performance\\",\\"unclassified\\"]"}';
```
