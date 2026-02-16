import { test as base, expect, Page } from '@playwright/test'

import { AgendarViagemPage } from './pages/AgendarViagemPage'
import { ConsultarViagensPage } from './pages/ConsultarViagensPage'
import { CommonPage } from './pages/CommonPage'
import { RelatoriosPage } from './pages/RelatoriosPage'

export type AppPage = Page & {
  agendarViagemPage: AgendarViagemPage
  consultarViagensPage: ConsultarViagensPage
  commonPage: CommonPage
  relatoriosPage: RelatoriosPage
}

export const test = base.extend<{ page: AppPage }>({
  page: async ({ page }, use) => {
    const context = page as AppPage

    context.agendarViagemPage = new AgendarViagemPage(page)
    context.consultarViagensPage = new ConsultarViagensPage(page)
    context.commonPage = new CommonPage(page)
    context.relatoriosPage = new RelatoriosPage(page)

    await use(context)
  },
})

export { expect }
