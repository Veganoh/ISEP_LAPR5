:-consult(dadosArmazens).
:-consult(dadosCamioes).
:-consult(dadosEntregas).
:-consult(heuristica).
:-consult(calculadoraTempoPercurso).

%------------------------------------------------------------------------------------------%
%         Encontra o Trajeto de custo minimo a partir das entregas de uma dada Data        %
%------------------------------------------------------------------------------------------%
trajeto_cust_min(Data, Trajeto, Custo):-
    (run_melhor_trajeto(Data); true),                                                               % Chama o predicado run_melhor_trajeto/1 para encontrar o melhor trajeto a fazer
    custo_min(Trajeto, Custo).                                                                      % Associa os valores encontrados no run_melhor_trajeto/1 aos parametros Trajeto e Custo


%------------------------------------------------------------------------------------------%
%         Encontra o Trajeto de custo minimo a partir das entregas de uma dada Data        %
%------------------------------------------------------------------------------------------%
run_melhor_trajeto(Data):-
    retractall(custo_min(_, _)),                                                                     % Remove todos os factos da Base de Conhecimentos dinâmica custo_min
    assertz(custo_min(_, 100000)),                                                                   % Coloca no fim da Base de Conhecimentos custo_min um facto com custo 100000 
    obter_lista_entregas(Data, LEntregas),                                                          % Obtém a lista das Entregas a partir de uma dada Data
    obter_lista_armazens(LEntregas, LArmazens),                                                     % Obtém a lista de Armazens associada à lista das Entregas
    permutation(LArmazens, LAPermutacao),                                                           % Faz uma permutação da lista de Armazens
    colocar_matosinhos(LAPermutacao, Trajeto),                                                      % Coloca o Armazem Principal no ínicio e no fim da Permutação
    calcular_custo(LEntregas, Trajeto, Custo),                                                      % Calcula o custo do Trajeto (Permutação + Armazem Principal) atual
    atualiza(Trajeto, Custo),                                                                        % Atualiza a Base de Conhecimentos
    fail.                                                                                           % Fail para encontrar todas as soluções (essencialmente é um loop)

%------------------------------------------------------------------------------------------%
%         Encontra o Trajeto de custo minimo a partir das entregas de uma dada Data        %
%------------------------------------------------------------------------------------------%
atualiza(Trajeto, Custo):-
  custo_min(_, CustoMin),                                                                           % Associa a CustoMin o menor Custo que se encontra na Base de Conhecimentos
  ((Custo < CustoMin,                                                                               % Verifica se o Custo é menor que o CustoMin
        !, retract(custo_min(_, _)),                                                                 % Se for menor retira o primeiro facto da Base de Conhecimentos (o Trajeto de menor Custo atual)
        assertz(custo_min(Trajeto, Custo))                                                          % Coloca no fim da Base de Conhecimentos o Trajeto dado com o Custo associado
        /*,writeln(Custo),writeln(Trajeto),nl*/                                                     % Debug 
    ); true).                                                                                       % Caso não seja menor simplesmente retorna true