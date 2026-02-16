import { test } from '../support'

test.describe('Relatórios e Estatísticas', () => {
    test.beforeEach(async ({ page }) => {
        await page.agendarViagemPage.visitar()
        await page.agendarViagemPage.preencherESubmeterFormulario()
        await page.commonPage.visitarMenu('Relatórios')
    })

    test('Deve validar o Total de Viagens', async ({ page }) => {
        await page.relatoriosPage.validarTotalDeViagens()
    })

    // Teste não passa porque a formatação do valor está incorreta
    test('Deve validar a Receita Total', async ({ page }) => {
        await page.relatoriosPage.validarReceitaTotal()
    })

    // Teste não passa porque o cálculo da taxa de sucesso está incorreto
    test('Deve validar a Taxa de Sucesso', async ({ page }) => {
        await page.relatoriosPage.validarTaxaDeSucesso()
    })
})