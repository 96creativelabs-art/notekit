// api/activate-license.js
// Vercel serverless function to activate license keys

import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { licenseKey, instanceId } = req.body;

  if (!licenseKey || !instanceId) {
    return res.status(400).json({ error: 'License key and instance ID required' });
  }

  try {
    // Activate license key
    const response = await ls.licenseKeys.activate({
      licenseKey: licenseKey,
      instanceName: instanceId, // Unique identifier for this installation
    });

    if (response.data && response.data.activated) {
      const license = response.data.license_key;
      return res.status(200).json({
        activated: true,
        licenseKey: license,
        expiresAt: license.expires_at,
      });
    } else {
      return res.status(400).json({
        activated: false,
        error: response.data?.error || 'Activation failed',
      });
    }
  } catch (error) {
    console.error('License activation error:', error);
    // Return more specific error information
    if (error.response) {
      console.error('Lemon Squeezy API error:', error.response.status, error.response.data);
      return res.status(500).json({ 
        error: 'License activation failed',
        details: error.response.data?.errors?.[0]?.detail || 'Unknown error'
      });
    }
    return res.status(500).json({ error: 'License activation failed' });
  }
}


