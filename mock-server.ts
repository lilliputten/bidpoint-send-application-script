/* eslint-disable no-console */

import express, { Request, Response } from 'express';
import multer from 'multer';

const app = express();
const port = 3000;

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = '/api/v1/candidates';

app.post(apiUrl, upload.single('cv'), (req: Request, res: Response) => {
  const { headers, body, file } = req;
  console.log('[mock-server:post]', apiUrl, 'got data', {
    headers,
    body,
    file,
  });

  // Log the payload
  if (req.body.payload) {
    try {
      const payload = JSON.parse(req.body.payload);
      console.log('[mock-server:post]', apiUrl, 'parsed data', {
        payload,
      });
      // debugger; // eslint-disable-line no-debugger
    } catch (error) {
      console.error('[mock-server] Error parsing payload:', error);
      debugger; // eslint-disable-line no-debugger
    }
  }

  // Simulate response
  res.json({
    success: true,
    message: 'Application received successfully',
    id: 'mock-id-' + Date.now(),
  });
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
