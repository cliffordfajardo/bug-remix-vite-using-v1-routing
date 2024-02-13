import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,
            <RemixBrowser />,
            // We've disabled <StrictMode> during development since it causes lots of confusion in development for engineers.
            // When React app is running in strict mode, components are mounted & unmounted 2x times.
            // If <StrictMode> is enabled in your react app, you'll see multiple API calls made to your backend & some slowdown
            // due to the unmount/remounting of components.
            // Engineers are often confused when looking at their server and devtool js console &
            // seeing this unexpected app behavior that they did not write in their own code.
            // Strict mode created by the react team & is not bad a thing; maybe in future react versions we can consider re-enabling.
            //
            // In Remix apps disabling Strict mode is usually not a problem since we are not data-fetching
            // inside of components, we're not using `useEffect` often or incorrectly as Remix framework
            // generally pushes users to use good React patterns from the beginning.
            //
            // Some opinions on this topic of react strict mode:
            // - https://twitter.com/schickling/status/1523378971458498560
            // - https://twitter.com/ryanflorence/status/1603798909343911936
            // - https://twitter.com/reactjs/status/1509729057541341184
            // <StrictMode>
            //   <RemixBrowser />
            // </StrictMode>
        );
    });
}

if (typeof requestIdleCallback === "function") {
    requestIdleCallback(hydrate);
} else {
    // Safari doesn't support requestIdleCallback : https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1);
}
