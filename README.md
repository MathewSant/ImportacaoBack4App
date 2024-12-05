<h1>Importação de Dados no Back4App 🚀</h1>

<p>Automatize a importação de dados no Back4App com scripts personalizados em JavaScript. Este projeto facilita a geração e inserção de dados realistas e personalizados, permitindo uma configuração flexível para atender às suas necessidades específicas.</p>

<h2>📚 Índice</h2>
<ul>
  <li><a href="#descrição">Descrição</a></li>
  <li><a href="#estrutura-do-projeto">Estrutura do Projeto</a></li>
  <li><a href="#o-que-o-algoritmo-faz">O que o Algoritmo Faz</a></li>
  <li><a href="#passo-a-passo-para-executar">Passo a Passo para Executar</a></li>
  <li><a href="#como-personalizar-suas-tabelas">Como Personalizar suas Tabelas</a></li>
  <li><a href="#exemplo-no-back4app">Exemplo no Back4App</a></li>
  <li><a href="#ajuda-e-suporte">Ajuda e Suporte</a></li>
  <li><a href="#licença">Licença</a></li>
</ul>

<h2 id="descrição">📝 Descrição</h2>
<p>Este projeto contém dois scripts em JavaScript que automatizam a importação de dados no Back4App. A estrutura foi criada para ajudar na geração e inserção de dados de forma personalizada, com um arquivo completo de exemplo e outro vazio para personalização.</p>

<h2 id="estrutura-do-projeto">📂 Estrutura do Projeto</h2>
<pre>
IMPORTACAOBACK4APP/
├── seedWithExample.js    # Exemplo completo com tabelas pré-configuradas
├── seedTemplate.js       # Modelo vazio para personalização
├── package.json          # Gerencia dependências do projeto
└── node_modules/         # Diretório com dependências instaladas pelo npm
</pre>

<h3>Descrição dos Arquivos</h3>
<ul>
  <li><strong>seedWithExample.js</strong>: Um exemplo completo, já configurado com tabelas como Cliente, Produto, Pedido, entre outras. Ideal para entender como o algoritmo funciona.</li>
  <li><strong>seedTemplate.js</strong>: Um modelo vazio que serve como base para personalizar conforme sua necessidade.</li>
  <li><strong>package.json</strong>: Gerencia dependências do projeto, como <code>parse/node</code>.</li>
  <li><strong>node_modules</strong>: Diretório gerado pelo <code>npm install</code> contendo as dependências instaladas.</li>
</ul>

<h2 id="o-que-o-algoritmo-faz">⚙️ O que o Algoritmo Faz</h2>

<ul>
  <li><strong>Automatiza a importação de dados:</strong>
    <ul>
      <li>Cria registros aleatórios e realistas em tabelas do Back4App.</li>
      <li>Gera campos personalizados com valores baseados em regras de negócio (e.g., nomes, e-mails, datas, números).</li>
    </ul>
  </li>
  <li><strong>Altamente configurável:</strong>
    <ul>
      <li>Adicione ou remova tabelas e colunas.</li>
      <li>Personalize como os dados são gerados, utilizando funções específicas chamadas de "geradores".</li>
    </ul>
  </li>
  <li><strong>Flexível para diferentes necessidades:</strong>
    <ul>
      <li>Use o <code>seedWithExample.js</code> para entender como o script funciona.</li>
      <li>Use o <code>seedTemplate.js</code> para criar do zero, configurando suas próprias tabelas.</li>
    </ul>
  </li>
</ul>

<h2 id="passo-a-passo-para-executar">🛠️ Passo a Passo para Executar</h2>

<h3>1. Clone o Repositório</h3>
<p>Baixe o projeto na sua máquina local:</p>
<pre>
git clone https://github.com/MathewSant/ImportacaoBack4App.git
cd ImportacaoBack4App/
</pre>

<h3>2. Instale as Dependências</h3>
<p>Certifique-se de ter o Node.js instalado. Em seguida, rode:</p>
<pre>
npm install parse
</pre>

<h3>3. Configure suas Credenciais do Back4App</h3>
<p>Abra os arquivos <code>seedWithExample.js</code> e <code>seedTemplate.js</code> e substitua:</p>
<pre>
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com";
</pre>
<ul>
  <li><strong>YOUR_APP_ID</strong>: Substitua pelo ID do seu app no Back4App.</li>
  <li><strong>YOUR_JS_KEY</strong>: Substitua pela chave JavaScript do seu app.</li>
</ul>

<h3>4. Execute um dos Scripts</h3>

<h4>Exemplo Completo</h4>
<p>Para testar o exemplo pronto, execute:</p>
<pre>
node seedWithExample.js
</pre>

<h4>Personalização</h4>
<p>Para personalizar, edite o <code>seedTemplate.js</code> e configure suas tabelas e colunas. Em seguida, execute:</p>
<pre>
node seedTemplate.js
</pre>

<h2 id="como-personalizar-suas-tabelas">🎨 Como Personalizar suas Tabelas</h2>

<h3>Estrutura de Configuração</h3>
<p>Cada tabela é definida no array <code>tableConfigs</code>. Exemplo de configuração:</p>
<pre>
const tableConfigs = [
  {
    tableName: "MinhaTabela",  // Nome da tabela no Back4App
    rowCount: 50,              // Quantidade de registros a serem gerados
    columns: {                 // Configuração das colunas
      nome: { generator: "randomName" },
      email: { generator: "randomEmail", dependsOn: "nome" },
      telefone: { generator: "randomPhone" },
    },
  },
];
</pre>

<h3>Campos Disponíveis para Personalização</h3>
<ul>
  <li><strong>tableName</strong>: Nome da tabela no Back4App.</li>
  <li><strong>rowCount</strong>: Número de registros a serem criados.</li>
  <li><strong>columns</strong>: Cada coluna pode usar um dos geradores disponíveis.
    <ul>
      <li><strong>randomName</strong>: Gera nomes aleatórios.</li>
      <li><strong>randomEmail</strong>: Gera e-mails baseados em outro campo (e.g., <code>nome</code>).</li>
      <li><strong>randomPhone</strong>: Gera números de telefone fictícios.</li>
      <li><strong>randomAddress</strong>: Gera endereços fictícios baseados no índice.</li>
      <li><strong>randomNumber</strong>: Gera números aleatórios dentro de um intervalo.</li>
    </ul>
  </li>
</ul>

<h3>Adicionando Novos Geradores</h3>
<p>Você pode criar novos geradores no objeto <code>dataGenerators</code>. Por exemplo:</p>
<pre>
const dataGenerators = {
  randomStatus: () => {
    const statuses = ["Ativo", "Inativo", "Pendente"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  },
  // Outros geradores...
};
</pre>

<h3>Personalizando o <code>seedTemplate.js</code></h3>

<p>Adicione sua tabela no array <code>tableConfigs</code>:</p>
<pre>
const tableConfigs = [
  {
    tableName: "MinhaTabelaPersonalizada",
    rowCount: 30,
    columns: {
      nome: { generator: "randomName" },
      descricao: { generator: "randomName" },
      preco: { generator: "randomNumber", min: 10, max: 100, decimals: 2 },
    },
  },
];
</pre>

<p>Salve o arquivo e execute:</p>
<pre>
node seedTemplate.js
</pre>

<h2 id="exemplo-no-back4app">📊 Exemplo no Back4App</h2>

<p>Suponha que você queira inserir dados em uma tabela chamada <code>Estudantes</code>:</p>

<h3>Configure no <code>seedTemplate.js</code>:</h3>
<pre>
const tableConfigs = [
  {
    tableName: "Estudantes",
    rowCount: 20,
    columns: {
      nome: { generator: "randomName" },
      matricula: { generator: "randomNumber", min: 1000, max: 9999, decimals: 0 },
      curso: { generator: "randomStatus" },
    },
  },
];
</pre>

<h3>Execute:</h3>
<pre>
node seedTemplate.js
</pre>

<h2 id="ajuda-e-suporte">🆘 Ajuda e Suporte</h2>

<p>Se encontrar problemas ou dúvidas, siga estas orientações:</p>

<ul>
  <li><strong>Confira os logs no terminal:</strong> O script exibirá mensagens detalhadas durante a execução, informando o progresso e possíveis erros.</li>
  <li><strong>Revise suas credenciais do Back4App:</strong> Verifique se o <code>YOUR_APP_ID</code> e <code>YOUR_JS_KEY</code> estão corretos. Eles devem ser substituídos pelas credenciais do seu app no Back4App.</li>
  <li><strong>Verifique as tabelas no Back4App:</strong> Certifique-se de que as tabelas mencionadas já existem no seu banco de dados do Back4App antes de rodar o script. Se necessário, crie as tabelas manualmente ou via API.</li>
  <li><strong>Execute os scripts em ordem:</strong> Primeiramente, utilize o script <code>seedWithExample.js</code> para entender a estrutura e como os dados são gerados. Depois, personalize o <code>seedTemplate.js</code> conforme necessário.</li>
</ul>

<h2 id="licença">📄 Licença</h2>

<p>Este projeto está licenciado sob a <strong>MIT License</strong>. Consulte o arquivo LICENSE para mais detalhes.</p>

<h2>🎉 Com este projeto, você pode:</h2>

<ul>
  <li>Automatizar a importação de dados para o Back4App.</li>
  <li>Personalizar os dados gerados facilmente para atender às suas necessidades específicas.</li>
  <li>Adaptar o modelo para diferentes cenários, criando tabelas e colunas conforme necessário.</li>
</ul>

<p>Boa sorte e boas implementações! 🚀</p>
