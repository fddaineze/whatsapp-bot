# whatsapp-bot
WhatsApp bot maked by Daineze with whatsapp-bot.js and ❤

#

## First step
change your number in data.json and add to "premiumUsers" too.

```
Installing:
~ npm install

Run
~ npm bot.js
```

---

## Google Cloud / Speech-to-Text (pt-br)
### *(Audio to Text Transcribe)*

1. Configure as credenciais do Google Cloud Speech:
    - Acesse o painel em Google Cloud Console https://console.cloud.google.com/
    - Crie um novo projeto ou selecione um projeto existente.
    - No menu lateral, clique em "IAM e admin" e depois em "Contas de serviço".
    - Clique em "Criar conta de serviço" e preencha as informações necessárias.
    - Em "Papéis", selecione ou adicione as permissões necessárias para a conta de serviço. Por exemplo, você pode atribuir a permissão "Cloud Speech-to-Text > Acessar como usuário" para permitir o acesso à API de reconhecimento de fala.
    - Clique em "Criar chave" e escolha o formato do arquivo de chave como JSON. Isso baixará um arquivo JSON que contém as credenciais de autenticação.
    - Mova o arquivo JSON de chave para a raiz do seu projeto e renomeie para `data-auth.json`
    #

2. Confirmando se a API está ativa (Recomendado seguir estes passos após o item anterior)
    - Acesse a página da API Cloud Speech-to-Text na Console do Google Cloud: https://console.cloud.google.com/apis/library/speech.googleapis.com
    - Verifique se você está no projeto criado no passo anterior
    - Se a API Speech-to-Text estiver desativada, clique no botão "Ativar
    - Aguarde alguns minutos para que as alterações sejam propagadas nos sistemas do Google.

---

## MP3 to WAV (pt-br)
### *(Audio to Text Transcribe)*

Como instalar o ffmpeg no *Windows:* (para outros SOs, verificar o processo diretamente no site)

1. Acesse o site oficial do ffmpeg em https://ffmpeg.org/download.html.

2. Na seção "Windows", você encontrará links para os builds estáticos do ffmpeg. Esses builds já contêm todos os arquivos necessários para o funcionamento do ffmpeg no Windows.

3. Escolha o link correspondente à arquitetura do seu sistema operacional (32 ou 64 bits) e clique nele para baixar o arquivo ZIP.

4. Após o download, extraia o conteúdo do arquivo ZIP para uma pasta no seu sistema. Recomenda-se escolher uma pasta de fácil acesso, como C:\ffmpeg.

5. Agora, você precisa adicionar a pasta ffmpeg ao PATH do sistema para que o Windows possa localizar o executável do ffmpeg. Siga estas etapas:

    - Abra o Painel de Controle do Windows.
    - Clique em "Sistema e Segurança" (ou "Sistema" em versões mais antigas do Windows).
    - Clique em "Configurações avançadas do sistema".
    - Na janela de Propriedades do Sistema, clique no botão "Variáveis de Ambiente".
    - Na seção "Variáveis do Sistema", selecione a variável `"Path"` e clique em "Editar".
    - Na janela "Editar Variável de Ambiente", clique em "Novo" e adicione o caminho completo para a pasta ffmpeg que você extraiu. Por exemplo, `C:\ffmpeg\bin`.
    - Clique em "OK" em todas as janelas para salvar as alterações.

6. Agora, você pode abrir um novo terminal ou prompt de comando e digitar ffmpeg. Se a instalação foi bem-sucedida, você verá a versão do ffmpeg e a lista de opções disponíveis.

Com o ffmpeg devidamente instalado e configurado no seu sistema, você pode usar `"ffmpeg"` no terminar para confirmar se está funcionando

---

## TTS Text-to-Speech (pt-br)
### *(Text to Audio Converter)*

1. Cadastre-se em https://beta.elevenlabs.io/
2. Clique em sua foto > Profile
3. Copie a chave em "API Key"

    <img src="/igm/elevenlabs.jpg" alt="Tela de loading">

---

## GPT
To use "GPT", create a .nomic folder in the root of the project and download these two files into it:

*Torrent is faster to download

> https://github.com/nomic-ai/gpt4all/blob/main/chat/gpt4all-lora-quantized-win64.exe?raw=true

> https://the-eye.eu/public/AI/models/nomic-ai/gpt4all


