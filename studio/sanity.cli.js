import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'shamimelectropalace', // https://shamimelectropalace.sanity.studio
  deployment: { appId: 'oufesfolnk36h71dj5b9u9o5' },
})
