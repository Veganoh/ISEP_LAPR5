:-consult(dadosArmazens).
:-consult(dadosCamioes).
:-consult(dadosEntregas).
:-consult(calculadoraTempoPercurso).

%--------------------------------%
% Calculo heuristico de trajetos %
%--------------------------------%


% Usado para garantir  que não existem armazens duplicados nas entregas
remover_duplicados([], []).
remover_duplicados([Id | LArmazens], LA) :- member(Id, LArmazens), !, remover_duplicados(LArmazens, LA).
remover_duplicados([Id | LArmazens], [Id | LA]) :- remover_duplicados(LArmazens, LA).


% Obter uma lista de armazens a partir de uma lista de id de entregas
obter_lista_armazens([], []).
obter_lista_armazens([IdEntrega|TE], [IdArmazem|TA]):- entrega(IdEntrega, _, _, IdArmazem, _, _), obter_lista_armazens(TE, TA).


% Obter uma lista de Entregas a partir da Data
obter_lista_entregas(Data, LE):- findall(IdEntrega, entrega(IdEntrega, Data, _, _, _, _), LE).

%Calculo peso total das entregas selecionadas
obter_peso_entregas([],0):- !.
obter_peso_entregas([IdEntrega|LE], PE):- entrega(IdEntrega, _, P, _, _, _),
                                        obter_peso_entregas(LE,PE1),
                                        PE is PE1 + P.

%Obtem lista entregas e calcula o peso
obter_peso_lista_entregas(Data, PE):- obter_lista_entregas(Data, LE),
                                        obter_peso_entregas(LE,PE).

% Filtra a lista de armazens para garantir que matosinhos não faz parte
filtrar_lista(LA, LArmazens):-remover_duplicados(LA, LIntermedio), idArmazem('Matosinhos', IdArmazem), delete(LIntermedio,IdArmazem, LArmazens).


% Filtra a lista de armazens para garantir que matosinhos não faz parte e que não existem armazens repetidos
obter_lista_armazens_filtrada(LEntregas, LArmazens):-obter_lista_armazens(LEntregas, LA),filtrar_lista(LA, LArmazens).


% Colocar o armazem de matosinhos no inicio e fim da lista
colocar_matosinhos(L, [IdArmazem|LResultado]):- idArmazem('Matosinhos', IdArmazem), append(L, [IdArmazem], LResultado),!.


%--------------------------------------------------%
% Calculo heuristico de trajetos com base no tempo %
%--------------------------------------------------%

% Determina que armazem se encontra mais perto temporalmente do anterior
menor_distancia_tempo_2(IdAnteriror, [X|LA], Tempo, X):-length(LA,0), dadosCam_t_e_ta(_,IdAnteriror,X,Tempo,_,_).
menor_distancia_tempo_2(IdAnteriror, [X|LA], Tempo, IdMenor):-menor_distancia_tempo_2(IdAnteriror, LA, T1, X1), dadosCam_t_e_ta(_,IdAnteriror,X,T2,_,_),(T2 < T1, Tempo is T2, IdMenor = X;Tempo is T1, IdMenor = X1),!.
menor_distancia_tempo_1(IdAnteriror, LA, IdMenor):-menor_distancia_tempo_2(IdAnteriror, LA, _, IdMenor).

% Cria uma lista dos armazens mais proximos do inicial(Matosinhos)
heuristica_distancia([], [], _):-!. 
heuristica_distancia([M|LA], [M], _):-length(LA,0),!. 
heuristica_distancia(LA, [M|LH], A):-menor_distancia_tempo_1(A, LA, M), delete(LA, M, LAR),  heuristica_distancia(LAR, LH, M).
heuristica_distancia(LA, [M|LH]):-idArmazem('Matosinhos', IdArmazem), menor_distancia_tempo_1(IdArmazem, LA, M), delete(LA, M, LAR), heuristica_distancia(LAR, LH, M).


%------------------------------------------------------------%
% Calculo heuristico de trajetos com base no Peso da entrega %
%------------------------------------------------------------%

% Determina que Entrega é a mais pesada
maior_peso_2(Data,[X|LA], Peso, X):-length(LA,0), entrega(_,Data,Peso,X,_,_).
maior_peso_2(Data,[X|LA], Peso, IdMenor):-maior_peso_2(Data, LA, Peso1, X1), entrega(_,Data,Peso2,X,_,_),(Peso2 > Peso1, Peso = Peso2, IdMenor = X;Peso is Peso1, IdMenor = X1),!.
maior_peso_1(Data,LA, IdMenor):-maior_peso_2(Data, LA, _, IdMenor).


% Cria uma lista de aramzens ordenada pelas entregas mais pesadas para as mais leves
heuristica_peso(_, LA, []):-length(LA,0),!.
heuristica_peso(Data, LA, [M|LH]):-maior_peso_1(Data, LA, M), delete(LA, M, LAR), heuristica_peso(Data, LAR, LH).


%------------------------------------------------------------%
% Calculo heuristico de trajetos com base no Peso da entrega %
%------------------------------------------------------------%

% Calcula a razão entre o Peso de uma entrega e o tempo de entrega. Quanto maior a razao maior a eficiencia da encomend 
razao(Data, Id1, Id2, R):-entrega(_,Data,Peso,Id2,_,_), dadosCam_t_e_ta(_,Id1,Id2,Tempo,_,_), R is Peso/Tempo.

% Calcula a entrega mais eficiente 
maior_peso_tempo(Data, IdAnteriror, [X|LA], R, X):-length(LA,0), razao(Data,IdAnteriror,X,R).
maior_peso_tempo(Data, IdAnteriror, [X|LA], R, Id):-maior_peso_tempo(Data, IdAnteriror, LA, R1, X1), razao(Data,IdAnteriror,X,R2),(R2 < R1, R is R1,Id = X1 ;R is R2, Id = X),!.
maior_peso_tempo(Data, IdAnteriror, LA, Id):-maior_peso_tempo(Data, IdAnteriror, LA, _, Id).

% Cria uma lista de armzens ordenada pela entrega mais eficiente para a a menos eficiente
% A relação do peso do camiao para o tempo de entrega torna esta ordenação mais efetiva pois as encomendas finais (menos eficientes) beneficiam em geral
heuristica_peso_tempo(_, LA, _,[]):-length(LA,0),!.
heuristica_peso_tempo(Data, LA, IdAnterior, [Id|LH]):-maior_peso_tempo(Data, IdAnterior, LA, Id), delete(LA, Id, LAR), heuristica_peso_tempo(Data, LAR, Id, LH).
heuristica_peso_tempo(Data, LA, [Id|LH]):-idArmazem('Matosinhos', IdArmazem), maior_peso_tempo(Data, IdArmazem, LA, Id), delete(LA, Id, LAR), heuristica_peso_tempo(Data, LAR, Id, LH).



% Obter uma lista de todos os trajetos a partir de uma lista de entregas
calc_heuristico_peso_tempo(Data, LLTrajetos, Custo):- 
    obter_lista_entregas(Data, LEntregas),
    obter_lista_armazens_filtrada(LEntregas, LA),
    heuristica_peso_tempo(Data, LA, LAHeuristica),
    colocar_matosinhos(LAHeuristica, LLTrajetos),
    calcular_custo(LEntregas, LLTrajetos, Custo).

calc_heuristico_tempo(Data, LLTrajetos, Custo):- 
    obter_lista_entregas(Data, LEntregas),
    obter_lista_armazens_filtrada(LEntregas, LA),
    heuristica_distancia(LA, LAHeuristica), 
    colocar_matosinhos(LAHeuristica, LLTrajetos),
    calcular_custo(LEntregas, LLTrajetos, Custo).
    

calc_heuristico_peso(Data, LLTrajetos, Custo):- 
    obter_lista_entregas(Data, LEntregas),
    obter_lista_armazens_filtrada(LEntregas, LA),
    heuristica_peso(Data, LA, LAHeuristica),
    colocar_matosinhos(LAHeuristica, LLTrajetos),
    calcular_custo(LEntregas, LLTrajetos, Custo).
