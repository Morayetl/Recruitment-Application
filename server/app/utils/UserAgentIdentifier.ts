
/**
 * Returns true if its google bot
 * @param agentName Name of the agent
 */
export function isGoogleBot(agentName: string) {
    if(!agentName) return false;

    const match = /Googlebot|Googlebot-Image|Mediapartners-Google/i;
    return match.test(agentName);
}