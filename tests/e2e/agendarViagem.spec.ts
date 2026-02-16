import { test } from '../support'
import { obterDataAtual } from '../support/helpers/obterDataAtual'
import data from '../support/fixtures/viagem.json'

test.describe('Agendamento de Viagens', () => {
  test.beforeEach(async ({ page }) => {
    await page.agendarViagemPage.visitar()
  })

  /***
   * Os 3 próximos testes não estão passando porque a formatação da moeda não está no formato BR
   */
  test('Deve agendar nova viagem com dados válidos (Standard)', async ({ page }) => {
    const dataAtual = obterDataAtual()
    const viagem = data.viagemValida

    await page.agendarViagemPage.preencherFormulario(
      viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
      viagem.telefone, dataAtual, viagem.observacoes
    )
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'agendada com sucesso! Valor: R$ 1.290,75'
    await page.commonPage.verificarMensagemDeSucesso(mensagem)
  })

  test('Deve agendar nova viagem do tipo executivo', async ({ page }) => {
    const dataAtual = obterDataAtual()
    const viagem = data.executivo

    await page.agendarViagemPage.preencherFormulario(
      viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
      viagem.telefone, dataAtual, viagem.observacoes
    )
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'agendada com sucesso! Valor: R$ 2.751,00'
    await page.commonPage.verificarMensagemDeSucesso(mensagem)
  })

  test('Deve agendar nova viagem do tipo compartilhado', async ({ page }) => {
    const dataAtual = obterDataAtual()
    const viagem = data.compartilhado

    await page.agendarViagemPage.preencherFormulario(
      viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
      viagem.telefone, dataAtual, viagem.observacoes
    )
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'agendada com sucesso! Valor: R$ 402,00'
    await page.commonPage.verificarMensagemDeSucesso(mensagem)
  })

  test('Deve validar campos obrigatórios', async ({ page }) => {
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'Preencha origem e destino'
    await page.agendarViagemPage.verificarMensagemDeErro(mensagem)
  })

  test('Deve rejeitar distância negativa', async ({ page }) => {
    const dataAtual = obterDataAtual()
    const viagem = data.distanciaNegativa

    await page.agendarViagemPage.preencherFormulario(
      viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
      viagem.telefone, dataAtual, viagem.observacoes
    )
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'Distância inválida'
    await page.agendarViagemPage.verificarMensagemDeErro(mensagem)
  })

  /***
   * O teste não passa porque o desconto está incorreto
   */
  test('Deve aplicar desconto para distância > 500km', async ({ page }) => {
    const dataAtual = obterDataAtual()
    const viagem = data.desconto

    await page.agendarViagemPage.preencherFormulario(
      viagem.origem, viagem.destino, viagem.distancia, viagem.numeroDePassageiros, viagem.tipo, viagem.passageiro,
      viagem.telefone, dataAtual, viagem.observacoes
    )
    await page.agendarViagemPage.submeterFormulario()

    const mensagem = 'agendada com sucesso! Valor: R$ 1.353,60'
    await page.commonPage.verificarMensagemDeSucesso(mensagem)
  })
})