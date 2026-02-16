import { test, expect } from '../support'

test.describe('Consultar Viagens', () => {
    test.beforeEach(async ({ page }) => {

    })

    test('Deve buscar uma viagem existente', async ({ page }) => {
        await page.agendarViagemPage.visitar()
        await page.agendarViagemPage.preencherESubmeterFormulario()
        const idGerado = await page.agendarViagemPage.obterIdDaMensagemDeSucesso()

        await page.commonPage.visitarMenu('Consultar Viagens')
        await page.consultarViagensPage.preencherCampoDeBusca(idGerado)
        await page.consultarViagensPage.buscar()

        await page.consultarViagensPage.verificarQuantidadeDeLinhas(1)
        await page.consultarViagensPage.verificarResultadoBusca(idGerado)
    })

    test('Deve filtrar viagens por status', async ({ page }) => {
        await page.agendarViagemPage.visitar()
        await page.agendarViagemPage.preencherESubmeterFormulario()
        await page.agendarViagemPage.preencherESubmeterFormulario()
        const idGerado = await page.agendarViagemPage.obterIdDaMensagemDeSucesso()

        await page.commonPage.visitarMenu('Consultar Viagens')
        await page.consultarViagensPage.cancelarViagem(idGerado)

        await page.consultarViagensPage.filtrarStatus()
    })


})