import { expect, Page } from "@playwright/test"
import { obterDataAtual } from '../helpers/obterDataAtual'
import data from '../fixtures/viagem.json'

export class AgendarViagemPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visitar() {
        await this.page.goto('/agendar')
        const agendarNovaViagemTitle = this.page.getByRole('heading', { name: 'Agendar Nova Viagem' })
        await expect(agendarNovaViagemTitle).toBeVisible()
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

    async preencherESubmeterFormulario() {
        const viagem = data.viagemValida
        const dataAtual = obterDataAtual()

        await this.preencherFormulario(viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
            viagem.telefone, dataAtual, viagem.observacoes)
        await this.submeterFormulario()
    }

    async verificarMensagemDeSucesso(mensagem: string) {
        const alert = this.page.locator('.alert-success')
        await expect(alert).toContainText(mensagem)
    }

    async verificarMensagemDeErro(mensagem: string) {
        const alert = this.page.locator('.alert-error')
        await expect(alert).toContainText(mensagem)
    }

    async obterIdDaMensagemDeSucesso(): Promise<string> {
        const alerta = this.page.locator('.alert-success')

        await expect(alerta).toBeVisible()

        const mensagem = await alerta.textContent()

        const match = mensagem?.match(/VIA-\d{3}/)

        if (!match) {
            throw new Error(`ID não encontrado na mensagem: ${mensagem}`)
        }

        return match[0]
    }
}