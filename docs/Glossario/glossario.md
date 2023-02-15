# Glossário

## **Utilizadores do sistema**

| **_Utilizador_**         | **_Descrição_**                                                             |
| :----------------------- | :-------------------------------------------------------------------------- |
| Administrator de Sistema | Responsável por gerir os utilizadores e autorizações dos mesmos.            |
| Gestor de Armazém        | Responsável por gerir os dados dos armazens.                                |
| Gestor de Frota          | Responsável por gerir os dados dos armazéns e entregas.                     |
| Gestor de Logística      | Responsável por gerir os dados dos percursos e planeamento da distribuição. |

## **Módulos do Sistema**

| **_Módulo_**                | **_Descrição_**                                                                                               |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Gestão de armazéns          | Módulo de back-end responsável pela gestão dos Armazéns e Entregas.                                           |
| Logística                   | Módulo de back-end responsável pela gestão dos Camiões, Percursos e Empacotamentos.                           |
| Planeamento de distribuição | Módulo de back-end responsável pelo planeamento das trajetórias dos camiões para realizarem as suas entregas. |
| SPA                         | Módulo de front-end, Interface do Utilizador.                                                                 |

## **Conceitos gerais do Projeto**

| **_Conceito_**                       | **_Acrónimo_** | **_Descrição_**                                                                                                                                                        |
| :----------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Armazém Principal                    | ---            | Armazém de onde saem todos os lotes de protudos para serem entregues nos diversos armazens. Foi definido que seja o armazem de Matosinhos.                             |
| Autonomia do camião                  | ---            | Autonomia do camião quando este se encontra com a Capacidade de Carga máxima e com a Carga máxima do conjunto de baterias também no máximo. Geralmente expresso em km. |
| Capacidade de Carga                  | ---            | A massa que pode ser transportada no camião. Geralmente expresso em toneladas.                                                                                         |
| Carga máxima do conjunto de baterias | ---            | Energia acumulada nas baterias elétricas do camião. Geralmente expresso em kWh.                                                                                        |
| Centro de Processamento de Dados     | CPD            | Centro de Processamento de Dados da empresa ao qual estão ligados postos em todos os armazéns. Localizado no Armazém Principal.                                        |
| Data da Entrega                      | ---            | Data até quando a Entrega deve ser feita.                                                                                                                              |
| EletricGo                            | ---            | Nome do sistema.                                                                                                                                                       |
| Identificador da Entrega             | ---            | Código que identifica a entrega, por exemplo "220909/1".                                                                                                               |
| Massa da Entrega                     | ---            | Peso dos produtos a entregar. Geralmente expresso em kg.                                                                                                               |
| Plano de Entregas                    | ---            | Lista de entregas a serem realizadas.                                                                                                                                  |
| Tara                                 | ---            | Peso do camião sem carga, isto é, vazio. Geralmente expresso em toneladas.                                                                                             |
| Tempo de carregamento rápido         | ---            | Tempo de carregamento das baterias elétricas, desde o minímo de carga elétrica recomendada, 20%, até ao valor padrão de 80%. Geralmente expresso em horas.             |
| Percurso                             | ---            | Também pode ser chamado de Rota, é o caminho entre dois armazéns definido por um especialista.                                                                         |

## **_Planeamento do Grupo_**

| **_Item_** | **_Conceito acordado pelo grupo_**                                                                                                                                                                                                |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DoR        | Os critérios de aceitação devem estar claros, tendo todas as dúvidas sido tiradas com o cliente e a análise da User Story deve estar feita.                                                                                       |
| DoD        | A User Story deve estar completamente implementada de acordo com os critérios de aceitação e com os testes necessários, tanto unitários, como de integração e de regressão, implementados e também a passar nesses mesmos testes. |

## **_Infrastrutura_**

| **_Conceito_**                               | **_Acrónimo_** | **_Tempo aceitável_** |
| :------------------------------------------- | :------------- | :-------------------- |
| Tempo máximo de disrupção                    | MTPD           | 5 horas               |
| Tempo máximo tolerável de inoperacionalidade | MTD            | 2 horas               |

## **_Portas utilizadas nos API_**

**.NET API (Gestão de Armazéns)**

- HTTP - 5000
- HTTPS - 5001

**Nodejs API (Logística)**

- 3000
