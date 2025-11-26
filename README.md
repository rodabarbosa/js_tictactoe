# Tic Tac Toe (Jogo da Velha)

Projeto simples em JavaScript puro para praticar manipulação do DOM, tratamento de eventos e lógica de jogo. A ideia é implementar o clássico jogo "tic-tac-toe" (conhecido no Brasil como "jogo da velha") usando apenas HTML, CSS e JavaScript, sem bibliotecas externas.

## Funcionalidades

- Dois jogadores (X e O) em um mesmo dispositivo
- Detecta vitória (linhas, colunas e diagonais)
- Detecta empate
- Botão para reiniciar o jogo
- Interface leve e responsiva (HTML/CSS simples)

## Como executar

1. Abra o arquivo `index.html` no seu navegador (duplo-clique ou arraste para uma janela do navegador).
2. Opcional: sirva a pasta com um servidor local (recomendado para desenvolvimento). Exemplo usando Python a partir do PowerShell:

```powershell
python -m http.server 8000
# então abra http://localhost:8000
```

Ou use a extensão "Live Server" do VS Code para um fluxo de desenvolvimento instantâneo.

## Estrutura do projeto

- `index.html` — marcação e layout da página
- `css/app.css` — estilos do jogo
- `js/app.js` — lógica principal do jogo (turnos, verificação de vitória/empate, reinício)
- `README.md` — este arquivo

## Como jogar

1. Dois jogadores usam o mesmo computador/dispositivo.
2. O jogador X começa e clica em uma das células do tabuleiro.
3. Os jogadores alternam até que alguém vença ou o tabuleiro fique cheio (empate).
4. Use o botão "Reiniciar" para começar uma nova partida.

## Contribuição

Contribuições são bem-vindas — abra uma issue para sugerir melhorias ou envie um pull request com correções/novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Sinta-se à vontade para reutilizar e adaptar o código.

---

Autor: Rodrigo A Barbosa
