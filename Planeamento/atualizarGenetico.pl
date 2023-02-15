:-consult(genetico).

%------------------------------------------------------------------------------------------%
%         Adiciona os Elementos que não fazem parte da Lista de interseção ao final        %
%           da lista.                                                                      %
%------------------------------------------------------------------------------------------%
completarLista( ListaInter, [], ListaInter ). 
completarLista( ListaInter, [H| T], ListaFinal ):- 
    completarLista( ListaInter, T, ListaResultante ),
    ((\+ member( H, ListaInter ), append( ListaResultante, [H], ListaFinal )); 
    append( [], ListaResultante, ListaFinal )). 


%------------------------------------------------------------------------------------------%
%         Devolve uma lista que contém todos os elementos da ListaNova mais os elementos   %
%           que intersetam com a ListaAntiga. Os Elementos novos são adicionados no fim    %
%           da lista Antiga, sendo que a mesma perserva a sua ordem original.              %
%------------------------------------------------------------------------------------------%
atualizarLista( ListaNova, ListaAntiga, Resultado ):-
    intersection( ListaAntiga, ListaNova, ListaInter ),
    completarLista( ListaInter, ListaNova, Resultado ), 
    !.


%------------------------------------------------------------------------------------------%
%         Adiciona Populações de acordo com o número de Populações definido.               %
%           Tendo em conta que as primeiras 4 populações serão sempre:                     %
%               1 - Trajeto Fornecido/Anterior                                             %
%               2 - Heurística Combinada                                                   %
%               3 - Heurística de Distância                                                %
%               4 - Heurística de Peso                                                     %
%------------------------------------------------------------------------------------------%
adiciona_populacoes( 0, _, _, _, Pop, Pop ):-!.
adiciona_populacoes( 1, Data, LA, _, Pop, PopResultante ):-
    heuristica_peso_tempo( Data, LA, LAPesoTempo ),
    append(Pop, [LAPesoTempo], PopResultante ).

adiciona_populacoes( 2, Data, LA, _, Pop, PopResultante ):-
    heuristica_distancia( LA, LADistancia ),
    heuristica_peso_tempo( Data, LA, LAPesoTempo ),
    append(Pop, [LAPesoTempo, LADistancia], PopResultante ).

adiciona_populacoes( 3, Data, LA, _, Pop, PopResultante ):-
    heuristica_distancia( LA, LADistancia ),
    heuristica_peso( Data, LA, LAPeso ),
    heuristica_peso_tempo( Data, LA, LAPesoTempo ),
    append(Pop, [LAPesoTempo, LADistancia, LAPeso], PopResultante ).

adiciona_populacoes( TamPop, Data, LA, NumE, Pop, PopResultante ):-
    adiciona_populacoes( 3, Data, LA, NumE, Pop, PopBase ),
    TamPop1 is TamPop - 3,
    gera_populacao_al( TamPop1, LA, NumE, PopBase, PopAl ),
    append( PopBase, PopAl, PopResultante ).
    

%------------------------------------------------------------------------------------------%
%         Gera uma População Inicial que contém o Trajeto fornecido.                       %
%------------------------------------------------------------------------------------------%
gera_populacao_atualizada( LEntregas, ResultadoOriginal, Data, Pop ):-
	populacao( TamPop ),
    obter_lista_armazens_filtrada( LEntregas, LA ),
    length( LA, NumE ),
    PopBase = [ ResultadoOriginal ],
    TamPop1 is TamPop - 1,
    adiciona_populacoes( TamPop1, Data, LA, NumE, PopBase, Pop ).

    
%------------------------------------------------------------------------------------------%
%         Encontra o um novo Trajeto usando um algoritmo Genetico onde a População         %
%           inicial contém um trajeto encontrado anteriormente sendo que as Entregas       %
%           foram modificadas desde a geração do Trajeto Anterior.                         %
%------------------------------------------------------------------------------------------%
gera_atualizada( Data, LAnterior, LFinal ):-
	inicializa,
    obter_lista_entregas( Data, LEntregas ),
    obter_lista_armazens( LEntregas, LArmazens),
    atualizarLista( LArmazens, LAnterior, ResultadoOriginal ),
	gera_populacao_atualizada( LEntregas, ResultadoOriginal, Data, Pop ),
    avalia_populacao(LEntregas, Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
    set_menor_valor(PopOrd),
    geracoes(NG),
	get_time(T),
	gera_geracao(LEntregas, 0,NG,PopOrd, T, LResultado),
    colocar_matosinhos(LResultado, LFinal).