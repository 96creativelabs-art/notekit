// api/verify-license.js
// Vercel serverless function to verify license keys

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

  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ error: 'License key required' });
  }

  try {
    // Verify license key with Lemon Squeezy
    const response = await ls.licenseKeys.verify({
      licenseKey: licenseKey,
    });

    if (response.data && response.data.valid) {
      const license = response.data.license_key;
      
      // Check if license is active
      const isActive = license.status === 'active';
      const expiresAt = license.expires_at;
      const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
      const isValid = isActive && !isExpired;

      return res.status(200).json({
        valid: isValid,
        status: license.status,
        expiresAt: expiresAt,
        activationLimit: license.activation_limit,
        activationUsage: license.activation_usage,
      });
    } else {
      return res.status(200).json({
        valid: false,
        error: 'Invalid license key',
      });
    }
  } catch (error) {
    console.error('License verification error:', error);
    // Return more specific error information
    if (error.response) {
      console.error('Lemon Squeezy API error:', error.response.status, error.response.data);
      return res.status(500).json({ 
        error: 'License verification failed',
        details: error.response.data?.errors?.[0]?.detail || 'Unknown error'
      });
    }
    return res.status(500).json({ error: 'License verification failed' });
  }
}


