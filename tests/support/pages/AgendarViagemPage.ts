import { expect, Page } from "@playwright/test"

export class AgendarViagemPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visitar() {
        await this.page.goto('/agendar')
        const agendarNovaViagemForm = this.page.getByRole('heading', { name: 'Agendar Nova Viagem' })
        await expect(agendarNovaViagemForm).toBeVisible()
    }

    async preencherFormulario(origem: string, destino: string, distancia: string,
        numeroDePassageiros: string, tipo: string, passageiro: string, telefone: string, data: string, observacoes: string
    ) {
        await this.page.locator('#origem').fill(origem)
        await this.page.locator('#destino').fill(destino)
        await this.page.locator('#distancia').fill(distancia)
        await this.page.locator('#passageiros').fill(numeroDePassageiros)
        await this.page.locator('#tipo').selectOption(tipo)
        await this.page.locator('#nomePassageiro').fill(passageiro)
        await this.page.locator('#telefonePassageiro').fill(telefone)
        await this.page.locator('#dataAgendamento').fill(data)
        await this.page.locator('#observacoes').fill(observacoes)
    }

    async submeterFormulario() {
        await this.page.getByRole('button', { name: 'Agendar Viagem' }).click()
    }

    async verificarMensagemDeSucesso(mensagem: string) {
        const alert = this.page.locator('.alert-success')
        await expect(alert).toContainText(mensagem)
    } 

    async verificarMensagemDeErro(mensagem: string) {
        const alert = this.page.locator('.alert-error')
        await expect(alert).toContainText(mensagem)
    }
}