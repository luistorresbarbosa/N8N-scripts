# Configurar Firebase para n8n

Estas instruções ajudam a ligar um projeto Firebase ao n8n, permitindo usar serviços como Firestore, Authentication ou Cloud Messaging.

## 1. Criar ou selecionar um projeto Firebase
1. Aceda a [https://console.firebase.google.com](https://console.firebase.google.com).
2. Clique em **Adicionar projeto** ou selecione um projeto existente ligado ao mesmo Google Cloud onde pretende gerir recursos.
3. Defina um nome de projeto e, se necessário, associe uma conta Google Analytics.

## 2. Configurar APIs necessárias
1. Abra o **Google Cloud Console** ligado ao projeto Firebase.
2. Em **APIs & Services → Library**, ative as APIs correspondentes aos serviços que pretende usar (por exemplo, **Cloud Firestore API**, **Identity Toolkit API**, **Cloud Messaging API**).

## 3. Criar uma conta de serviço
1. No Google Cloud Console, vá a **IAM & Admin → Service Accounts**.
2. Crie uma nova conta de serviço com nome descritivo, por exemplo `n8n-firebase`.
3. Atribua as funções mínimas necessárias (por exemplo, *Firebase Admin*, *Cloud Datastore User*, etc., conforme os nós que irá utilizar).
4. Clique em **Create key** e selecione o formato **JSON** para descarregar a chave privada. Guarde este ficheiro em local seguro.

## 4. Guardar credenciais no n8n
1. No n8n, abra **Credentials → New → Firebase Admin SDK** (ou o tipo correspondente ao nó pretendido, como *Firestore*).
2. Carregue o ficheiro JSON da conta de serviço ou copie e cole o conteúdo nos campos fornecidos.
3. Se for necessário, configure também parâmetros adicionais como `databaseURL` ou `projectId` de acordo com o serviço.

## 5. Configurar variáveis de ambiente (opcional)
- Em instalações self-hosted, pode guardar a chave JSON como variável de ambiente (`FIREBASE_SERVICE_ACCOUNT=`) ou montar o ficheiro num volume seguro.
- Atualize o ficheiro `.n8n/config` ou a configuração do container Docker para referenciar a credencial.

## 6. Testar a ligação
1. Crie um workflow com um nó Firebase/Firestore.
2. Seleciona a credencial configurada e execute um teste simples (por exemplo, listar documentos ou enviar uma mensagem).
3. Verifique os logs do n8n para confirmar a autenticação.

## 7. Boas práticas de segurança
- Restrinja permissões da conta de serviço apenas ao necessário.
- Rode as chaves periodicamente e revogue chaves antigas em **Service Accounts → Keys**.
- Controle o acesso ao ficheiro JSON e às credenciais do n8n.

