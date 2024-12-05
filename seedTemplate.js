const Parse = require("parse/node");

// Configurar o Parse SDK
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com";

/**
 * Geradores de dados aleatórios.
 * Você pode adicionar mais funções personalizadas conforme necessário.
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
    const start = new Date(2024, 11, 1).getTime(); 
    const end = new Date(2024, 11, 31).getTime();
    const randomTimestamp = Math.floor(Math.random() * (end - start) + start);
    const randomDate = new Date(randomTimestamp);
  
    // Formatar a data para o formato "YYYY-MM-DD"
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  },
};

/**
 * Configuração de tabelas e campos.
 * Siga este exemplo para adicionar mais tabelas:
 * - tableName: Nome da tabela no Back4App.
 * - rowCount: Quantidade de registros a serem criados.
 * - columns: Cada coluna pode usar um gerador ou um valor fixo.
 */
const tableConfigs = [
  {
    tableName: "Cliente",
    rowCount: 5, // Quantidade de registros para fins de exemplo
    columns: {
      nome: { generator: "randomName" },
      email: { generator: "randomEmail", dependsOn: "nome" },
      telefone: { generator: "randomPhone" },
      endereco: { generator: "randomAddress", dependsOnIndex: true },
    },
    description: "Armazena informações de clientes: nome, email, telefone e endereço.",
  },
  {
    tableName: "Produto",
    rowCount: 3,
    columns: {
      nome: { generator: "randomName" },
      preco: { generator: "randomNumber", min: 50, max: 5000, decimals: 2 },
      quantidade_estoque: { generator: "randomNumber", min: 1, max: 100, decimals: 0 },
    },
    description: "Registra produtos disponíveis no estoque com preço e quantidade.",
  },
];

/**
 * Gera os dados para uma tabela específica.
 * @param {Object} tableConfig - Configuração da tabela.
 */
async function generateDataForTable(tableConfig) {
  console.log(`📦 Iniciando importação para a tabela: ${tableConfig.tableName}`);
  console.log(`ℹ️  Descrição: ${tableConfig.description}`);
  console.log("🔄 Gerando registros...\n");

  const { tableName, rowCount, columns } = tableConfig;

  for (let i = 0; i < rowCount; i++) {
    const Table = Parse.Object.extend(tableName);
    const row = new Table();

    for (const [columnName, columnConfig] of Object.entries(columns)) {
      const { generator, dependsOn, dependsOnIndex, ...options } = columnConfig;

      if (dependsOn) {
        // Gera dados baseados em outra coluna
        const value = row.get(dependsOn);
        const generatedValue = dataGenerators[generator](value);
        row.set(columnName, generatedValue);
        console.log(`  ➡️  ${columnName}: ${generatedValue} (baseado em ${dependsOn})`);
      } else if (dependsOnIndex) {
        // Gera dados baseados no índice atual
        const generatedValue = dataGenerators[generator](i);
        row.set(columnName, generatedValue);
        console.log(`  ➡️  ${columnName}: ${generatedValue} (baseado no índice)`);
      } else {
        // Gera dados diretamente
        const generatedValue = dataGenerators[generator](
          options.min,
          options.max,
          options.decimals
        );
        row.set(columnName, generatedValue);
        console.log(`  ➡️  ${columnName}: ${generatedValue}`);
      }
    }

    await row.save();
    console.log(`✅ Registro ${i + 1}/${rowCount} salvo com sucesso na tabela ${tableName}.\n`);
  }

  console.log(`🚀 Importação concluída para a tabela: ${tableName}\n`);
}

/**
 * Função principal para processar todas as tabelas configuradas.
 */
async function seedDatabase() {
  try {
    console.log("\n==== Início da Importação de Dados ====\n");

    for (const tableConfig of tableConfigs) {
      await generateDataForTable(tableConfig);
    }

    console.log("\n==== Importação de Dados Concluída com Sucesso! ====");
  } catch (error) {
    console.error("\n❌ Erro durante a importação:", error);
  }
}

// Executar o script
seedDatabase();
