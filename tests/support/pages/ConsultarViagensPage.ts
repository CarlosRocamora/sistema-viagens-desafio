import { expect, Page } from "@playwright/test"

export class ConsultarViagensPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visitar() {
        await this.page.goto('/consultar')
        const consultarViagensTitle = this.page.getByRole('heading', { name: 'Consultar Viagens' })
        await expect(consultarViagensTitle).toBeVisible()
    }

    async preencherCampoDeBusca(informacao: string) {
        await this.page.getByPlaceholder('Buscar por ID, passageiro, origem ou destino').fill(informacao)
    }

    async buscar() {
        await this.page.getByRole('button', { name: 'Buscar' }).click()
    }

    async cancelarViagem(id: string) {
        await this.page.locator('table tbody tr', { hasText: id })
            .getByRole('button', { name: 'Cancelar' }).click()
    }

    async filtrarStatus() {
        const todosStatus = [
            'Pendente',
            'Confirmado',
            'Em Rota',
            'Concluído',
            'Cancelado'
        ]

        for (const status of todosStatus) {
            await this.page.locator('//label[text()="Filtrar por Status:"]/../select')
                .selectOption(status)

            await this.verificarResultadoBusca(status)
        }
    }

    async verificarQuantidadeDeLinhas(quantidade: number) {
        const rows = this.page.locator('.table tbody tr')
        await expect(rows).toHaveCount(quantidade)
    }

    async verificarResultadoBusca(termo: string): Promise<void> {
        const rows = this.page.locator('.table tbody tr')

        const textos: string[] = await rows.allTextContents()

        expect(textos.length).toBeGreaterThan(0)

        for (const texto of textos) {
            expect(texto).toContain(termo)
        }
    }

}