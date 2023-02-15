:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic pop_melhor/1.
:-dynamic pop_pior/1.
:-dynamic tempo_exec/1.
:-dynamic custo_esp/1.

:-consult(dadosArmazens).
:-consult(dadosCamioes).
:-consult(dadosEntregas).
:-consult(heuristica).
:-consult(calculadoraTempoPercurso).

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			
    retractall(geracoes(_)), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Numero de elementos ideias a passar para a proxima geracao: '),read(MP),
	retractall(pop_melhor(_)), asserta(pop_melhor(MP)),
    write('Numero de elementos nao ideias a passar para a proxima geracao: '),read(PP),
	retractall(pop_pior(_)), asserta(pop_pior(PP)),
	write('Tempo maximo tempo de execucao de algoritmo(s): '),read(T),
	retractall(tempo_exec(_)), asserta(tempo_exec(T)).


gera(Data, LFinal):-
	inicializa,
    obter_lista_entregas(Data, LEntregas),
	gera_populacao(LEntregas, Data, Pop),
	avalia_populacao(LEntregas, Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
    set_menor_valor(PopOrd),
    geracoes(NG),
	get_time(T),
	gera_geracao(LEntregas, 0,NG,PopOrd, T, LResultado),
    colocar_matosinhos(LResultado, LFinal).

%calcula numero camioes
numero_camioes(Camiao,Data,NC):- obter_lista_entregas(Data, LEntregas),
						carateristicasCam(Camiao,_,T,_,_,_),
						obter_peso_entregas(LEntregas,PE),
						NC1 is PE/T,
						NC is ceiling(NC1).

%Orderna pesos ordem decrescente
peso_entregas1(Data,[X|LEntrega], Peso, X):-length(LEntrega,0), entrega(X,Data,Peso,_,_,_).
peso_entregas1(Data,[X|LEntrega], Peso, IdMaior):-peso_entregas1(Data, LEntrega, Peso1, X1), entrega(X,Data,Peso2,_,_,_),(Peso2 > Peso1, Peso = Peso2, IdMaior = X;Peso is Peso1, IdMaior = X1),!.
peso_entregas(Data,LEntrega, IdMaior):-peso_entregas1(Data, LEntrega, _, IdMaior).

orderna_peso(_, LEntrega, []):-length(LEntrega,0),!.
orderna_peso(Data, LEntrega, [M|LH]):-peso_entregas(Data, LEntrega, M), delete(LEntrega, M, LEntregaR), orderna_peso(Data, LEntregaR, LH).

obtem_lista_decrescente(Data,LEntregas2):- obter_lista_entregas(Data,LEntregas),
							orderna_peso(Data,LEntregas,LEntregas2).


%cria uma lista de listas onde cada lista representa 1 camiao (cada lista contem as entregas atribuidas ao camiao)
predicadoUmCamiaoD(Camiao,[E|LEntregas],Peso,[], [E|LEntregas]):-
						entrega(E, _, P, _, _, _),
						Peso1 is Peso + P,
						carateristicasCam(Camiao,_,T,_,_,_), Peso1 > T,!.

predicadoUmCamiaoD(Camiao,[E|LEntregas],Peso,[E|LFinal], Resto):-
									entrega(E, _, P, _, _, _),
									Peso1 is Peso + P,
									predicadoUmCamiaoE(Camiao,LEntregas,Peso1,LFinal, Resto).

predicadoUmCamiaoE(Camiao,LEntregas,Peso,[], LEntregas):-
						last(LEntregas, E),
						entrega(E, _, P, _, _, _),
						Peso1 is Peso + P,
						carateristicasCam(Camiao,_,T,_,_,_), Peso1 > T,!.

predicadoUmCamiaoE(Camiao,LEntregas,Peso,[E|LFinal], Resto):-
									last(LEntregas, E),
									delete(LEntregas, E, L),
									entrega(E, _, P, _, _, _),
									Peso1 is Peso + P,
									predicadoUmCamiaoD(Camiao,L,Peso1,LFinal, Resto).


predicadoVariosCamioes(_, LEntregas,1,[LEntregas]):-checkTamanho(LEntregas),!.

predicadoVariosCamioes(Camiao, LEntregas, NCamioes, [C|L]):- 
							predicadoUmCamiaoE(Camiao,LEntregas,0,C, Resto),
							RCamioes is NCamioes - 1, 
							checkTamanho(C),
							predicadoVariosCamioes(Camiao,Resto,RCamioes,L).

checkTamanho(C):- length(C, El), factorial(El, F), populacao(DP), F < DP,
	(retract(populacao(_));true), asserta(populacao(F)), PF is F/2,
	retractall(pop_melhor(_)), asserta(pop_melhor(PF)),
	retractall(pop_pior(_)), asserta(pop_pior(PF)),!; true,!.			


%Usado para o AG dos vários camioes, obtêm uma lista de um camiao e aplica o AG
geraVariosCamioes(Camiao,Data,LFinal):- inicializa,
								obtem_lista_decrescente(Data,LEntregas),
								numero_camioes(Camiao,Data,NCamioes),
								predicadoVariosCamioes(Camiao, LEntregas,NCamioes,Camioes),
								geraCamiao(Data,Camioes,LFinal).

geraCamiao(_,[],[]):-!.
geraCamiao(Data,[Id|Populacao], [L1|LFinal]):-
	geraCamiao(Data,Populacao,LFinal),
	gera_populacao(Id, Data, Pop),
	avalia_populacao(Id, Pop, PopAv),
	ordena_populacao(PopAv,PopOrd),
	set_menor_valor(PopOrd),
	geracoes(NG),
	get_time(T),
	gera_geracao(Id,0,NG,PopOrd,T,LResultado),
	colocar_matosinhos(LResultado, L1).




factorial(0,1).
factorial(N,F) :- N > 0, M is N - 1, factorial(M,T), F is N * T.

%Geracao da poupulacao inicial
gera_populacao(LEntregas, Data, Pop):-
	populacao(TamPop),
    obter_lista_armazens_filtrada(LEntregas, LA),
    length(LA,NumE),
	TamPop > 3 , ! ,  												%Caso da populacao ser maior que 3 individuos (Populacao usando a solucoes das 3 heuristicas + individuos aleatorios)
	heuristica_distancia(LA, LADistancia), 
    heuristica_peso(Data, LA, LAPeso),
    heuristica_peso_tempo(Data, LA, LAPesoTempo),
    PopHeuristica = [LADistancia, LAPeso, LAPesoTempo],
	TamPop1 is TamPop-3,
	gera_populacao_al(TamPop1,LA,NumE,PopHeuristica,PopAl),
	append(PopHeuristica,PopAl,Pop).

gera_populacao(LEntregas,Data, Pop):-
	populacao(TamPop),
	obter_lista_armazens_filtrada(LEntregas, LA),
	TamPop == 3 , ! ,  												%Caso da populacao ser igual 3 individuos (Populacao das solucoes das 3 heuristicas)
	heuristica_distancia(LA, LADistancia), 
    heuristica_peso(Data, LA, LAPeso),
    heuristica_peso_tempo(Data, LA, LAPesoTempo),
    Pop = [LADistancia, LAPeso, LAPesoTempo].

gera_populacao(LEntregas,Data, Pop):-
	populacao(TamPop),
	obter_lista_armazens_filtrada(LEntregas, LA),
	TamPop == 2 , ! , 											%Caso da populacao ser 2 individuos (Populacao com 2 solucoes de heuristicas - distancia + combinada)
	heuristica_distancia(LA, LADistancia), 
    heuristica_peso_tempo(Data, LA, LAPesoTempo),
    Pop = [LADistancia, LAPesoTempo].


gera_populacao_al(0,_,_,_,[]):-!.


gera_populacao_al(TamPop,LA,NumE,PopHeuristica,[Ind|Resto]):-

	TamPop1 is TamPop-1,
    gera_populacao_al(TamPop1,LA,NumE,PopHeuristica,Resto),
	gera_individuo(LA,NumE,Ind),
	(not(member(Ind,Resto)),
	not(member(Ind,PopHeuristica))),!.

gera_populacao_al(TamPop,LA,NumE,PopHeuristica,Resto):-
    gera_populacao_al(TamPop,LA,NumE,PopHeuristica,Resto),!.
	
	

gera_individuo([G],1,[G]):-!.

gera_individuo(LA,NumE,[G|Resto]):-
	NumTemp is NumE + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,LA,G,NovaLista),
	NumE1 is NumE-1,
	gera_individuo(NovaLista,NumE1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).


avalia_populacao(_, [],[]).
avalia_populacao(LEntregas, [Ind|Resto],[Ind*V|Resto1]):-
    colocar_matosinhos(Ind, Trajeto),
    calcular_custo(LEntregas, Trajeto, V),
	avalia_populacao(LEntregas, Resto,Resto1).

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

gera_geracao(_,_,_,[X*_|_],TI, X):- get_time(TF), T is TF - TI,tempo_exec(TE), TE < T,!.
gera_geracao(_,_,_,[X*V|_],_, X):-custo_esp(MC), V =< MC,!.
gera_geracao(_,G,G,[X*V|_],_, X):-!,write('Geracao '), write(G), write(':'), nl, write(X*V), nl.

gera_geracao(LEntregas,N,G,Pop, T, LResultado):-
	
	%Evitar sequencia de cruzamento entre pares usando random_permutation 
	random_permutation(Pop,PopRandom),
	
	%Cruzamento 
	cruzamento(LEntregas,PopRandom,NPop1,NPopCruzamento),
	
	%Mutacao
	mutacao(LEntregas,NPop1,NPop,NPopMutacao),

	%N individuos da população atual e descendentes obtidos por cruzamento e mutacao
	%NPopCruzamento e NPopMutacao ex. [[Individuo1,Individuo2,Descendente1,Descendente2],etc..]
	append(NPopCruzamento,NPopMutacao,NPopFull),

	%N individuos e descendentes flatten 
	flat(NPopFull,NPopFlat),

	%Remove individuos repetidos ---> Fica T individuos
	%remover_duplicados_individuos(NPopFlat,TPop),

	%Avalicao da populacao T individuos
	avalia_populacao(LEntregas,NPopFlat,NPopAv),
	%Ordenacao (ordem crescente)
	ordena_populacao(NPopAv,NPopOrd),

	%N melhores individuos da população
	
	pop_melhor(MP),
	melhores_individuos(MP,NPopOrd,NPopMelhores),

	%Obter os restantes elementos da lista
	subtract(NPopOrd,NPopMelhores,NPopRestantes),

	%Obter nova lista dos restantes T-P individuos com produto de avaliacao * n. aleatorio
	restantes_individuos(NPopRestantes,NPopAvProduto),
	%Ordenacao da nova lista de individuos
	ordena_populacao(NPopAvProduto,NPopAvProdutoOrd),

	

	%N-P individuos para passar para proxima geracao
	pop_pior(PP),
	piores_individuos(PP,NPopAvProdutoOrd,NPopPiores),

	%Remover o valor do produto para o resultado
	remover_produto(NPopPiores,NPopPioresValores),
	%Avaliacao da populacao 
	avalia_populacao(LEntregas,NPopPioresValores,NPopPioresFinal),
	%Juncao dos N melhores individuos e dos N piores individuos
	append(NPopMelhores,NPopPioresFinal,NPopResultado),
	
	N1 is N+1,
	gera_geracao(LEntregas,N1,G,NPopResultado, T, LResultado).

set_menor_valor([_*V|_]):-
    MC is V * 0.9,
    retractall(custo_esp(_)), asserta(custo_esp(MC)).



cruzamento(_,[],[],[]).
cruzamento(_,[Ind*_],[Ind],[[Ind]]).
cruzamento(LE,[Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1],[[Ind1,Ind2,NInd1,NInd2]|Resto2]):-
	gerar_pontos_cruzamento(LE,P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(LE,Ind1,Ind2,P1,P2,NInd1),
	  cruzar(LE,Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(LE,Resto,Resto1,Resto2).
preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(LE,L,K,L1):-
	length(LE,N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere(_,[],L,_,L):-!.
insere(LE,[X|R],L,N,L2):-
	length(LE,T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(LE,R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(LE,Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	length(LE,NumT),
	R is NumT-P2,
	rotate_right(LE,Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(LE,Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).


gerar_pontos_cruzamento(LE,P1,P2):-
	gerar_pontos_cruzamento1(LE,P1,P2).

gerar_pontos_cruzamento1(LE,P1,P2):-
	length(LE,N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(LE,P1,P2):-
	gerar_pontos_cruzamento1(LE,P1,P2).




%Mutacao de individuos
mutacao(_,[],[],[]).
mutacao(LE,[Ind|Rest],[NInd|Rest1],[[Ind,NInd]|Resto2]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(LE,Ind,NInd));NInd = Ind),
	mutacao(LE,Rest,Rest1,Resto2).

mutacao1(LE,Ind,NInd):-
	gerar_pontos_cruzamento(LE,P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).





%metodo n melhores individuos da populacao
%Falta verificar percentagem de N 
melhores_individuos(0,_,[]):-!.
melhores_individuos(NumInd,[X|NPopOrd],[X|PopInd]):-  
	NumInd1 is NumInd - 1,
	melhores_individuos(NumInd1,NPopOrd,PopInd).

%T-P individuos restantes com produto da avaliacao com n. aleatorio 
restantes_individuos([],[]):-!.
restantes_individuos([X*V|NPop],[X*NewAv|NPopRestantes]):-
	random(0.0,1.0,Random),
	NewAv is V*Random,
	restantes_individuos(NPop,NPopRestantes).

%Retirar n. piores individuos a passar para proxima geracao
piores_individuos(0,_,[]):-!.
piores_individuos(NumInd,[X|NPopOrd],[X|PopInd]):-  
	NumInd1 is NumInd - 1,
	piores_individuos(NumInd1,NPopOrd,PopInd).

%Remover o valor do produto do n. aleatorio * custo (da avaliacao)
remover_produto([],[]):-!.
remover_produto([X*_|PopRestante],[X|NewRestante]):-
	remover_produto(PopRestante,NewRestante).


%Flat lista dos progenitores com descedentes 
flat([], []).
flat([A|B],L) :- is_list(A), flat(B,B1), !, append(A,B1,L).
flat([A|B],[A|B1]) :- flat(B,B1).

%Remover indivíduos duplicados

remover_duplicados_individuos([], []).
remover_duplicados_individuos([X|T],List):- member(X,T),!,remover_duplicados_individuos(T,List).
remover_duplicados_individuos([X|T],[X|List]):- not(member(X,T)),!, remover_duplicados_individuos(T,List).