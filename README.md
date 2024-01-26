<h1 align="center">Ler dados de uma planilha e adiciona-los</h1>
</br>

## Visão Geral
<p>
A aplicação deve ser capaz de ler  uma planilha do google sheets, buscar as informações necessárias, calcular e escrever o  resultado na planilha. 
<p/>

### Tecnologias usada:
[Node.js]([https://nodejs.org/docs/latest/api/])<br/>
[API Google Sheets]([https://developers.google.com/sheets/api/guides/concepts?hl=pt-br])<br/>


## Estrutura do Projeto
<p>
O projeto está dividido em vários scripts para melhor organização e modularidade.
<p/>
<br/>
   
[test.js](https://github.com/ElDanveloper/Dados-media-planilha/blob/main/scripts/test.js): Onde ocorre todo processamento de dados, desde autenticação, até a leitura de dados, e transcrição.

## Instruções de Execução

Pré-requisitos

Node.js e npm instalados.
Um projeto do Google Cloud.
Uma Conta do Google

- Configure o ambiente
- Ative a API
- Configure a tela de permissão OAuth

1 - No console do Google Cloud, acesse Menu menu > APIs e serviços > Credenciais.
2 - Clique em Criar credenciais > ID do cliente OAuth.
3 - Clique em Tipo de aplicativo > App para computador.
4 - No campo Nome, digite um nome para a credencial. Ele só aparece no console do Google Cloud.
5 - Clique em Criar. A tela cliente OAuth criado é exibida, mostrando seu novo ID e chave secreta do cliente.
6 - Clique em OK. A credencial recém-criada aparece em IDs do cliente OAuth 2.0.
7 - Salve o arquivo JSON salvo como credentials.json e mova-o para o diretório de trabalho.

Requisitos:
Node.js
Npm 

1. Instale as dependências necessárias usando:
    ```shell
    npm install -g npm
2. Instale as dependências necessárias usando:
   ```shell
   npm install googleapis@105 @google-cloud/local-auth@2.1.0 --save

Execute a amostra
No diretório de trabalho, execute o comando:

node .

Quando você executar o exemplo pela primeira vez, ele vai solicitar que você autorize o acesso:

Se você ainda não tiver feito login na sua Conta do Google, faça login quando solicitado. Se você tiver feito login em várias contas, selecione uma para usar na autorização.
- Clique em Aceitar.
- O aplicativo Nodejs executa e chama a API Google Sheets.
- As informações de autorização são armazenadas no sistema de arquivos. Portanto, na próxima vez que você executar o código de amostra, a autorização não será solicitada.
- Pois será criado o arquivo - token.json



### Referência:
   [API Google Sheets](https://developers.google.com/sheets/api/quickstart/nodejs?hl=pt-br)
<br/>

## Contribuições
<p>
Contribuições são bem-vindas! Se quiser melhorar o projeto, adicionar novas funcionalidades ou corrigir problemas, fique à vontade.
</p>
<hr>
</br>

<div align="center">
<a href="https://www.linkedin.com/in/daniel-oliveira-38105b222/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="border-radius: 30px" target="_blank" /></a>
</div>
