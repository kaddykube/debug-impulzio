import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', get_lang(event))
    });
};

import type { RequestEvent } from '@sveltejs/kit';

function get_lang(event: RequestEvent) {
    return 'language';
}
