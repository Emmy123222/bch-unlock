# 🚀 BCH Paywall Deployment & Setup Guide

Complete guide to deploying your Bitcoin Cash micro-payment paywall application.

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Testing](#testing)
- [Production Deployment](#production-deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### 1. Get Your BCH Wallet Address

**You need a Bitcoin Cash wallet to receive payments:**

**Option A: Bitcoin.com Wallet (Recommended)**
1. Download: [wallet.bitcoin.com](https://wallet.bitcoin.com)
2. Create new wallet
3. Tap "Receive" → Copy your BCH address
4. Format: `bitcoincash:qr...` (CashAddr format)

**Option B: Paytaca Wallet**
1. Download: [paytaca.com](https://www.paytaca.com)
2. Create wallet
3. Copy receiving address

**Option C: Hardware Wallet**
- Ledger or Trezor with BCH support
- Export your BCH receiving address

### 2. Configure Merchant Address

The merchant address has been added as a secret in Lovable Cloud.

To update it:
1. Go to Lovable Cloud → Secrets
2. Edit `MERCHANT_BCH_ADDRESS`
3. Paste your BCH wallet address
4. Save

**⚠️ Critical:** Use a CashAddr format address starting with `bitcoincash:q...`

### 3. Test the Application

**Enable Test Mode:**
1. Visit your app
2. Toggle "Test Mode" (bottom-right)
3. Click "Unlock with BCH"
4. Wait 10 seconds → Payment auto-confirms
5. Content unlocks!

**Test Real Payments (Testnet):**
1. Get test BCH: [tbch.googol.cash](https://tbch.googol.cash/)
2. Update edge function to use testnet addresses
3. Send test payment
4. Verify payment detection

---

## 🔧 Configuration

### Environment Variables (Automatic)

These are configured automatically by Lovable Cloud:
- `SUPABASE_URL` - Database URL
- `SUPABASE_SERVICE_ROLE_KEY` - Server key
- `SUPABASE_ANON_KEY` - Client key

### Merchant Secrets (Required)

Configure in Lovable Cloud → Secrets:
- `MERCHANT_BCH_ADDRESS` - Your BCH receiving address

### Payment Settings

Edit in `src/pages/Index.tsx`:
```typescript
const paymentAmount = 0.0001; // Change payment amount
```

Common amounts:
- `0.0001` BCH ≈ $0.035 (micro-payment)
- `0.001` BCH ≈ $0.35 (small article)
- `0.01` BCH ≈ $3.50 (premium content)

---

## 🧪 Testing

### Test Mode (No Real BCH Required)

1. **Enable Test Mode**: Toggle in app UI
2. **Test Flow**:
   ```
   Click "Unlock" → Wait 10s → Auto-confirms
   ```
3. **Check Logs**: Lovable Cloud → Functions → Logs

### Testnet Testing (Free Test BCH)

1. **Get Testnet Address**:
   - Use testnet wallet or convert mainnet address
   
2. **Get Test BCH**:
   - Visit: [BCH Testnet Faucet](https://tbch.googol.cash/)
   - Enter address, receive free test BCH
   
3. **Update for Testnet**:
   ```typescript
   // In create-payment-session/index.ts
   const NETWORK = 'testnet'; // Change from 'mainnet'
   ```

4. **Test Payment Flow**:
   - Click unlock
   - Send testnet BCH
   - Verify detection
   - Check admin dashboard

### Production Testing (Real BCH)

1. **Small Amount First**:
   - Test with 0.0001 BCH (≈$0.03)
   - Verify payment receipt
   - Check balance in admin

2. **Monitor Logs**:
   - Edge function logs
   - Database updates
   - Payment confirmations

---

## 🌐 Production Deployment

### Pre-Deployment Checklist

- [ ] Merchant BCH address configured
- [ ] Test mode disabled in production
- [ ] Payment amount set correctly
- [ ] Admin dashboard access secured
- [ ] Edge functions tested
- [ ] Database backup enabled

### Deploy Frontend

**Automatic Deployment via Lovable:**
1. All code changes auto-deploy
2. Click "Publish" in Lovable
3. Click "Update" to push to production
4. URL: `yourapp.lovableproject.com`

**Custom Domain:**
1. Go to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow DNS setup instructions
4. Wait for verification (5-30 minutes)

### Deploy Backend

**Edge Functions:**
- Deploy automatically on code push
- No manual action needed
- Check logs: Cloud → Functions

**Database:**
- Migrations run automatically
- View tables: Cloud → Database

### Security Checklist

- [ ] **Merchant address** stored as secret (✅ Done)
- [ ] **Admin page** protected (add auth if needed)
- [ ] **RLS policies** enabled on tables
- [ ] **HTTPS** enforced (automatic with Lovable)
- [ ] **API rate limiting** considered

---

## 📊 Monitoring

### Admin Dashboard

**Access**: `yourapp.com/admin`

**Features**:
- 💰 Total received balance
- ⏳ Pending payments
- 📊 Payment history
- 🔄 Real-time updates
- 📋 Copy merchant address
- 💱 Check blockchain balance

**Dashboard Sections**:
1. **Stats Cards**:
   - Total Received (confirmed BCH)
   - Pending Payments (unconfirmed)
   - Total Payment Count

2. **Merchant Address Card**:
   - Your receiving address
   - One-click copy

3. **Payment Sessions Table**:
   - Date & time
   - Amount (BCH & USD estimate)
   - Status (Paid/Pending)
   - Session ID

### Check Balance

**From Admin Dashboard**:
1. Click "Check Balance" button
2. Queries blockchain directly
3. Shows: Balance + Total Received

**From Blockchain Explorer**:
1. Visit: [explorer.bitcoin.com](https://explorer.bitcoin.com/bch)
2. Enter your merchant address
3. View all transactions

**From Wallet**:
- Open your BCH wallet
- View balance natively
- Most accurate method

### Edge Function Logs

**View Logs**:
1. Lovable Cloud → Functions
2. Select function:
   - `create-payment-session`
   - `check-payment`
3. View real-time logs

**What to Monitor**:
- Payment address generation
- API call success/failures
- Payment detection events
- Error messages

### Database Monitoring

**View Data**:
1. Cloud → Database → Tables
2. Select `payment_sessions`
3. See all payment records

**Key Metrics**:
- Total sessions created
- Confirmed payments
- Pending payments
- Average payment time

---

## 🔍 Troubleshooting

### Payment Not Detecting

**Symptoms**:
- User paid but content not unlocking
- "Waiting for payment" stays indefinitely

**Solutions**:

1. **Check Test Mode**:
   ```
   Is test mode ON? → Payment auto-confirms after 10s
   Is test mode OFF? → Need real blockchain payment
   ```

2. **Verify Address**:
   - Logs show merchant address?
   - Address matches your wallet?
   - Correct format (bitcoincash:q...)?

3. **Check API Access**:
   ```
   Cloud → Functions → check-payment → Logs
   Look for: "Blockchair API error" or "DNS error"
   ```

4. **Blockchain Confirmation**:
   - Check [explorer.bitcoin.com](https://explorer.bitcoin.com/bch)
   - Search your merchant address
   - Verify transaction exists
   - Wait for 1 confirmation (≈10 min)

5. **Manual Balance Check**:
   - Admin dashboard → "Check Balance"
   - Should show received funds

### Edge Function Errors

**DNS/Network Errors**:
```
error: failed to lookup address information
```

**Solution**: This is a known issue with external API access from edge functions.
- Enable Test Mode for testing
- Real payments still work (balance updates)
- Consider webhook integration for production

**Timeout Errors**:
```
error: request timeout
```

**Solution**:
- APIs have 5-8 second timeouts
- Automatic fallback to next API
- Check logs for which API succeeded

### Balance Not Updating

**Check These**:

1. **Transaction Confirmed?**:
   - BCH needs 1 confirmation
   - Usually takes ≈10 minutes
   - 0-conf shown immediately

2. **Correct Address?**:
   ```bash
   # In logs, verify:
   "Using merchant address: bitcoincash:q..."
   ```

3. **Amount Correct?**:
   - Sent exact amount required?
   - Not less due to fees?

4. **Manual Verification**:
   - Check wallet balance directly
   - Use blockchain explorer
   - Compare with database records

### Admin Dashboard Issues

**Dashboard Not Loading**:
1. Check authentication (if added)
2. Verify database connection
3. Check browser console for errors

**Data Not Showing**:
1. Verify merchant address in env
2. Check payment_sessions table
3. Refresh button → check logs

**Real-time Not Working**:
1. Check Supabase connection
2. Verify realtime enabled on table
3. Inspect network tab for websocket

### User Experience Issues

**QR Code Not Scanning**:
- Ensure QR contains payment URI
- Format: `bitcoincash:address?amount=X`
- Test with Bitcoin.com wallet

**Wallet Not Opening**:
- Mobile: Ensure BCH wallet installed
- Desktop: Copy address manually
- Check wallet compatibility

**Content Not Unlocking**:
1. Check payment status in database
2. Verify payment modal closes on success
3. Check browser console errors
4. Test with test mode enabled

---

## 🛠️ Advanced Configuration

### Custom Payment Amounts

**Dynamic Pricing**:
```typescript
// Different tiers
const pricingTiers = {
  basic: 0.0001,
  premium: 0.001,
  pro: 0.01,
};
```

### Webhook Integration

For instant notifications (production):

1. **Use Payment Processor**:
   - [CashPayServer](https://developers-cash.github.io/cash-pay-server/)
   - Webhook notifications
   - Instant confirmation

2. **Direct Blockchain Webhooks**:
   - Requires dedicated service
   - Not available in standard edge functions

### Custom Confirmation Times

```typescript
// Wait for multiple confirmations
const REQUIRED_CONFIRMATIONS = 1; // Default: 0 (instant)
```

### Analytics Integration

Add tracking:
```typescript
// In Index.tsx
const handlePaymentSuccess = () => {
  // Google Analytics
  gtag('event', 'purchase', {
    value: amount,
    currency: 'BCH',
  });
  
  // Custom analytics
  analytics.track('payment_confirmed', {
    amount,
    timestamp: Date.now(),
  });
};
```

---

## 📈 Scaling & Performance

### High Volume (100+ payments/day)

1. **Database Indexing**:
   - Already optimized with indexes
   - Monitor query performance

2. **API Rate Limits**:
   - Consider dedicated BCH node
   - Use multiple API providers
   - Implement caching

3. **Edge Function Limits**:
   - Lovable Cloud auto-scales
   - Monitor execution time
   - Optimize polling interval

### Reducing Costs

1. **Polling Frequency**:
   ```typescript
   // Change from 4s to 10s
   const POLL_INTERVAL = 10000; // milliseconds
   ```

2. **API Calls**:
   - Cache results temporarily
   - Reduce number of APIs called
   - Use webhooks instead of polling

---

## 🔐 Security Best Practices

### Protect Admin Dashboard

Add authentication:
```typescript
// In Admin.tsx
const { data: session } = useSession();

if (!session || session.user.role !== 'admin') {
  return <Navigate to="/" />;
}
```

### Secure Merchant Address

- ✅ Stored as secret (not in code)
- ✅ Only accessible in edge functions
- ⚠️ Never expose in client code

### Rate Limiting

Implement on edge functions:
```typescript
// Check payment rate limit
const recentRequests = await getRateLimitCount(clientIP);
if (recentRequests > 100) {
  return Response.json({ error: 'Rate limit' }, { status: 429 });
}
```

---

## 📞 Support & Resources

### Official Documentation
- [Bitcoin Cash Docs](https://documentation.cash/)
- [CashScript Guide](https://cashscript.org/)
- [Lovable Docs](https://docs.lovable.dev/)

### Community
- [BCH Developer Telegram](https://t.me/bchchannel)
- [r/btc Subreddit](https://reddit.com/r/btc)
- [Bitcoin.com Forum](https://forum.bitcoin.com/)

### Tools
- [BCH Explorer](https://explorer.bitcoin.com/bch)
- [BCH Testnet Faucet](https://tbch.googol.cash/)
- [CashScript Playground](https://playground.cashscript.org/)

---

## 🎯 Next Steps

1. ✅ **Configure** merchant address
2. ✅ **Test** with test mode
3. ✅ **Verify** payments in admin dashboard
4. 📊 **Monitor** using Cloud logs
5. 🚀 **Deploy** to production
6. 💰 **Share** your paywall link
7. 📈 **Scale** as needed

---

**Need Help?** Check the troubleshooting section or reach out to the BCH developer community!

**Ready for Production?** Follow the deployment checklist above.

**Want More Features?** Check the suggestions in the main README.md file.

---

Built with ❤️ using Bitcoin Cash - Peer-to-peer electronic cash for the world 🌍
