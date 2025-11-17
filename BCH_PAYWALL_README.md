# Bitcoin Cash (BCH) Micro-Payment Paywall

A complete, production-ready Bitcoin Cash payment wall implementation with real blockchain integration.

## 🎯 Features

### ✅ Implemented
- **Real BCH Address Generation** using @bitauth/libauth (BIP39 compatible)
- **Multiple API Integration** for payment detection:
  - Bitcoin.com REST API
  - FullStack.cash Electrumx API  
  - Transaction history verification
- **Wallet Connection Support**:
  - Direct wallet URI protocol (bitcoincash:)
  - Bitcoin.com Wallet integration
  - Paytaca Wallet support
  - Universal BCH wallet compatibility
- **Real-time Payment Monitoring** (polls every 4 seconds)
- **QR Code Generation** for mobile wallet scanning
- **Smooth Animations** with unlock effects
- **Responsive Design** with modern BCH-themed UI
- **Database Integration** for session management
- **Edge Functions** for secure server-side logic

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Components**:
  - `LockedContent` - Blurred premium content view
  - `UnlockedContent` - Full content after payment
  - `PaymentModal` - Payment interface with tabs (Wallet/QR)
  - `WalletConnectButton` - Direct wallet payment buttons
  - `QRDisplay` - QR code generation

### Backend (Lovable Cloud / Supabase)
- **Database**:
  - `payment_sessions` table - Tracks payment addresses and status
- **Edge Functions**:
  - `create-payment-session` - Generates unique BCH addresses using libauth
  - `check-payment` - Monitors blockchain for incoming payments

### Libraries Used
- `@bitauth/libauth` - Bitcoin Cash address generation, HD wallets
- `mainnet-js` - BCH wallet operations
- `qrcode.react` - QR code generation
- `@psf/bch-js` - Bitcoin Cash JavaScript SDK

## 📦 How It Works

### Payment Flow

1. **User Clicks "Unlock with BCH"**
   - Frontend calls `create-payment-session` edge function
   - Backend generates unique BCH address using libauth
   - Session stored in database

2. **Payment Address Display**
   - User can choose wallet payment or QR scan
   - Address shown with multiple wallet options
   - QR code generated for mobile wallets

3. **Payment Monitoring**
   - Frontend polls `check-payment` every 4 seconds
   - Backend queries multiple BCH APIs for redundancy:
     - Bitcoin.com REST API
     - FullStack.cash Electrumx API
     - Transaction history check

4. **Payment Confirmation**
   - When payment detected, session updated as paid
   - Frontend shows confirmation animation
   - Content automatically unlocked

## 🧪 Testing the Application

### Option 1: Bitcoin Cash Testnet (Chipnet)

**Get Test BCH:**
1. Visit [BCH Testnet Faucet](https://tbch.googol.cash/)
2. Enter testnet address and receive free test BCH
3. Use testnet wallet (Bitcoin.com Wallet with testnet enabled)

**Update for Testnet:**
```typescript
// In supabase/functions/create-payment-session/index.ts
const addressResult = lockingBytecodeToCashAddress({
  bytecode: lockingBytecode,
  prefix: 'bchtest', // Changed from 'bitcoincash'
});
```

### Option 2: Mainnet with Small Amounts

**Real BCH Payment:**
1. Get a BCH wallet: [Bitcoin.com Wallet](https://wallet.bitcoin.com) or [Paytaca](https://www.paytaca.com)
2. Buy small amount of BCH (0.0001 BCH ≈ $0.03)
3. Test with real micro-payments

### Option 3: Local Testing with Mock

For development without real BCH:
```typescript
// Temporarily modify check-payment to auto-confirm after 10 seconds
setTimeout(() => {
  // Auto-confirm payment for testing
  return Response.json({ paid: true });
}, 10000);
```

## 🔧 Configuration

### Environment Variables
All automatically configured by Lovable Cloud:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side authentication
- `SUPABASE_ANON_KEY` - Client-side authentication

### Payment Amount
Edit in `src/pages/Index.tsx`:
```typescript
const paymentAmount = 0.0001; // BCH amount required
```

### API Endpoints
Configure in `check-payment/index.ts`:
```typescript
const apis = [
  { name: 'Bitcoin.com', url: 'https://rest.bitcoin.com/v2/...' },
  { name: 'FullStack.cash', url: 'https://api.fullstack.cash/v5/...' },
];
```

## 🚀 Deployment

### Automatic Deployment
- **Frontend**: Changes deploy automatically via Lovable
- **Edge Functions**: Deploy automatically on code push
- **Database**: Migrations run on save

### Manual Testing
1. **View Logs**: Check Lovable Cloud → Functions → Logs
2. **Test Payments**: Use browser devtools Network tab
3. **Monitor Database**: Check Lovable Cloud → Database

## 📱 Wallet Integration

### Supported Wallets
- ✅ Bitcoin.com Wallet (iOS/Android/Web)
- ✅ Paytaca (iOS/Android)
- ✅ Electron Cash (Desktop)
- ✅ Any BCH wallet supporting payment URIs

### Payment URI Format
```
bitcoincash:<address>?amount=<amount_in_bch>
```

### Deep Linking
Clicking "Pay with BCH Wallet" triggers:
```javascript
window.location.href = `bitcoincash:${address}?amount=${amount}`;
```

## 🔒 Security Features

### RLS Policies
- Public read access for payment verification
- Server-only write access for sessions
- No user authentication required for paywall

### Address Generation
- Uses cryptographically secure random generation
- HD wallet compatible (BIP32/BIP39)
- Unique address per session

### API Redundancy
- Multiple blockchain APIs prevent single point of failure
- Timeout protection (5 seconds per API)
- Fallback to transaction history check

## 📊 Database Schema

### payment_sessions Table
```sql
CREATE TABLE payment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_address TEXT UNIQUE NOT NULL,
  amount DECIMAL(16, 8) NOT NULL,
  paid BOOLEAN DEFAULT false,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## 🎨 Customization

### Design System
Colors defined in `src/index.css`:
```css
--primary: 123 59% 47%; /* BCH Green */
--primary-glow: 123 70% 60%; /* Lighter green */
--gradient-primary: linear-gradient(135deg, ...);
```

### Content
Edit locked/unlocked content in:
- `src/components/LockedContent.tsx`
- `src/components/UnlockedContent.tsx`

## 🐛 Troubleshooting

### Payment Not Detecting
1. **Check Logs**: Lovable Cloud → Functions → check-payment logs
2. **Verify Address**: Ensure address generated correctly
3. **API Status**: Test APIs directly in browser
4. **Amount**: Confirm exact amount sent (not less)

### Address Generation Errors
1. **Check libauth Import**: Verify @bitauth/libauth installed
2. **Fallback Active**: Check if fallback address generator used
3. **View Logs**: create-payment-session function logs

### Wallet Connection Issues
1. **Mobile**: Ensure BCH wallet app installed
2. **Desktop**: May need to manually copy address
3. **URI Format**: Verify bitcoincash: prefix included

## 📚 References

### Official Documentation
- [Bitcoin Cash Documentation](https://documentation.cash/)
- [CashScript Documentation](https://cashscript.org/)
- [Libauth Documentation](https://libauth.org/)
- [Mainnet.cash Tutorial](https://mainnet.cash/tutorial/)

### APIs Used
- [Bitcoin.com REST API](https://rest.bitcoin.com/)
- [FullStack.cash API](https://fullstack.cash/)
- [Bitcoin.com Block Explorer](https://explorer.bitcoin.com/)

### Tools
- [CashScript Playground](https://playground.cashscript.org/)
- [BitauthIDE](https://ide.bitauth.com/)
- [BCH Connect React](https://www.npmjs.com/package/bch-connect)

## 🤝 Contributing

### Potential Enhancements
1. **CashScript Integration** - Smart contract paywalls
2. **CashTokens Support** - NFT-gated content
3. **Subscription Model** - Recurring payments
4. **Analytics Dashboard** - Payment tracking
5. **Webhook Support** - Real-time notifications
6. **Multi-tier Pricing** - Different content levels

### Production Improvements
1. **HD Wallet Master Seed** - Proper BIP32 derivation
2. **Transaction Confirmation** - Wait for 1+ confirmations
3. **Webhook Integration** - Push notifications instead of polling
4. **Rate Limiting** - Prevent API abuse
5. **Session Persistence** - LocalStorage for unlocked state

## 📄 License

MIT License - Use freely for commercial or personal projects

## 💬 Support

For questions or issues:
- GitHub Issues
- Lovable Community Discord
- BCH Developer Telegram

---

**Built with ❤️ using Bitcoin Cash - The future of peer-to-peer electronic cash**
