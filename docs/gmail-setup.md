# Configurar Gmail para n8n

Siga estes passos para configurar uma conta Gmail de modo a utilizá-la em workflows do n8n:

## 1. Preparar a conta Google
1. Utilize uma conta Google com acesso à caixa de correio desejada.
2. Aceda a [https://console.cloud.google.com](https://console.cloud.google.com) e selecione ou crie um projeto Google Cloud.

## 2. Ativar a API Gmail
1. Dentro do projeto, abra **APIs & Services → Library**.
2. Procure por **Gmail API** e clique em **Enable** para ativá-la.

## 3. Criar credenciais OAuth
1. Vá a **APIs & Services → Credentials** e clique em **Create Credentials → OAuth client ID**.
2. Se for solicitado, configure previamente a **OAuth consent screen** com o tipo de utilizador adequado (interno ou externo), preenchendo o nome da aplicação e contactos.
3. Escolha o tipo de aplicação **Desktop app** ou **Web application** conforme o ambiente n8n (self-hosted normalmente usa Desktop app).
4. Para **Web application**, adicione o URL de redirecionamento do n8n (`https://<domínio-do-n8n>/rest/oauth2-credential/callback` ou similar).
5. Guarde o **Client ID** e o **Client Secret** gerados.

## 4. Configurar credenciais no n8n
1. Entre na interface do n8n com uma conta administradora.
2. Abra **Credentials → New → Gmail OAuth2 API**.
3. Insira o `Client ID` e o `Client Secret` obtidos anteriormente.
4. Configure o campo **Scopes** com `https://mail.google.com/` para acesso completo ou um subconjunto adequado às operações desejadas.
5. Clique em **Connect OAuth2 Account** e complete o fluxo de autorização Google, autenticando com a conta Gmail.

## 5. Verificar permissões e limites
- Confirme que o utilizador autorizado possui acesso às etiquetas/caixas pretendidas.
- Revise as quotas da Gmail API no Google Cloud Console para evitar interrupções.

## 6. Utilizar a credencial nos nós do n8n
- Ao adicionar um nó **Gmail** num workflow, selecione a credencial criada.
- Teste a ligação enviando ou lendo uma mensagem de teste.

## 7. Segurança e manutenção
- Restrinja o acesso ao projeto Google Cloud e ao n8n a utilizadores de confiança.
- Renove/roteie o `Client Secret` se suspeitar de comprometimento.
- Remova credenciais antigas no n8n quando deixarem de ser necessárias.

