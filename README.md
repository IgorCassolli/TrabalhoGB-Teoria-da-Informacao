## Trabalho GB - Teoria da Informação: Compressão e Criptografia - Unisinos 02/2024

### Enunciado do trabalho:

O trabalho consiste na implementação dos algoritmos de detecção e correção de
erro. O objetivo é criar uma interface para codificação e decodificação, onde o usuário possa
inserir um ou mais símbolos ou codewords (binários), escolher o método de codificação ou
decodificação desejado e visualizar o resultado na tela.
Requisitos Funcionais
1. Entrada de Símbolos:
O sistema deve permitir ao usuário inserir um ou mais símbolos (em formato textual
ou numérico) para serem codificados.
2. Seleção do Método de Codificação: O sistema deve oferecer ao usuário a opção de escolher entre os seguintes métodos
de tratamento de erro:
• Código de repetição Ri
• Hamming (7,4)
3. Codificação: O sistema deve ser capaz de codificar os símbolos inseridos com base no método
selecionado pelo usuário.
4. Exibição do Resultado: O sistema deve exibir o código resultante na tela após a codificação.
5. Validação de Entrada: O sistema deve validar a entrada do usuário, garantindo que ela seja compatível
com os métodos de codificação implementados.
6. Decodificação: O sistema deve ser capaz de decodificar os codeword (binários) inseridos com base
no método selecionado pelo usuário.

## Passos para executar o projeto

### Clonar repositório

```commandline
git clone https://github.com/IgorCassolli/TrabalhoGB-Teoria-da-Informacao
```

### Acesse a pasta frontend, instale as bibliotecas e execute

```commandline
cd frontend
npm i
npm run dev
```

### Acesse a pasta backend, instale as bibliotecas e execute

```commandline
cd backend
composer install
php artisan serve
```

