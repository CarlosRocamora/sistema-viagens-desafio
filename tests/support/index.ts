import { test as base, expect, Page } from '@playwright/test'

import { AgendarViagemPage } from './pages/AgendarViagemPage'

export type AppPage = Page & {
  agendarViagemPage: AgendarViagemPage
}

export const test = base.extend<{ page: AppPage }>({
  page: async ({ page }, use) => {
    const context = page as AppPage

    context.agendarViagemPage = new AgendarViagemPage(page)
    
    await use(context)
  },
})

export { expect }
