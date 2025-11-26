// api/webhooks/lemonsqueezy.js
// Vercel serverless function to handle Lemon Squeezy webhooks

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook signature
  const signature = req.headers['x-signature'];
  const body = JSON.stringify(req.body);
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('Webhook secret not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const calculatedSignature = hmac.digest('hex');

  if (signature !== calculatedSignature) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body;
  const eventType = event.meta?.event_name;

  try {
    switch (eventType) {
      case 'subscription_created':
      case 'subscription_updated':
        // Handle subscription events
        console.log('Subscription event:', eventType, event.data);
        const subscription = event.data;
        // Log subscription details for monitoring
        console.log(`Subscription ${subscription.id} - Status: ${subscription.attributes.status}, Customer: ${subscription.attributes.customer_id}`);
        break;

      case 'subscription_cancelled':
        // Handle cancellation
        console.log('Subscription cancelled:', event.data);
        const cancelledSubscription = event.data;
        console.log(`Subscription ${cancelledSubscription.id} cancelled - Customer: ${cancelledSubscription.attributes.customer_id}`);
        break;

      case 'license_key_created':
      case 'license_key_updated':
        // Handle license key events
        console.log('License key event:', eventType, event.data);
        const licenseKey = event.data;
        console.log(`License key ${licenseKey.id} - Status: ${licenseKey.attributes.status}, Order: ${licenseKey.attributes.order_id}`);
        break;

      case 'order_created':
        // Handle new order
        console.log('Order created:', event.data);
        const order = event.data;
        console.log(`Order ${order.id} created - Total: ${order.attributes.total}, Customer: ${order.attributes.customer_id}`);
        break;

      default:
        console.log('Unhandled event:', eventType);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}


