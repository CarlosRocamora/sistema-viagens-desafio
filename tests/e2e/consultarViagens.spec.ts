import { test } from '../support'

test.describe('Consultar Viagens', () => {
    test.beforeEach(async ({ page }) => {
        await page.agendarViagemPage.visitar()
    })

    test('Deve buscar uma viagem existente', async ({ page }) => {
        await page.agendarViagemPage.preencherESubmeterFormulario()
        const idGerado = await page.agendarViagemPage.obterIdDaMensagemDeSucesso()

        await page.commonPage.visitarMenu('Consultar Viagens')
        await page.consultarViagensPage.preencherCampoDeBusca(idGerado)
        await page.consultarViagensPage.buscar()

        await page.consultarViagensPage.verificarQuantidadeDeLinhas(1)
        await page.consultarViagensPage.verificarResultadoBusca(idGerado)
    })

    test('Deve filtrar viagens por status', async ({ page }) => {
        await page.agendarViagemPage.preencherESubmeterFormulario()
        await page.agendarViagemPage.preencherESubmeterFormulario()
        const idGerado = await page.agendarViagemPage.obterIdDaMensagemDeSucesso()

        await page.commonPage.visitarMenu('Consultar Viagens')
        await page.consultarViagensPage.cancelarViagem(idGerado)

        await page.consultarViagensPage.filtrarStatus()
    })

    test('Deve cancelar uma viagem', async ({ page }) => {
        await page.agendarViagemPage.preencherESubmeterFormulario()
        const idGerado = await page.agendarViagemPage.obterIdDaMensagemDeSucesso()

        await page.commonPage.visitarMenu('Consultar Viagens')
        await page.consultarViagensPage.cancelarViagem(idGerado)

        const mensagem = 'Viagem cancelada com sucesso'
        await page.commonPage.verificarMensagemDeSucesso(mensagem)

        const status = 'Cancelado'
        const badge = 'cancelled'
        const backgroundRgb = 'rgb(254, 226, 226)'
        const colorRgb = 'rgb(153, 27, 27)'

        await page.consultarViagensPage.verificarTextoECorStatus(idGerado, status, badge, backgroundRgb, colorRgb )
    })
})