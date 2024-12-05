const Parse = require("parse/node");

// Configurar o Parse SDK
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com";

/**
 * Funções utilitárias para geração de dados.
 * Personalize conforme necessário.
 */
const dataGenerators = {
  randomName: () => {
    const names = [
      "João Silva", "Maria Oliveira", "Pedro Santos", "Ana Costa",
      "Carlos Souza", "Beatriz Almeida", "Lucas Pereira", "Fernanda Martins",
      "Rafael Rocha", "Patrícia Gomes", "Thiago Lima", "Juliana Duarte"
    ];
    return names[Math.floor(Math.random() * names.length)];
  },
  randomEmail: (name) => name.toLowerCase().replace(/\s+/g, ".") + "@example.com",
  randomPhone: () => `119${Math.floor(10000000 + Math.random() * 90000000)}`,
  randomAddress: (index) => `Rua ${index}, Bairro ${index}, Cidade - Estado`,
  randomNumber: (min, max, decimals = 0) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals)),
  randomDate : () => {
    const start = new Date(2024, 11, 1).getTime(); // Dezembro 2024
    const end = new Date(2024, 11, 31).getTime();
    const randomTimestamp = Math.floor(Math.random() * (end - start) + start);
    const randomDate = new Date(randomTimestamp);
  
    // Formatar a data para o formato "YYYY-MM-DD"
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  },
  randomStatus: () => {
    const statuses = ["Cancelado", "Finalizado", "Em Andamento"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  },
  randomPaymentType: () => {
    const types = ["Boleto", "Cartao"];
    return types[Math.floor(Math.random() * types.length)];
  },
};

/**
 * Configuração de tabelas e colunas.
 * Personalize esta configuração para adicionar mais tabelas e colunas.
 */
const tableConfigs = [
  {
    tableName: "Cliente",
    rowCount: 60,
    columns: {
      id_cliente: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      nome: { generator: "randomName" },
      email: { generator: "randomEmail", dependsOn: "nome" },
      telefone: { generator: "randomPhone" },
      endereco: { generator: "randomAddress", dependsOnIndex: true },
    },
  },
  {
    tableName: "Produto",
    rowCount: 60,
    columns: {
      id_produto: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      nome: { generator: "randomName" },
      descricao: { generator: "randomName" },
      preco: { generator: "randomNumber", min: 100, max: 5000, decimals: 2 },
      quantidade_estoque: { generator: "randomNumber", min: 1, max: 100, decimals: 0 },
    },
  },
  {
    tableName: "Pedido",
    rowCount: 60,
    columns: {
      id_pedido: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      data: { generator: "randomDate" },
      status: { generator: "randomStatus" },
      id_cliente: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
    },
  },
  {
    tableName: "Pagamento",
    rowCount: 60,
    columns: {
      id_pagamento: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      tipo: { generator: "randomPaymentType" },
      data_pagamento: { generator: "randomDate" },
      valor: { generator: "randomNumber", min: 100, max: 5000, decimals: 2 },
      id_pedido: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
    },
  },
  {
    tableName: "ItensPedido",
    rowCount: 60,
    columns: {
      id_itens: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      id_pedido: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      id_produto: { generator: "randomNumber", min: 1, max: 60, decimals: 0 },
      quantidade: { generator: "randomNumber", min: 1, max: 10, decimals: 0 },
    },
  },
];

/**
 * Função para gerar dados para uma tabela específica.
 */
async function generateDataForTable(tableConfig) {
  console.log(`📦 Iniciando a importação para a tabela: ${tableConfig.tableName}`);

  const { tableName, rowCount, columns } = tableConfig;

  for (let i = 0; i < rowCount; i++) {
    const Table = Parse.Object.extend(tableName);
    const row = new Table();

    for (const [columnName, columnConfig] of Object.entries(columns)) {
      const { generator, dependsOn, dependsOnIndex, ...options } = columnConfig;

      if (dependsOn) {
        const value = row.get(dependsOn);
        const generatedValue = dataGenerators[generator](value);
        row.set(columnName, generatedValue);
      } else if (dependsOnIndex) {
        const generatedValue = dataGenerators[generator](i);
        row.set(columnName, generatedValue);
      } else {
        const generatedValue = dataGenerators[generator](
          options.min,
          options.max,
          options.decimals
        );
        row.set(columnName, generatedValue);
      }
    }

    await row.save();
    console.log(`✅ Registro ${i + 1}/${rowCount} salvo na tabela ${tableName}`);
  }

  console.log(`🚀 Importação concluída para a tabela: ${tableName}\n`);
}

/**
 * Função principal para importar dados para todas as tabelas.
 */
async function seedDatabase() {
  try {
    console.log("\n==== Início da Importação de Dados ====\n");
    for (const tableConfig of tableConfigs) {
      await generateDataForTable(tableConfig);
    }
    console.log("\n==== Importação Concluída com Sucesso ====");
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
}

// Executar o script
seedDatabase();
