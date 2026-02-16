import { test as base, expect, Page } from '@playwright/test'

import { AgendarViagemPage } from './pages/AgendarViagemPage'
import { ConsultarViagensPage } from './pages/ConsultarViagensPage'
import { CommonPage } from './pages/CommonPage'

export type AppPage = Page & {
  agendarViagemPage: AgendarViagemPage
  consultarViagensPage: ConsultarViagensPage
  commonPage: CommonPage
}

export const test = base.extend<{ page: AppPage }>({
  page: async ({ page }, use) => {
    const context = page as AppPage

    context.agendarViagemPage = new AgendarViagemPage(page)
    context.consultarViagensPage = new ConsultarViagensPage(page)
    context.commonPage = new CommonPage(page)
    
    await use(context)
  },
})

export { expect }
