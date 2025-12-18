/* eslint-disable no-console */

import * as crypto from 'crypto';
import * as fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

const isDryRun = process.argv.includes('--dry-run');
const isDebug = process.argv.includes('--debug');
const isDev = process.env.NODE_ENV === 'development';

const API_URL =
  isDebug || isDev
    ? 'http://localhost:3000/api/v1/candidates'
    : 'https://api.bidpoint.ai/api/v1/candidates';

interface Payload {
  name: string;
  email: string;
  message?: string;
  role?: string;
  experienceYears?: number;
  experienceLevel?: string;
  salary?: number;
}

// Read message from file
const message = fs.readFileSync('message.txt', 'utf-8').trim();

// Construct payload
const payload: Payload = {
  name: 'Igor',
  email: 'igor@lilliputten.com',
  message,
  role: 'frontend',
  experienceYears: 8,
  experienceLevel: 'senior',
  salary: 3000,
};

async function submitApplication(isDryRun: boolean = false): Promise<void> {
  try {
    // Generate timestamp and signature
    const timestamp = Date.now().toString();
    const signature = crypto
      .createHash('sha256')
      .update(`${payload.name}-${timestamp}`)
      .digest('hex');

    // Create form data
    const form = new FormData();
    form.append('cv', fs.createReadStream('cv-lilliputten-2025-v1-en.pdf'));
    form.append('payload', JSON.stringify(payload));

    // Set headers
    const headers: FormData.Headers = {
      'x-timestamp': timestamp,
      'x-signature': signature,
      ...form.getHeaders(),
    };

    if (isDryRun) {
      headers['x-dry-run'] = 'true';
    }

    console.log('[submit:submitApplication] before send', {
      API_URL,
      payload,
      timestamp,
      signature,
      form,
      headers,
      isDryRun,
    });
    debugger; // eslint-disable-line no-debugger

    // Send request
    const response = await axios.post(API_URL, form, { headers });

    const { data, status, statusText, headers: responseHeaders } = response;

    console.log('[submit:submitApplication] got response:', {
      status,
      statusText,
      data,
      responseHeaders,
      response,
    });
    debugger; // eslint-disable-line no-debugger
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError with detailed information in a single console.error call
      const message = error.message || 'Unknown network error';
      console.error('[submit:submitApplication] AxiosError occurred:', {
        message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.request?.path || error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        responseData: error.response?.data,
        timeout: error.config?.timeout,
        errorCode: error.code,
        stack: error.stack,
        isDryRun,
        isDev,
        API_URL,
      });
    } else {
      // Handle generic errors
      const message = error instanceof Error ? error.message : String(error);
      console.error('[submit:submitApplication] Non-Axios Error:', {
        message,
        error,
        isDryRun,
        isDev,
        API_URL,
      });
    }
    debugger; // eslint-disable-line no-debugger
  }
}

// Check command line arguments for dry-run
submitApplication(isDryRun);
