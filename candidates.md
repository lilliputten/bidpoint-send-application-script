# Bidpoint API - Candidate Application Endpoint

Welcome to the Bidpoint developer application process! This document explains how to
submit your resume to our Candidates API endpoint.

## Request Format

Send a 'POST' request to '/api/v1/candidates' using 'multipart/form-data'
with the following content:

1. 'cv': Your CV in PDF format
2. 'payload': Your information

## Payload Structure

The payload should be a JSON with the following fields:

Required:

- 'name' (string): Your full name
- 'email' (string): Your email address

Optional:

- 'message' (string): Cover letter or additional message
- 'role' (string): One of '"frontend"', '"backend"', '"fullstack"'
- 'experienceYears' (number): Years of experience
- 'experienceLevel' (string): One of '"junior"', '"mid"', '"senior"', '"lead"'
- 'salary' (number): Expected salary in EUR per month

## Signing

Requests must include the following headers:

- 'x-timestamp': Current timestamp in milliseconds
- 'x-signature': SHA-256 of the string '{name}-{timestamp}'

Incorrectly signed requests will be rejected.

## Requirements

- CV must be a valid PDF (max 5MB)
- Email must be valid, we will use it to contact you if your application is selected
- Timestamp must be within 5 minutes of the current time
- Only the first submission will be recorded. Make it count.

## Testing

We recommend testing your approach before submitting your application. To do so you can set
the 'x-dry-run' header to 'true' and check the response. This will validate everything without
actually saving your application. Only submit your real application once the dry run passes
successfully.
