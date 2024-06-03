import { createFrames } from 'frames.js/next';
import { farcasterHubContext } from 'frames.js/middleware';

export const frames = createFrames({
  middleware: [farcasterHubContext()],
});

export default frames;
