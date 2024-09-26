module.exports = {
    preset: 'ts-jest', // Usar ts-jest como pré-processador
    testEnvironment: 'node', // O ambiente de teste será o Node.js
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensões de arquivos suportadas
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Localização dos testes
  };