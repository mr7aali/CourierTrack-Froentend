# CourierTrack - Multi-Language Support

A modern courier tracking and parcel management system with comprehensive multi-language support for English and Bengali.

## 🌍 Multi-Language Features

### Supported Languages

- **English (en)** - Default language
- **Bengali (bn)** - Complete Bengali translation

### Key Features

- **Automatic Language Detection** - Users are redirected to their preferred language
- **Language Switcher** - Easy switching between English and Bengali
- **URL-based Language Routing** - Clean URLs with locale prefixes (`/en/`, `/bn/`)
- **Comprehensive Translations** - All UI elements, forms, and messages are translated
- **RTL Support Ready** - Built with consideration for right-to-left languages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CourierTrack-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   - English: `http://localhost:3000/en`
   - Bengali: `http://localhost:3000/bn`
   - Auto-redirect: `http://localhost:3000` (redirects to default locale)

## 📁 Project Structure

```
CourierTrack-Frontend/
├── app/
│   ├── [locale]/           # Locale-specific pages
│   │   ├── layout.tsx      # Locale-specific layout
│   │   ├── page.tsx        # Home page
│   │   ├── admin/          # Admin pages
│   │   ├── agent/          # Agent pages
│   │   ├── customer/       # Customer pages
│   │   └── auth/           # Authentication pages
│   ├── layout.tsx          # Root layout (redirect)
│   └── page.tsx            # Root page (redirect)
├── components/
│   ├── language-switcher.tsx  # Language switcher component
│   └── Shared/
│       └── Header.tsx      # Header with language switcher
├── messages/
│   ├── en.json             # English translations
│   └── bn.json             # Bengali translations
├── i18n.ts                 # Internationalization configuration
├── middleware.ts           # Locale routing middleware
└── next.config.js         # Next.js configuration
```

## 🌐 Translation Structure

### Translation Files

The application uses JSON-based translation files located in the `messages/` directory:

- `messages/en.json` - English translations
- `messages/bn.json` - Bengali translations

### Translation Categories

```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel"
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard"
  },
  "auth": {
    "login": {
      "title": "Welcome Back",
      "email": "Email Address"
    }
  },
  "users": {
    "title": "User Management",
    "addUser": "Add User"
  }
}
```

### Using Translations in Components

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("users");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{t("addUser")}</button>
    </div>
  );
}
```

## 🔧 Configuration

### Internationalization Setup

1. **i18n.ts** - Main configuration file

   ```typescript
   export const locales = ["en", "bn"] as const;
   export const defaultLocale = "en" as const;
   ```

2. **middleware.ts** - Handles locale routing

   ```typescript
   export const config = {
     matcher: ["/", "/(bn|en)/:path*"],
   };
   ```

3. **next.config.js** - Next.js with internationalization
   ```javascript
   const withNextIntl = require("next-intl/plugin")();
   module.exports = withNextIntl(nextConfig);
   ```

### Adding New Languages

1. **Create translation file**

   ```bash
   cp messages/en.json messages/[locale].json
   ```

2. **Update i18n.ts**

   ```typescript
   export const locales = ["en", "bn", "[new-locale]"] as const;
   ```

3. **Update middleware.ts**
   ```typescript
   matcher: ["/", "/(bn|en|[new-locale])/:path*"];
   ```

## 🎨 Language Switcher Component

The language switcher is automatically included in the header and allows users to switch between languages:

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

// Automatically handles:
// - Current locale detection
// - URL-based navigation
// - Translation of language names
```

## 📱 Responsive Design

The multi-language implementation is fully responsive and works across all device sizes:

- **Desktop**: Full language switcher with dropdown
- **Mobile**: Compact language switcher
- **Tablet**: Optimized layout for touch interfaces

## 🔍 SEO and Accessibility

### SEO Features

- **Language-specific meta tags** - Proper `lang` attributes
- **URL structure** - Clean, SEO-friendly URLs
- **Hreflang support** - Ready for search engine optimization

### Accessibility Features

- **Screen reader support** - Proper ARIA labels
- **Keyboard navigation** - Full keyboard accessibility
- **High contrast support** - Works with accessibility themes

## 🧪 Testing

### Testing Translations

```bash
# Run tests
npm test

# Test specific locale
npm run test:locale:en
npm run test:locale:bn
```

### Manual Testing Checklist

- [ ] Language switcher works on all pages
- [ ] URLs update correctly when switching languages
- [ ] All text is properly translated
- [ ] Forms and validation messages are translated
- [ ] Error messages are translated
- [ ] Success messages are translated

## 🚀 Deployment

### Environment Variables

```bash
# Optional: Set default locale
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Optional: Set supported locales
NEXT_PUBLIC_SUPPORTED_LOCALES=en,bn
```

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

### Adding New Translations

1. **Fork the repository**
2. **Create a new translation file** in `messages/`
3. **Update configuration files** (i18n.ts, middleware.ts)
4. **Test thoroughly** with the new language
5. **Submit a pull request**

### Translation Guidelines

- **Consistency**: Use consistent terminology across the application
- **Context**: Provide context for translators when needed
- **Testing**: Always test translations in the actual application
- **Cultural Sensitivity**: Consider cultural differences in translations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support with multi-language features:

1. **Check the documentation** in this README
2. **Review translation files** in the `messages/` directory
3. **Test with different locales** using the language switcher
4. **Open an issue** if you find bugs or need help

---

**Built with ❤️ using Next.js, TypeScript, and next-intl**
