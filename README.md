# 🚀 Bitcoin Cash (BCH) Micro-Payment Paywall

A complete, production-ready Bitcoin Cash payment wall system with real blockchain integration, admin dashboard, and balance tracking.

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4)](https://lovable.dev)
[![Bitcoin Cash](https://img.shields.io/badge/Bitcoin-Cash-brightgreen)](https://bitcoincash.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

### 💰 **Payment System**
- ✅ **Real BCH Integration** - Direct payments to your wallet
- ✅ **Multiple API Support** - Blockchair, Bitcoin.com, FullStack.cash
- ✅ **Instant Detection** - Real-time payment monitoring
- ✅ **Test Mode** - Auto-confirm for development
- ✅ **QR Codes** - Mobile wallet scanning
- ✅ **Wallet Connect** - One-click payment buttons

### 📊 **Admin Dashboard**
- ✅ **Balance Tracking** - See total received BCH
- ✅ **Payment History** - All transactions in one place
- ✅ **Real-time Updates** - Live payment notifications
- ✅ **Blockchain Verification** - Check balance directly
- ✅ **Stats Overview** - Confirmed, pending, and total

### 🎨 **User Experience**
- ✅ **Beautiful Design** - Modern BCH-themed UI
- ✅ **Smooth Animations** - Unlock effects and transitions
- ✅ **Mobile Optimized** - Works on all devices
- ✅ **Wallet Integration** - Bitcoin.com, Paytaca support
- ✅ **Content Protection** - Blur effects and secure gates

### 🔒 **Security**
- ✅ **Secure Secrets** - Merchant address stored safely
- ✅ **RLS Policies** - Database-level security
- ✅ **Address Validation** - Proper BCH format checking
- ✅ **API Redundancy** - Multiple fallback APIs

---

## 🎯 Live Demo

**Try it now**: Enable Test Mode → Click Unlock → Wait 10s → Content unlocks!

**Test with Real BCH**:
1. Get a BCH wallet: [wallet.bitcoin.com](https://wallet.bitcoin.com)
2. Send 0.0001 BCH to the payment address
3. Watch it unlock automatically!

---

## 🚀 Quick Start

### 1. **Clone & Setup**

This project is built with Lovable and runs on Lovable Cloud:

```bash
# Via Lovable (Recommended)
Visit: https://lovable.dev/projects/f504f7cb-229e-4e4b-a786-9a307d17aeb5
Click "Remix Project" to create your own copy

# Via GitHub (Advanced)
git clone https://github.com/yourusername/bch-paywall
cd bch-paywall
npm install
```

### 2. **Configure Your Merchant Address**

**In Lovable (Easiest)**:
1. Open project in Lovable
2. Go to Cloud → Secrets
3. Add/Edit `MERCHANT_BCH_ADDRESS`
4. Paste your BCH wallet address
5. Save

**Format**: `bitcoincash:qr...` (CashAddr format)

**Get BCH Wallet**:
- [Bitcoin.com Wallet](https://wallet.bitcoin.com) (Mobile/Web)
- [Paytaca](https://www.paytaca.com) (Mobile)
- [Electron Cash](https://electroncash.org) (Desktop)

### 3. **Test the Application**

**Option A: Test Mode (No BCH Required)**
```
1. Toggle "Test Mode" (bottom-right)
2. Click "Unlock with BCH"
3. Wait 10 seconds
4. Content unlocks automatically!
```

**Option B: Real BCH Payment**
```
1. Turn off Test Mode
2. Click "Unlock with BCH"
3. Send 0.0001 BCH to the address
4. Payment detected automatically
5. Content unlocks!
```

### 4. **Check Your Balance**

**Visit Admin Dashboard**:
```
https://your-app.com/admin
```

**Features**:
- 💰 Total received balance
- ⏳ Pending payments
- 📊 Payment history table
- 🔄 Real-time updates
- 💱 Blockchain balance check

---

## 📦 What's Included

### Frontend Components
```
src/
├── components/
│   ├── LockedContent.tsx      # Blurred content gate
│   ├── UnlockedContent.tsx    # Premium content
│   ├── PaymentModal.tsx       # Payment interface
│   ├── QRDisplay.tsx          # QR code generator
│   ├── WalletConnectButton.tsx # Wallet integration
│   └── TestModeToggle.tsx     # Development tool
├── pages/
│   ├── Index.tsx              # Main paywall page
│   └── Admin.tsx              # Dashboard
└── assets/
    └── bch-hero.jpg           # Hero image
```

### Backend (Lovable Cloud)
```
supabase/
├── functions/
│   ├── create-payment-session/ # Generate payment
│   └── check-payment/          # Verify blockchain
└── migrations/
    └── payment_sessions.sql    # Database schema
```

### Configuration
```
- MERCHANT_BCH_ADDRESS  # Your wallet (Secret)
- SUPABASE_URL          # Auto-configured
- SUPABASE_SERVICE_KEY  # Auto-configured
```

---

## 💻 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Components
- **React Router** - Navigation
- **Tanstack Query** - Data fetching
- **Sonner** - Toast notifications

### Backend
- **Lovable Cloud** - Serverless platform
- **Supabase** - Database & auth
- **Edge Functions** - Serverless API
- **PostgreSQL** - Data storage

### Blockchain
- **@bitauth/libauth** - BCH address generation
- **mainnet-js** - BCH operations
- **QRCode.react** - QR generation
- **Multiple APIs** - Payment detection

---

## 🎨 Customization

### Change Payment Amount

**File**: `src/pages/Index.tsx`
```typescript
const paymentAmount = 0.0001; // Change this

// Common amounts:
// 0.0001 BCH ≈ $0.035 - Micro payment
// 0.001 BCH ≈ $0.35 - Small article
// 0.01 BCH ≈ $3.50 - Premium content
```

### Customize Content

**Locked Content**: `src/components/LockedContent.tsx`
**Unlocked Content**: `src/components/UnlockedContent.tsx`

Change text, images, and layout as needed.

### Update Branding

**Colors**: `src/index.css`
```css
:root {
  --primary: 123 59% 47%;        /* BCH Green */
  --primary-glow: 123 70% 60%;   /* Lighter green */
  /* Add your brand colors */
}
```

**Logo**: Replace `<Coins>` icon in `Index.tsx`

### Multiple Price Tiers

```typescript
const pricingTiers = {
  basic: 0.0001,
  premium: 0.001,
  pro: 0.01,
};

// Show different content based on tier
```

---

## 📊 Admin Dashboard

### Access

**URL**: `https://your-app.com/admin`

### Features

**Overview Cards**:
- 💰 **Total Received** - All confirmed payments
- ⏳ **Pending** - Unconfirmed transactions
- 📊 **Total Sessions** - All payment attempts

**Merchant Address**:
- Display your receiving address
- One-click copy
- Link to blockchain explorer

**Payment History**:
- Date & time of payment
- Amount (BCH & USD estimate)
- Status (Paid/Pending)
- Session ID

**Actions**:
- 🔄 **Refresh** - Update data
- 💱 **Check Balance** - Query blockchain
- 📋 **Copy Address** - Easy sharing

### Real-time Updates

The dashboard automatically updates when:
- New payment sessions created
- Payments confirmed
- Status changes

Powered by Supabase Realtime.

---

## 🧪 Testing Guide

### Test Mode

**Enable**: Toggle switch (bottom-right of page)

**Behavior**:
- Payments auto-confirm after 10 seconds
- No real BCH required
- Perfect for UI testing

**Use Cases**:
- Development
- Demo presentations
- UI/UX testing
- Client previews

### Testnet Testing

**Setup**:
1. Get testnet BCH: [tbch.googol.cash](https://tbch.googol.cash/)
2. Use testnet wallet
3. Update edge functions for testnet

**Benefits**:
- Free test BCH
- Real blockchain behavior
- Safe testing environment

### Production Testing

**Small Amounts**:
1. Start with 0.0001 BCH (≈$0.03)
2. Verify payment detection
3. Check admin dashboard
4. Confirm balance in wallet

**Monitor**:
- Edge function logs
- Database records
- Blockchain explorer

---

## 🚀 Deployment

### Via Lovable (Recommended)

**Automatic Deployment**:
1. Code changes auto-deploy
2. Click "Publish" in Lovable
3. Click "Update" to go live

**Custom Domain**:
1. Project → Settings → Domains
2. Connect your domain
3. Update DNS records
4. Wait for verification

### Manual Deployment

**Build**:
```bash
npm run build
```

**Deploy to**:
- Vercel
- Netlify  
- Cloudflare Pages

**Environment**:
```bash
# Required secrets
MERCHANT_BCH_ADDRESS=bitcoincash:qr...

# Auto-configured by Lovable Cloud
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_ANON_KEY=...
```

---

## 📈 Monitoring & Analytics

### Edge Function Logs

**Access**: Lovable Cloud → Functions → Logs

**Monitor**:
- Payment session creation
- Blockchain API calls
- Payment confirmations
- Error rates

### Database Queries

**Access**: Cloud → Database → Tables

**Check**:
- Total payment sessions
- Confirmed vs pending
- Average payment time
- Revenue trends

### Blockchain Verification

**Explorer**: [explorer.bitcoin.com/bch](https://explorer.bitcoin.com/bch)

**Search**: Your merchant address

**View**:
- All incoming transactions
- Confirmation status
- Transaction details
- Total received

---

## 🔧 Troubleshooting

### Payment Not Detecting

**Check**:
1. ✅ Test mode status (ON/OFF)
2. ✅ Merchant address configured
3. ✅ Edge function logs
4. ✅ Transaction on blockchain
5. ✅ Correct amount sent

**Solutions**:
- Enable test mode for testing
- Verify address format
- Check API access in logs
- Wait for blockchain confirmation

### Edge Function Errors

**DNS Errors**: Known issue, use test mode or check logs

**Timeout**: APIs auto-fallback, check which succeeded

### Balance Not Showing

**Verify**:
1. Transaction confirmed (≈10 min)
2. Correct merchant address
3. Amount matches requirement
4. Check wallet directly

**Manual Check**:
- Admin → "Check Balance"
- Blockchain explorer
- Wallet app

### Admin Dashboard Issues

**Not Loading**: Check browser console

**No Data**: Verify merchant address secret

**Not Updating**: Check realtime connection

---

## 🛠️ Advanced Features

### CashScript Smart Contracts

Implement advanced payment logic:
- Time-locked payments
- Escrow services
- Automated refunds
- Multi-signature

### CashTokens (NFTs)

Token-gated content:
- NFT ownership verification
- Transferable access
- Membership tokens
- Collectibles

### Payment Webhooks

Real-time notifications:
- Instant confirmations
- No polling needed
- Better performance
- Lower costs

### Multi-tier Pricing

Different content levels:
```typescript
const tiers = {
  basic: { price: 0.0001, content: 'basic' },
  pro: { price: 0.001, content: 'premium' },
  enterprise: { price: 0.01, content: 'all' },
};
```

---

## 📚 Documentation

### Official Docs
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[BCH_PAYWALL_README.md](./BCH_PAYWALL_README.md)** - Technical details
- **[Bitcoin Cash Docs](https://documentation.cash/)** - BCH protocol
- **[CashScript](https://cashscript.org/)** - Smart contracts
- **[Lovable Docs](https://docs.lovable.dev/)** - Platform docs

### Code Examples
- Address generation: `create-payment-session/index.ts`
- Payment detection: `check-payment/index.ts`
- Admin dashboard: `src/pages/Admin.tsx`
- Payment UI: `src/components/PaymentModal.tsx`

### Community
- [BCH Developer Telegram](https://t.me/bchchannel)
- [r/btc Subreddit](https://reddit.com/r/btc)
- [Bitcoin.com Forum](https://forum.bitcoin.com/)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to branch
5. Open pull request

**Ideas**:
- New wallet integrations
- Additional payment APIs
- UI/UX improvements
- Documentation updates
- Bug fixes

---

## 📋 Roadmap

### Phase 1 (✅ Complete)
- [x] Basic paywall system
- [x] BCH payment integration
- [x] Admin dashboard
- [x] Real-time monitoring
- [x] Test mode
- [x] Multiple APIs

### Phase 2 (🚧 In Progress)
- [ ] Webhook support
- [ ] Advanced analytics
- [ ] Mobile app (PWA)
- [ ] Multi-language support

### Phase 3 (📅 Planned)
- [ ] CashScript integration
- [ ] CashTokens support
- [ ] Subscription model
- [ ] API for developers

---

## 💡 Use Cases

### Content Creators
- Blog paywalls
- Premium articles
- Video content
- Podcast episodes
- Digital downloads

### Developers
- API access gates
- Developer docs
- Code snippets
- Tool access
- Premium features

### Businesses
- Reports & whitepapers
- Market analysis
- Consulting content
- Training materials
- Software licenses

### Education
- Course content
- Study materials
- Certification prep
- Video lessons
- Practice tests

---

## 🎯 Why Bitcoin Cash?

### Fast
- **0-confirmation** - Instant transactions
- **~10 second** final confirmation
- No waiting for payments

### Low Fees
- **<$0.01** average fee
- Perfect for micro-payments
- No minimum amount

### Reliable
- **Proven technology** since 2017
- **High capacity** blockchain
- **Active development**

### User-Friendly
- **Mobile wallets** everywhere
- **QR code** payments
- **Simple** addresses

---

## ⚖️ License

**MIT License**

Free to use for commercial and personal projects.

See [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

### Built With
- [Lovable](https://lovable.dev) - Development platform
- [Bitcoin Cash](https://bitcoincash.org) - Payment network
- [Supabase](https://supabase.com) - Backend infrastructure

### Libraries
- [@bitauth/libauth](https://github.com/bitauth/libauth) - BCH operations
- [mainnet-js](https://mainnet.cash/) - BCH toolkit
- [shadcn/ui](https://ui.shadcn.com/) - UI components

### Inspiration
- Bitcoin Cash community
- Crypto payment pioneers
- Open source contributors

---

## 📞 Support

### Need Help?

**Documentation**: Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Issues**: Open a GitHub issue

**Community**: Join BCH developer channels

**Email**: support@your-domain.com

---

## 🌟 Star Us!

If you find this useful, please star the repository!

It helps others discover the project.

---

<div align="center">

**Built with ❤️ using Bitcoin Cash**

*Peer-to-peer electronic cash for the world* 🌍

[Demo](https://your-app.com) • [Docs](./DEPLOYMENT_GUIDE.md) • [Community](https://t.me/bchchannel)

</div>

---

## 📸 Screenshots

### Main Paywall
![Paywall](docs/screenshots/paywall.png)

### Payment Modal
![Payment](docs/screenshots/payment.png)

### Admin Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Mobile View
![Mobile](docs/screenshots/mobile.png)

---

**Ready to start?** Click the button in the top nav to visit the admin dashboard!

**Questions?** Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed setup instructions.
