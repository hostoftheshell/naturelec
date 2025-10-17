# Welcome to Starter!

This is a starter project with all the Cosmic Themes setup and utilities including:

- I18n capabilities
- Keystatic CMS
- Animations
- Content collections setup
- Basic Navbar
- Basic Footer
- BaseLayout with SEO setup

Otherwise, this is a a plain project with no content, for those that want to bring their own UI.

## Getting Started

1. To get started, first install all necessary packages with `npm install` or `pnpm install`, then run an initial build to make sure the setup works `npm run build` or `pnpm build`.
2. Next, you'll want to configure your site i18n setup (one language, or multiple). Simply run the command `npm run config-i18n` and follow the script instructions to get setup! For further information, see the [i18n documentation](https://cosmicthemes.com/docs/i18n/).
3. Now you can setup the site to your liking!
   - [Style customization](https://cosmicthemes.com/docs/styles/)
   - [Content editing](https://cosmicthemes.com/docs/content/)
   - [Animations](https://cosmicthemes.com/docs/animations/)
   - [Keystatic CMS](https://cosmicthemes.com/docs/keystatic/) - if you don't want Keystatic you can run `npm run remove-keystatic`
   - [Forms](https://cosmicthemes.com/docs/contact-form/)
   - [Bot Protection](#bot-protection-with-botpoison) - Protect your forms from spam

## Bot Protection with Botpoison

This project includes bot protection using [Botpoison](https://botpoison.com) to prevent spam and automated abuse on forms.

### Quick Setup

1. **Get your API keys** from [botpoison.com](https://botpoison.com/dashboard)
2. **Add to `.env` file**:
   ```bash
   PUBLIC_BOTPOISON_PUBLIC_KEY=pk_your_public_key_here
   BOTPOISON_SECRET_KEY=sk_your_secret_key_here
   ```
3. **For production**, add these same variables to your hosting platform (Netlify/Vercel environment variables)

### Documentation

- **[BOTPOISON_SETUP.md](./BOTPOISON_SETUP.md)** - Complete setup guide with examples
- **[BOTPOISON_MIGRATION.md](./BOTPOISON_MIGRATION.md)** - Migration from old implementation
- **[src/js/README.md](./src/js/README.md)** - Quick reference

### Example Usage

See working examples in:

- `src/components/forms/BotprotectedContactForm.tsx` - React form with bot protection
- `src/pages/api/message.ts` - API endpoint with verification

Should you need any assistance, send me a message at support@cosmicthemes.com

## More Resources

- See my blog post on [recommended Astro web development setup](https://cosmicthemes.com/blog/astro-web-development-setup/).
- You can learn more information from the [theme docs](https://cosmicthemes.com/docs/) page on the [Cosmic Themes Website](https://cosmicthemes.com/).
- For support, see the [support page](https://cosmicthemes.com/support/).
- [License details](https://cosmicthemes.com/license/)

## General Astro Info

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory. I also frequently use `src/assets` for images when using Astro asssets for image optimization.

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Want to learn more?

Feel free to check [the documentation](https://docs.astro.build) or jump into the [Discord server](https://astro.build/chat).
