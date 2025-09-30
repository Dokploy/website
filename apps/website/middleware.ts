import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	locales: ["en", "fr", "es", "zh-Hans"],

	// Used when no locale matches
	defaultLocale: "en",
	localePrefix: "as-needed",
	
	// Disable automatic locale detection to prevent browser language override
	localeDetection: false,
});

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
